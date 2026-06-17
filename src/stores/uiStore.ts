import { create } from 'zustand';

interface UIStore {
  isDarkMode: boolean;
  activePanel: 'chat' | 'terminal' | 'mission' | 'scan' | 'customize' | null;
  showHUD: boolean;
  showScanning: boolean;
  cameraTarget: 'idle' | 'suit' | 'reactor' | 'custom';
  toggleDarkMode: () => void;
  setActivePanel: (panel: UIStore['activePanel']) => void;
  setShowHUD: (value: boolean) => void;
  setShowScanning: (value: boolean) => void;
  setCameraTarget: (target: UIStore['cameraTarget']) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isDarkMode: true,
  activePanel: null,
  showHUD: true,
  showScanning: false,
  cameraTarget: 'idle',

  toggleDarkMode: () =>
    set((state) => ({
      isDarkMode: !state.isDarkMode,
    })),

  setActivePanel: (panel) => set({ activePanel: panel }),
  setShowHUD: (value) => set({ showHUD: value }),
  setShowScanning: (value) => set({ showScanning: value }),
  setCameraTarget: (target) => set({ cameraTarget: target }),
}));
