export interface UserContextType {
  title: string | null;
  setTitle: React.Dispatch<React.SetStateAction<string | null>>;
  activeUser: User | null;
  setActiveUser: React.Dispatch<React.SetStateAction<User | null>>;
  apiKeys: ApiKey[];
  setApiKeys: React.Dispatch<React.SetStateAction<ApiKey[]>>;
  activeConversation: number | null;
  setActiveConversation: React.Dispatch<React.SetStateAction<number | null>>;
  conversations: Conversation[];
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  prompts: UserPrompts[];
  setPrompts: React.Dispatch<React.SetStateAction<UserPrompts[]>>;
  streamingMessage: string;
  setStreamingMessage: React.Dispatch<React.SetStateAction<string>>;
  filteredConversations: Conversation[];
  setFilteredConversations: React.Dispatch<
    React.SetStateAction<Conversation[]>
  >;
  isSearchOpen: boolean;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchRef: React.RefObject<HTMLDivElement>;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  newConversation: boolean;
  setNewConversation: React.Dispatch<React.SetStateAction<boolean>>;
  handleResetChat: () => void;
  devAPIKeys: Keys[];
  setDevAPIKeys: React.Dispatch<React.SetStateAction<Keys[]>>;
  fetchDevAPIKeys: () => Promise<void>;
  getUserConversations: () => Promise<void>;
  alertForUser: boolean;
  setAlertForUser: React.Dispatch<React.SetStateAction<boolean>>;
  fetchApiKey: () => Promise<void>;
  fetchPrompts: () => Promise<void>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  currentRequestId: number | null;
  setCurrentRequestId: React.Dispatch<React.SetStateAction<number | null>>;
  agentActions: string;
  setAgentActions: React.Dispatch<React.SetStateAction<string>>;
  fetchMessages: () => Promise<void>;
  openRouterModels: OpenRouterModel[];
  setOpenRouterModels: React.Dispatch<React.SetStateAction<OpenRouterModel[]>>;
  apiKeyInput: string;
  setApiKeyInput: React.Dispatch<React.SetStateAction<string>>;
  azureModels: AzureModel[];
  setAzureModels: React.Dispatch<React.SetStateAction<AzureModel[]>>;
  customModels: CustomModel[];
  setCustomModels: React.Dispatch<React.SetStateAction<CustomModel[]>>;
  fetchOpenRouterModels: () => Promise<void>;
  fetchAzureModels: () => Promise<void>;
  fetchCustomModels: () => Promise<void>;
  streamingMessageReasoning: string | null;
  setStreamingMessageReasoning: React.Dispatch<React.SetStateAction<string>>;
  tools: Tool[];
  setTools: React.Dispatch<React.SetStateAction<Tool[]>>;
  dockTool: (tool: UserTool) => void;
  fetchTools: () => Promise<void>;
  systemTools: Tool[];
  setSystemTools: React.Dispatch<React.SetStateAction<Tool[]>>;
  fetchSystemTools: () => Promise<void>;
  userTools: UserTool[];
  setUserTools: React.Dispatch<React.SetStateAction<UserTool[]>>;
  toggleTool: (tool: UserTool) => void;
}
