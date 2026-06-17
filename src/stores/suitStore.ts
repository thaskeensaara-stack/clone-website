import create from 'zustand';

interface SuitCustomization {
  armorColor: string;
  glowColor: string;
  energyColor: string;
  eyeColor: string;
  materialFinish: 'matte' | 'glossy' | 'metallic';
  battleDamage: number;
}

interface SuitStore {
  customization: SuitCustomization;
  updateCustomization: (updates: Partial<SuitCustomization>) => void;
  resetCustomization: () => void;
}

const defaultCustomization: SuitCustomization = {
  armorColor: '#ff6b35',
  glowColor: '#00d4ff',
  energyColor: '#00d4ff',
  eyeColor: '#00d4ff',
  materialFinish: 'metallic',
  battleDamage: 0,
};

export const useSuitStore = create<SuitStore>((set) => ({
  customization: defaultCustomization,

  updateCustomization: (updates) =>
    set((state) => ({
      customization: { ...state.customization, ...updates },
    })),

  resetCustomization: () =>
    set({
      customization: defaultCustomization,
    }),
}));
