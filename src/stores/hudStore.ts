import { create } from 'zustand';
import { HUDMetrics } from '@/types';

interface HUDStore {
  metrics: HUDMetrics;
  isVisible: boolean;
  updateMetric: (key: keyof HUDMetrics, value: number) => void;
  setVisible: (value: boolean) => void;
  reset: () => void;
}

const initialMetrics: HUDMetrics = {
  power: 95,
  reactor: 88,
  temperature: 65,
  flight: 100,
  weapons: 75,
  communications: 100,
  cpu: 45,
  memory: 62,
  altitude: 12500,
  energy: 92,
};

export const useHUDStore = create<HUDStore>((set) => ({
  metrics: initialMetrics,
  isVisible: true,

  updateMetric: (key, value) =>
    set((state) => ({
      metrics: {
        ...state.metrics,
        [key]: Math.min(100, Math.max(0, value)),
      },
    })),

  setVisible: (value) => set({ isVisible: value }),

  reset: () => set({ metrics: initialMetrics }),
}));
