export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  isStreaming?: boolean;
}

export interface AIAssistantState {
  isListening: boolean;
  isSpeaking: boolean;
  isTyping: boolean;
  messages: ChatMessage[];
  currentInput: string;
  sessionMemory: Record<string, any>;
}

export interface SuitCustomization {
  armorColor: string;
  glowColor: string;
  eyeColor: string;
  energyColor: string;
  materialFinish: 'matte' | 'glossy' | 'metallic';
  battleDamage: number; // 0-100
}

export interface HUDMetrics {
  power: number;
  reactor: number;
  temperature: number;
  flight: number;
  weapons: number;
  communications: number;
  cpu: number;
  memory: number;
  altitude: number;
  energy: number;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  progress: number;
  status: 'active' | 'completed' | 'failed';
  logs: string[];
}

export interface TerminalCommand {
  name: string;
  description: string;
  handler: (args: string[]) => Promise<string>;
}

export interface ScanTarget {
  id: string;
  name: string;
  position: [number, number, number];
  type: 'threat' | 'ally' | 'neutral';
  distance: number;
}
