import React, { useState } from 'react';
import { useMissionStore } from '@/stores/missionStore';
import clsx from 'clsx';

/**
 * Mission Dashboard Component
 * Displays active missions, objectives, and progress
 */
export const MissionDashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { missions, activeMissionId, setActiveMission } = useMissionStore();
  const activeMission = missions.find((m) => m.id === activeMissionId);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-40 right-8 z-40 bg-iron-dark/60 hover:bg-iron-dark/80 border border-iron-blue/50 rounded px-4 py-2 text-iron-blue text-xs font-mono transition-all"
      >
        Missions
      </button>

      {/* Dashboard Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-iron-dark border border-iron-blue/50 rounded-lg shadow-2xl w-full max-w-2xl max-h-96 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-iron-blue/10 border-b border-iron-blue/30 p-4 flex justify-between items-center">
              <h2 className="text-iron-blue font-mono font-bold">MISSION CONTROL</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-iron-blue/70 hover:text-iron-blue text-xl"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {missions.length === 0 ? (
                <div className="p-6 text-center text-iron-blue/50 text-sm font-mono">
                  No active missions
                </div>
              ) : (
                <div className="divide-y divide-iron-blue/20">
                  {missions.map((mission) => (
                    <button
                      key={mission.id}
                      onClick={() => setActiveMission(mission.id)}
                      className={clsx(
                        'w-full text-left p-4 border-l-4 transition-all',
                        activeMissionId === mission.id
                          ? 'border-iron-blue bg-iron-blue/10'
                          : 'border-iron-blue/20 hover:border-iron-blue/50'
                      )}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-iron-blue font-mono font-bold text-sm">
                          {mission.title}
                        </h3>
                        <span
                          className={clsx(
                            'text-xs font-mono px-2 py-1 rounded',
                            mission.status === 'active'
                              ? 'bg-iron-green/20 text-iron-green'
                              : mission.status === 'completed'
                                ? 'bg-iron-blue/20 text-iron-blue'
                                : 'bg-iron-red/20 text-iron-red'
                          )}
                        >
                          {mission.status.toUpperCase()}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="bg-iron-dark border border-iron-blue/20 rounded h-1 overflow-hidden mb-2">
                        <div
                          className="bg-gradient-to-r from-iron-blue to-iron-purple h-full transition-all duration-300"
                          style={{ width: `${mission.progress}%` }}
                        />
                      </div>

                      <p className="text-iron-blue/70 text-xs font-mono mb-2">
                        {mission.description}
                      </p>
                      <div className="text-iron-blue/50 text-xs font-mono">
                        Progress: {mission.progress.toFixed(0)}%
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MissionDashboard;
