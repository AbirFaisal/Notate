import openai from "@/assets/providers/openai.svg";
import anthropic from "@/assets/providers/anthropic.svg";
import gemini from "@/assets/providers/gemini.svg";
import xai from "@/assets/providers/xai.svg";
import openrouter from "@/assets/providers/openrouter.svg";
import ollama from "@/assets/providers/ollama.svg";
import azure from "@/assets/providers/azure.svg";
import { HouseIcon } from "lucide-react";
import { ReactNode } from "react";

const SvgIcon = ({ src, alt }: { src: string; alt: string }) => (
  <div className="h-3 w-3 relative">
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-contain [filter:brightness(0)_invert(1)]"
    />
  </div>
);

export const providerIcons: Record<string, ReactNode> = {
  openai: <SvgIcon src={openai} alt="OpenAI" />,
  anthropic: <SvgIcon src={anthropic} alt="Anthropic" />,
  gemini: <SvgIcon src={gemini} alt="Gemini" />,
  xai: <SvgIcon src={xai} alt="XAI" />,
  local: <HouseIcon className="h-3 w-3" />,
  openrouter: <SvgIcon src={openrouter} alt="OpenRouter" />,
  ollama: <SvgIcon src={ollama} alt="Ollama" />,
  "Azure Open AI": <SvgIcon src={azure} alt="Azure" />,
};
