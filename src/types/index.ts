export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface ListItem {
  id: string;
  content: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface List {
  id: string;
  name: string;
  items: ListItem[];
  createdAt: number;
  updatedAt: number;
}

export interface Reminder {
  id: string;
  content: string;
  dueDate: number;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface AssistantState {
  lists: List[];
  reminders: Reminder[];
  conversationHistory: Message[];
}

export interface LLMProvider {
  generateResponse(
    messages: Message[],
    state: AssistantState
  ): Promise<{ message: string; tools?: ToolCall[] }>;
}

export interface ToolCall {
  tool: string;
  args: Record<string, any>;
}

export interface Tool {
  name: string;
  description: string;
  execute(args: Record<string, any>, state: AssistantState): Promise<any>;
}
