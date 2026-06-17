import create from 'zustand';

interface ScanTarget {
  id: string;
  type: 'threat' | 'ally' | 'neutral';
  position: [number, number, number];
  distance: number;
  name: string;
}

interface ScanStore {
  targets: ScanTarget[];
  isScanningActive: boolean;
  setScanActive: (active: boolean) => void;
  addTarget: (target: ScanTarget) => void;
  removeTarget: (id: string) => void;
  updateTarget: (id: string, updates: Partial<ScanTarget>) => void;
  clearTargets: () => void;
}

export const useScanStore = create<ScanStore>((set) => ({
  targets: [],
  isScanningActive: false,

  setScanActive: (active) => set({ isScanningActive: active }),

  addTarget: (target) =>
    set((state) => ({
      targets: [...state.targets, target],
    })),

  removeTarget: (id) =>
    set((state) => ({
      targets: state.targets.filter((t) => t.id !== id),
    })),

  updateTarget: (id, updates) =>
    set((state) => ({
      targets: state.targets.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      ),
    })),

  clearTargets: () => set({ targets: [] }),
}));
