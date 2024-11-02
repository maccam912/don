import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AssistantState, List, Reminder, Message } from '../../types';

type Store = AssistantState & {
  addMessage: (message: Message) => void;
  createList: (name: string) => void;
  addToList: (listId: string, content: string) => void;
  toggleListItem: (listId: string, itemId: string) => void;
  createReminder: (content: string, dueDate: number) => void;
  toggleReminder: (id: string) => void;
  clearConversation: () => void;
};

const store = (set: Function) => ({
  lists: [] as List[],
  reminders: [] as Reminder[],
  conversationHistory: [] as Message[],

  addMessage: (message: Message) =>
    set((state: Store) => ({
      conversationHistory: [...state.conversationHistory, message],
    })),

  createList: (name: string) =>
    set((state: Store) => ({
      lists: [
        ...state.lists,
        {
          id: crypto.randomUUID(),
          name,
          items: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      ],
    })),

  addToList: (listId: string, content: string) =>
    set((state: Store) => ({
      lists: state.lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: [
                ...list.items,
                {
                  id: crypto.randomUUID(),
                  content,
                  completed: false,
                  createdAt: Date.now(),
                  updatedAt: Date.now(),
                },
              ],
              updatedAt: Date.now(),
            }
          : list
      ),
    })),

  toggleListItem: (listId: string, itemId: string) =>
    set((state: Store) => ({
      lists: state.lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: list.items.map((item) =>
                item.id === itemId
                  ? { ...item, completed: !item.completed, updatedAt: Date.now() }
                  : item
              ),
              updatedAt: Date.now(),
            }
          : list
      ),
    })),

  createReminder: (content: string, dueDate: number) =>
    set((state: Store) => ({
      reminders: [
        ...state.reminders,
        {
          id: crypto.randomUUID(),
          content,
          dueDate,
          completed: false,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      ],
    })),

  toggleReminder: (id: string) =>
    set((state: Store) => ({
      reminders: state.reminders.map((reminder) =>
        reminder.id === id
          ? { ...reminder, completed: !reminder.completed, updatedAt: Date.now() }
          : reminder
      ),
    })),

  clearConversation: () =>
    set(() => ({
      conversationHistory: [],
    })),
});

export const useStore = create<Store>()(
  persist(store, {
    name: 'don-storage',
  })
);
