import { create } from 'zustand';
import { SuitCustomization } from '@/types';

interface SuitStore {
  customization: SuitCustomization;
  updateCustomization: (updates: Partial<SuitCustomization>) => void;
  reset: () => void;
}

const defaultCustomization: SuitCustomization = {
  armorColor: '#ff6b35',
  glowColor: '#00d4ff',
  eyeColor: '#ff0000',
  energyColor: '#00ff41',
  materialFinish: 'metallic',
  battleDamage: 0,
};

export const useSuitStore = create<SuitStore>((set) => ({
  customization: defaultCustomization,

  updateCustomization: (updates) =>
    set((state) => ({
      customization: {
        ...state.customization,
        ...updates,
      },
    })),

  reset: () => set({ customization: defaultCustomization }),
}));
