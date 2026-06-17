import { create } from 'zustand';
import { ChatMessage, AIAssistantState } from '@/types';

interface AIStore extends AIAssistantState {
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  setIsListening: (value: boolean) => void;
  setIsSpeaking: (value: boolean) => void;
  setIsTyping: (value: boolean) => void;
  setCurrentInput: (value: string) => void;
  updateSessionMemory: (key: string, value: any) => void;
  clearHistory: () => void;
}

export const useAIStore = create<AIStore>((set) => ({
  isListening: false,
  isSpeaking: false,
  isTyping: false,
  messages: [],
  currentInput: '',
  sessionMemory: {},

  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: `msg-${Date.now()}`,
          timestamp: Date.now(),
        },
      ],
    })),

  setIsListening: (value) => set({ isListening: value }),
  setIsSpeaking: (value) => set({ isSpeaking: value }),
  setIsTyping: (value) => set({ isTyping: value }),
  setCurrentInput: (value) => set({ currentInput: value }),

  updateSessionMemory: (key, value) =>
    set((state) => ({
      sessionMemory: { ...state.sessionMemory, [key]: value },
    })),

  clearHistory: () =>
    set({
      messages: [],
      sessionMemory: {},
      currentInput: '',
    }),
}));
