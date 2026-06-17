import create from 'zustand';

interface HUDMetrics {
  power: number;
  reactor: number;
  temperature: number;
  flight: number;
  altitude: number;
  energy: number;
  weapons: number;
  communications: number;
  cpu: number;
  memory: number;
}

interface HUDStore {
  metrics: HUDMetrics;
  isVisible: boolean;
  updateMetrics: (metrics: Partial<HUDMetrics>) => void;
  toggleVisibility: () => void;
  resetMetrics: () => void;
}

const defaultMetrics: HUDMetrics = {
  power: 88,
  reactor: 92,
  temperature: 65,
  flight: 78,
  altitude: 5000,
  energy: 85,
  weapons: 72,
  communications: 95,
  cpu: 62,
  memory: 78,
};

export const useHUDStore = create<HUDStore>((set) => ({
  metrics: defaultMetrics,
  isVisible: true,

  updateMetrics: (newMetrics) =>
    set((state) => ({
      metrics: { ...state.metrics, ...newMetrics },
    })),

  toggleVisibility: () =>>
    set((state) => ({
      isVisible: !state.isVisible,
    })),

  resetMetrics: () =>
    set({
      metrics: defaultMetrics,
    }),
}));
