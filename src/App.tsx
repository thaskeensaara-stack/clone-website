import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene3D from '@/scenes/Scene3D';
import {
  AIAssistantOrb,
  HUD,
  Terminal,
  SuitCustomizer,
  ScanningMode,
  MissionDashboard,
} from '@/components';
import { useUIStore } from '@/stores/uiStore';
import { useScanStore } from '@/stores/scanStore';
import './App.css';

/**
 * Main App Component
 * Orchestrates all UI panels and 3D scene
 */
function App() {
  const { isDarkMode } = useUIStore();
  const { isScanningActive } = useScanStore();

  useEffect(() => {
    // Initialize some sample missions
    const sampleMissions = [
      {
        id: '1',
        title: 'Reactor Maintenance',
        description: 'Perform routine diagnostics on core reactor',
        objectives: ['Check temperature', 'Verify power output', 'Test cooling systems'],
        progress: 65,
        status: 'active' as const,
        logs: ['[12:34:56] Diagnostics initiated', '[12:35:12] Temperature nominal'],
      },
    ];

    // Dispatch initial sample data
    window.dispatchEvent(
      new CustomEvent('initializeMissions', { detail: sampleMissions })
    );
  }, []);

  return (
    <div
      className={`w-full h-screen overflow-hidden ${
        isDarkMode ? 'bg-iron-dark text-white' : 'bg-white text-black'
      }`}
    >
      {/* 3D Scene */}
      <div className="absolute inset-0 w-full h-full">
        <Scene3D />
      </div>

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* HUD Displays */}
        <HUD />

        {/* Scanning Mode Overlay */}
        <ScanningMode />

        {/* Interactive UI Components */}
        <div className="pointer-events-auto">
          {/* AI Assistant */}
          <AIAssistantOrb />

          {/* Control Panels */}
          <Terminal />
          <SuitCustomizer />
          <MissionDashboard />
        </div>
      </div>
    </div>
  );
}

export default App;
