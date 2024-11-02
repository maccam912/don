import { BaseLLMProvider } from './base';
import type { Message, AssistantState } from '../../types';

export class OpenRouterProvider extends BaseLLMProvider {
  constructor(apiKey: string) {
    super(apiKey, 'https://openrouter.ai/api/v1');
  }

  async generateResponse(messages: Message[], state: AssistantState) {
    const systemMessage = this.getSystemPrompt(state);
    
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'openai/gpt-3.5-turbo',  // Default model, can be changed
          messages: [
            { role: 'system', content: systemMessage },
            ...messages
          ],
        }),
      });

      const data = await response.json();
      return {
        message: data.choices[0].message.content,
        tools: [], // Parse tool calls if present in the response
      };
    } catch (error) {
      console.error('Error generating response:', error);
      throw error;
    }
  }
}
