import create from 'zustand';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIStore {
  messages: Message[];
  currentInput: string;
  isListening: boolean;
  isTyping: boolean;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  setCurrentInput: (input: string) => void;
  setIsListening: (listening: boolean) => void;
  setIsTyping: (typing: boolean) => void;
  clearHistory: () => void;
}

export const useAIStore = create<AIStore>((set) => ({
  messages: [],
  currentInput: '',
  isListening: false,
  isTyping: false,

  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: `msg-${Date.now()}`,
          timestamp: new Date(),
        },
      ],
    })),

  setCurrentInput: (input) => set({ currentInput: input }),
  setIsListening: (listening) => set({ isListening: listening }),
  setIsTyping: (typing) => set({ isTyping: typing }),

  clearHistory: () => set({ messages: [], currentInput: '' }),
}));
