import type { Message, AssistantState, LLMProvider } from '../../types';

export abstract class BaseLLMProvider implements LLMProvider {
  protected apiKey: string;
  protected baseUrl: string;

  constructor(apiKey: string, baseUrl: string) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  abstract generateResponse(
    messages: Message[],
    state: AssistantState
  ): Promise<{ message: string; tools?: any[] }>;

  protected getSystemPrompt(state: AssistantState): string {
    return `You are Don, a personal AI assistant focused on helping users remember things and manage tasks.
Current State:
- Lists: ${state.lists.length} lists
- Reminders: ${state.reminders.length} active reminders
- Conversation History: ${state.conversationHistory.length} messages

You can use tools to manage the state:
- createList: Create a new list
- addToList: Add items to a list
- createReminder: Set a reminder
- getState: Retrieve the current state
- getLists: Get all lists
- getReminders: Get all reminders

Keep responses concise and focused on helping the user stay organized.`;
  }
}
