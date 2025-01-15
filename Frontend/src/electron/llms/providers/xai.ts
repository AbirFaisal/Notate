import { BrowserWindow } from "electron";
import OpenAI from "openai";
import db from "../../db.js";
import { sendMessageChunk } from "../llmHelpers/sendMessageChunk.js";
import { truncateMessages } from "../llmHelpers/truncateMessages.js";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

let openai: OpenAI;

async function initializeXAI(apiKey: string) {
  openai = new OpenAI({ apiKey, baseURL: "https://api.x.ai/v1" });
}

export async function XAIProvider(
  messages: Message[],
  activeUser: User,
  userSettings: UserSettings,
  prompt: string,
  conversationId: bigint | number,
  mainWindow: BrowserWindow | null = null,
  currentTitle: string,
  collectionId?: number,
  data?: {
    top_k: number;
    results: {
      content: string;
      metadata: string;
    }[];
  },
  signal?: AbortSignal
) {
  const apiKey = db.getApiKey(activeUser.id, "xai");
  if (!apiKey) {
    throw new Error("XAI API key not found for the active user");
  }
  await initializeXAI(apiKey);

  if (!openai) {
    throw new Error("XAI instance not initialized");
  }

  const newMessages = messages.map((msg) => ({
    role: msg.role as "user" | "assistant" | "system",
    content: msg.content,
  }));
  let dataCollectionInfo;
  if (collectionId) {
    dataCollectionInfo = db.getCollection(collectionId) as Collection;
  }
  const sysPrompt: ChatCompletionMessageParam = {
    role: "system",
    content:
      prompt +
      (data
        ? "The following is the data that the user has provided via their custom data collection: " +
          `\n\n${JSON.stringify(data)}` +
          `\n\nCollection/Store Name: ${dataCollectionInfo?.name}` +
          `\n\nCollection/Store Files: ${dataCollectionInfo?.files}` +
          `\n\nCollection/Store Description: ${dataCollectionInfo?.description}`
        : ""),
  };

  // Truncate messages to fit within token limits
  const maxOutputTokens = (userSettings.maxTokens as number) || 4096;
  const truncatedMessages = truncateMessages(
    newMessages,
    sysPrompt,
    maxOutputTokens
  ) as ChatCompletionMessageParam[];
  truncatedMessages.unshift(sysPrompt);

  const stream = await openai.chat.completions.create(
    {
      model: "grok-beta",
      messages: truncatedMessages,
      stream: true,
      temperature: Number(userSettings.temperature),
      max_tokens: maxOutputTokens,
    },
    { signal }
  );

  const newMessage: Message = {
    role: "assistant",
    content: "",
    timestamp: new Date(),
    data_content: data ? JSON.stringify(data) : undefined,
  };

  try {
    for await (const chunk of stream) {
      if (signal?.aborted) {
        throw new Error("AbortError");
      }
      const content = chunk.choices[0]?.delta?.content || "";
      newMessage.content += content;
      sendMessageChunk(content, mainWindow);
    }

    if (mainWindow) {
      mainWindow.webContents.send("streamEnd");
    }

    return {
      id: conversationId,
      messages: [...messages, newMessage],
      title: currentTitle,
      content: newMessage.content,
      aborted: false,
    };
  } catch (error) {
    if (
      signal?.aborted ||
      (error instanceof Error && error.message === "AbortError")
    ) {
      return {
        id: conversationId,
        messages: messages,
        title: currentTitle,
        content: "",
        aborted: true,
      };
    }
    throw error;
  }
}
