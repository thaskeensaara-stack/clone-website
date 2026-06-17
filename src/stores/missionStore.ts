import create from 'zustand';

interface Mission {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  progress: number;
  status: 'active' | 'completed' | 'failed';
  logs: string[];
}

interface MissionStore {
  missions: Mission[];
  activeMissionId: string | null;
  addMission: (mission: Omit<Mission, 'id'>) => void;
  updateMission: (id: string, updates: Partial<Mission>) => void;
  removeMission: (id: string) => void;
  setActiveMission: (id: string | null) => void;
  completeMission: (id: string) => void;
}

export const useMissionStore = create<MissionStore>((set) => ({
  missions: [],
  activeMissionId: null,

  addMission: (mission) =>
    set((state) => ({
      missions: [
        ...state.missions,
        {
          ...mission,
          id: `mission-${Date.now()}`,
        },
      ],
    })),

  updateMission: (id, updates) =>
    set((state) => ({
      missions: state.missions.map((m) =>
        m.id === id ? { ...m, ...updates } : m
      ),
    })),

  removeMission: (id) =>
    set((state) => ({
      missions: state.missions.filter((m) => m.id !== id),
    })),

  setActiveMission: (id) =>
    set({
      activeMissionId: id,
    }),

  completeMission: (id) =>
    set((state) => ({
      missions: state.missions.map((m) =>
        m.id === id ? { ...m, status: 'completed' as const, progress: 100 } : m
      ),
    })),
}));
