import { create } from 'zustand';
import { Mission } from '@/types';

interface MissionStore {
  missions: Mission[];
  activeMissionId: string | null;
  addMission: (mission: Mission) => void;
  updateMission: (id: string, updates: Partial<Mission>) => void;
  setActiveMission: (id: string | null) => void;
  addLog: (missionId: string, log: string) => void;
}

export const useMissionStore = create<MissionStore>((set) => ({
  missions: [],
  activeMissionId: null,

  addMission: (mission) =>
    set((state) => ({
      missions: [...state.missions, mission],
    })),

  updateMission: (id, updates) =>
    set((state) => ({
      missions: state.missions.map((m) => (m.id === id ? { ...m, ...updates } : m)),
    })),

  setActiveMission: (id) => set({ activeMissionId: id }),

  addLog: (missionId, log) =>
    set((state) => ({
      missions: state.missions.map((m) =>
        m.id === missionId
          ? { ...m, logs: [...m.logs, `[${new Date().toLocaleTimeString()}] ${log}`] }
          : m
      ),
    })),
}));
