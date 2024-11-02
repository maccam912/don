import { useState, useRef, useEffect } from 'react';
import { useStore } from '../lib/state/store';
import type { Message } from '../types';

export const ChatWindow = () => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { conversationHistory, addMessage } = useStore(state => ({
    conversationHistory: state.conversationHistory,
    addMessage: state.addMessage
  }));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversationHistory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    addMessage(userMessage);
    setInput('');

    // TODO: Implement LLM response handling
    const assistantMessage: Message = {
      role: 'assistant',
      content: 'This is a placeholder response. LLM integration coming soon!',
      timestamp: Date.now(),
    };
    addMessage(assistantMessage);
  };

  return (
    <div className="flex flex-col h-full max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversationHistory.map((message: Message, index: number) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};
