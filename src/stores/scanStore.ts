import { create } from 'zustand';
import { ScanTarget } from '@/types';

interface ScanStore {
  targets: ScanTarget[];
  isScanningActive: boolean;
  selectedTargetId: string | null;
  addTarget: (target: ScanTarget) => void;
  removeTarget: (id: string) => void;
  updateTarget: (id: string, updates: Partial<ScanTarget>) => void;
  setScanActive: (value: boolean) => void;
  setSelectedTarget: (id: string | null) => void;
  clearAllTargets: () => void;
}

export const useScanStore = create<ScanStore>((set) => ({
  targets: [],
  isScanningActive: false,
  selectedTargetId: null,

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
      targets: state.targets.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    })),

  setScanActive: (value) => set({ isScanningActive: value }),
  setSelectedTarget: (id) => set({ selectedTargetId: id }),

  clearAllTargets: () =>
    set({
      targets: [],
      selectedTargetId: null,
    }),
}));
