import React, { useState } from 'react';
import { useSuitStore } from '@/stores/suitStore';
import { animateScale } from '@/utils/animations';
import clsx from 'clsx';

/**
 * Suit Customization Panel
 * Allows users to customize armor appearance and materials
 */
export const SuitCustomizer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { customization, updateCustomization } = useSuitStore();

  const colorOptions = [
    { name: 'Iron Orange', value: '#ff6b35' },
    { name: 'Crimson Red', value: '#e60012' },
    { name: 'Gold', value: '#ffd700' },
    { name: 'Silver', value: '#c0c0c0' },
    { name: 'Black', value: '#1a1a1a' },
  ];

  const glowOptions = [
    { name: 'Cyan', value: '#00d4ff' },
    { name: 'Purple', value: '#9d4edd' },
    { name: 'Green', value: '#00ff41' },
    { name: 'Red', value: '#ff0000' },
    { name: 'Orange', value: '#ff6b35' },
  ];

  const materialOptions = ['matte', 'glossy', 'metallic'] as const;

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-24 right-8 z-40 bg-iron-dark/60 hover:bg-iron-dark/80 border border-iron-blue/50 rounded px-4 py-2 text-iron-blue text-xs font-mono transition-all"
      >
        Customize Suit
      </button>

      {/* Customization Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-iron-dark border border-iron-blue/50 rounded-lg shadow-2xl w-full max-w-md max-h-96 overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-iron-blue/10 border-b border-iron-blue/30 p-4 flex justify-between items-center">
              <h2 className="text-iron-blue font-mono font-bold">SUIT CUSTOMIZATION</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-iron-blue/70 hover:text-iron-blue text-xl"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Armor Color */}
              <div>
                <label className="text-iron-blue text-xs font-mono mb-3 block">ARMOR COLOR</label>
                <div className="grid grid-cols-5 gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => updateCustomization({ armorColor: color.value })}
                      className={clsx(
                        'w-full aspect-square rounded border-2 transition-all',
                        customization.armorColor === color.value
                          ? 'border-iron-blue shadow-lg shadow-iron-blue/50'
                          : 'border-iron-blue/30 hover:border-iron-blue/70'
                      )}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Glow Color */}
              <div>
                <label className="text-iron-blue text-xs font-mono mb-3 block">GLOW COLOR</label>
                <div className="grid grid-cols-5 gap-2">
                  {glowOptions.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => updateCustomization({ glowColor: color.value })}
                      className={clsx(
                        'w-full aspect-square rounded border-2 transition-all',
                        customization.glowColor === color.value
                          ? 'border-iron-blue shadow-lg shadow-iron-blue/50'
                          : 'border-iron-blue/30 hover:border-iron-blue/70'
                      )}
                      style={{
                        backgroundColor: color.value,
                        boxShadow:
                          customization.glowColor === color.value
                            ? `0 0 20px ${color.value}`
                            : 'none',
                      }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Material Finish */}
              <div>
                <label className="text-iron-blue text-xs font-mono mb-3 block">MATERIAL FINISH</label>
                <div className="flex gap-2">
                  {materialOptions.map((material) => (
                    <button
                      key={material}
                      onClick={() => updateCustomization({ materialFinish: material })}
                      className={clsx(
                        'flex-1 px-3 py-2 rounded border text-xs font-mono uppercase transition-all',
                        customization.materialFinish === material
                          ? 'bg-iron-blue/30 border-iron-blue text-iron-blue'
                          : 'bg-iron-dark/50 border-iron-blue/30 text-iron-blue/70 hover:border-iron-blue/70'
                      )}
                    >
                      {material}
                    </button>
                  ))}
                </div>
              </div>

              {/* Battle Damage */}
              <div>
                <label className="text-iron-blue text-xs font-mono mb-3 flex justify-between">
                  <span>BATTLE DAMAGE</span>
                  <span>{customization.battleDamage.toFixed(0)}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={customization.battleDamage}
                  onChange={(e) =>
                    updateCustomization({ battleDamage: parseFloat(e.target.value) })
                  }
                  className="w-full accent-iron-blue"
                />
              </div>

              {/* Reset Button */}
              <button
                onClick={() => {
                  updateCustomization({
                    armorColor: '#ff6b35',
                    glowColor: '#00d4ff',
                    materialFinish: 'metallic',
                    battleDamage: 0,
                  });
                }}
                className="w-full bg-iron-orange/20 hover:bg-iron-orange/40 border border-iron-orange/50 rounded px-4 py-2 text-iron-orange text-xs font-mono transition-all mt-4"
              >
                RESET TO DEFAULT
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuitCustomizer;
