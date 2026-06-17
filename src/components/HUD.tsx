import React, { useMemo } from 'react';
import { useHUDStore } from '@/stores/hudStore';
import clsx from 'clsx';

/**
 * HUD Metric Display Component
 * Shows individual metric with animated bar and value
 */
interface MetricDisplayProps {
  label: string;
  value: number;
  unit?: string;
  color?: string;
  icon?: string;
}

const MetricDisplay: React.FC<MetricDisplayProps> = ({
  label,
  value,
  unit = '%',
  color = 'iron-blue',
  icon,
}) => {
  return (
    <div className="flex items-center space-x-3 mb-4">
      <div className={`w-24 text-xs font-mono text-${color} uppercase tracking-wider`}>
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </div>
      <div className="flex-1 bg-iron-dark border border-iron-blue/30 rounded h-2 overflow-hidden">
        <div
          className={`bg-gradient-to-r from-${color} to-iron-purple h-full transition-all duration-300`}
          style={{ width: `${value}%` }}
        />
      </div>
      <div className="w-12 text-right text-sm font-mono text-iron-blue">
        {value.toFixed(0)}{unit}
      </div>
    </div>
  );
};

/**
 * HUD Component
 * Main heads-up display showing all metrics
 */
export const HUD: React.FC = () => {
  const { metrics, isVisible } = useHUDStore();

  if (!isVisible) return null;

  const metricGroups = useMemo(
    () => ({
      systems: [
        { label: 'Power', value: metrics.power, icon: '⚡' },
        { label: 'Reactor', value: metrics.reactor, icon: '🔥' },
        { label: 'Temperature', value: metrics.temperature, icon: '🌡' },
      ],
      flight: [
        { label: 'Flight', value: metrics.flight, icon: '✈' },
        { label: 'Altitude', value: Math.min(100, (metrics.altitude / 40000) * 100), icon: '📍' },
        { label: 'Energy', value: metrics.energy, icon: '⚙' },
      ],
      weapons: [
        { label: 'Weapons', value: metrics.weapons, icon: '🎯' },
        { label: 'Communications', value: metrics.communications, icon: '📡' },
      ],
      computer: [
        { label: 'CPU', value: metrics.cpu, icon: '💾' },
        { label: 'Memory', value: metrics.memory, icon: '🧠' },
      ],
    }),
    [metrics]
  );

  return (
    <div className="fixed bottom-8 left-8 z-40 text-iron-blue font-mono text-xs">
      {/* Left HUD Panel */}
      <div className="bg-iron-dark/60 backdrop-blur border border-iron-blue/30 rounded-lg p-6 w-80 shadow-lg">
        <div className="text-iron-blue uppercase tracking-wider font-bold mb-4 text-center border-b border-iron-blue/30 pb-3">
          SYSTEMS
        </div>

        {/* Systems Group */}
        <div className="mb-6">
          <div className="text-iron-blue/70 text-xs mb-2 uppercase">Core Systems</div>
          {metricGroups.systems.map((metric) => (
            <MetricDisplay key={metric.label} {...metric} />
          ))}
        </div>

        {/* Flight Group */}
        <div className="mb-6 border-t border-iron-blue/20 pt-4">
          <div className="text-iron-blue/70 text-xs mb-2 uppercase">Flight Systems</div>
          {metricGroups.flight.map((metric) => (
            <MetricDisplay key={metric.label} {...metric} />
          ))}
        </div>

        {/* Weapons Group */}
        <div className="border-t border-iron-blue/20 pt-4">
          <div className="text-iron-blue/70 text-xs mb-2 uppercase">Weapons</div>
          {metricGroups.weapons.map((metric) => (
            <MetricDisplay key={metric.label} {...metric} color="iron-orange" />
          ))}
        </div>
      </div>

      {/* Right HUD Panel */}
      <div className="fixed bottom-8 right-8 bg-iron-dark/60 backdrop-blur border border-iron-green/30 rounded-lg p-6 w-72 shadow-lg">
        <div className="text-iron-green uppercase tracking-wider font-bold mb-4 text-center border-b border-iron-green/30 pb-3">
          COMPUTER
        </div>

        {metricGroups.computer.map((metric) => (
          <MetricDisplay key={metric.label} {...metric} color="iron-green" />
        ))}

        {/* System Status */}
        <div className="mt-6 pt-4 border-t border-iron-green/20">
          <div className="text-iron-green/70 text-xs uppercase mb-3">Status</div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>System Health</span>
              <span className="text-iron-green">OPTIMAL</span>
            </div>
            <div className="flex justify-between text-xs">
              <span>Network</span>
              <span className="text-iron-green">CONNECTED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HUD;
