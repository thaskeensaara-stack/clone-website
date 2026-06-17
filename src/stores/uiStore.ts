import create from 'zustand';

interface UIStore {
  isDarkMode: boolean;
  cameraTarget: [number, number, number];
  scale: number;
  toggleDarkMode: () => void;
  setCameraTarget: (target: [number, number, number]) => void;
  setScale: (scale: number) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isDarkMode: true,
  cameraTarget: [0, 0, 0],
  scale: 1,

  toggleDarkMode: () =>
    set((state) => ({
      isDarkMode: !state.isDarkMode,
    })),

  setCameraTarget: (target) =>
    set({
      cameraTarget: target,
    }),

  setScale: (scale) =>
    set({
      scale,
    }),
}));
