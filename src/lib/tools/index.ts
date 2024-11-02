import { useStore } from '../state/store';
import type { Tool, AssistantState } from '../../types';

export const tools: Tool[] = [
  {
    name: 'createList',
    description: 'Create a new list with the given name',
    execute: async (args: { name: string }) => {
      const store = useStore.getState();
      store.createList(args.name);
      return { success: true, message: `Created list: ${args.name}` };
    },
  },
  {
    name: 'addToList',
    description: 'Add an item to a specified list',
    execute: async (args: { listId: string; content: string }) => {
      const store = useStore.getState();
      store.addToList(args.listId, args.content);
      return { success: true, message: `Added item to list` };
    },
  },
  {
    name: 'createReminder',
    description: 'Create a new reminder',
    execute: async (args: { content: string; dueDate: number }) => {
      const store = useStore.getState();
      store.createReminder(args.content, args.dueDate);
      return { success: true, message: `Created reminder: ${args.content}` };
    },
  },
  {
    name: 'getState',
    description: 'Get the current assistant state',
    execute: async () => {
      const store = useStore.getState();
      return {
        lists: store.lists,
        reminders: store.reminders,
      };
    },
  },
];
