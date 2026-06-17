import React, { useState, useRef, useEffect } from 'react';
import { executeCommand } from '@/utils/commands';
import { useKeyboard } from '@/hooks';
import { useAIStore } from '@/stores/aiStore';
import clsx from 'clsx';

interface AdvancedCommand {
  name: string;
  description: string;
  examples: string[];
  category: 'system' | 'suit' | 'ai' | 'scan' | 'mission';
  execute: (args: string[]) => Promise<string>;
}

/**
 * Advanced Terminal Component
 * Enhanced command-line with AI integration and command suggestions
 */
export const AdvancedTerminal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentCommand, setCurrentCommand] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [output, setOutput] = useState<Array<{ type: 'input' | 'output' | 'error'; content: string }>>([
    { type: 'output', content: 'JARVIS TERMINAL v2.0' },
    { type: 'output', content: 'AI-Powered Command Interface' },
    { type: 'output', content: 'Type "help" for commands | "suggest" for AI suggestions' },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const { addMessage } = useAIStore();

  // Keyboard shortcut to toggle terminal
  useKeyboard({
    key: '`',
    onPress: () => setIsOpen(!isOpen),
  });

  // Enhanced commands with AI capabilities
  const commands: Record<string, AdvancedCommand> = {
    help: {
      name: 'help',
      description: 'Show available commands',
      examples: ['help', 'help system'],
      category: 'system',
      execute: async () => {
        const categories = {
          system: ['status', 'scan', 'diagnostics', 'logs'],
          suit: ['armor', 'reactor', 'power', 'weapons'],
          ai: ['learn', 'memory', 'predict', 'optimize'],
          scan: ['targets', 'threats', 'analyze', 'track'],
          mission: ['objectives', 'progress', 'complete', 'abort'],
        };

        return `
AVAILABLE COMMANDS BY CATEGORY:
${Object.entries(categories)
  .map(([category, cmds]) => `  ${category.toUpperCase()}: ${cmds.join(', ')}`)
  .join('\n')}

Tip: Use "suggest" for AI-powered command suggestions
        `.trim();
      },
    },
    status: {
      name: 'status',
      description: 'System status report',
      examples: ['status', 'status detailed'],
      category: 'system',
      execute: async () => {
        return `
SYSTEM STATUS REPORT [${new Date().toLocaleTimeString()}]
═══════════════════════════════════════════
Core Systems:      OPERATIONAL ✓
Reactor Output:    88% (Normal)
Shield Status:     ONLINE ✓
Weapons System:    ARMED ✓
Flight Systems:    READY ✓
AI Core:           ACTIVE ✓
Network Status:    CONNECTED ✓

All systems nominal. Ready for deployment.
        `.trim();
      },
    },
    scan: {
      name: 'scan',
      description: 'Initiate diagnostic scan',
      examples: ['scan', 'scan full', 'scan reactor'],
      category: 'system',
      execute: async () => {
        return `
DIAGNOSTIC SCAN INITIATED
Scanning: [████████████████████] 100%

Results:
- Structural Integrity: 98.5%
- Systems Health: 97.2%
- Network Latency: 2.3ms
- Processing Power: Optimal
- Memory Usage: 62%

Scan complete. No anomalies detected.
        `.trim();
      },
    },
    reactor: {
      name: 'reactor',
      description: 'Reactor status and diagnostics',
      examples: ['reactor', 'reactor boost', 'reactor cooldown'],
      category: 'suit',
      execute: async () => {
        return `
REACTOR DIAGNOSTICS
═══════════════════
Core Temperature: 2847K (Normal)
Power Output:     88% of max capacity
Efficiency:       94.7%
Fuel Cell Status: Optimal
Cooling Systems:  Active
Next Maintenance: 48 hours

Reactor Status: STABLE
        `.trim();
      },
    },
    power: {
      name: 'power',
      description: 'Power distribution status',
      examples: ['power', 'power boost', 'power status'],
      category: 'suit',
      execute: async () => {
        return `
POWER DISTRIBUTION GRID
═══════════════════════
Weapons:     18% (75 MW)
Flight:      32% (140 MW)
DEF Systems: 28% (125 MW)
Computers:   15% (65 MW)
Misc:        7%  (30 MW)

Total Output: 435 MW / 500 MW (87%)
Status: OPTIMAL EFFICIENCY
        `.trim();
      },
    },
    suggest: {
      name: 'suggest',
      description: 'AI-powered command suggestions',
      examples: ['suggest', 'suggest next action', 'suggest optimize'],
      category: 'ai',
      execute: async () => {
        const suggestions = [
          'Run "scan" for system diagnostics',
          'Consider "power boost" for increased performance',
          'Reactor efficiency could be improved with maintenance',
          'Current threat level: LOW. No immediate action required',
          'Memory usage optimal. AI core operating at peak efficiency',
        ];
        const random = Math.floor(Math.random() * suggestions.length);
        return `
AI SUGGESTIONS:

${suggestions[random]}

Confidence: ${(70 + Math.random() * 25).toFixed(1)}%
        `.trim();
      },
    },
    learn: {
      name: 'learn',
      description: 'AI learning and memory management',
      examples: ['learn pattern', 'learn behavior'],
      category: 'ai',
      execute: async () => {
        return `
AI LEARNING PROTOCOL
════════════════════
New Patterns Detected: 3
Behavior Predictions: +12% accuracy
Memory Optimization: Active
Learning Rate: 0.87

AI is continuously improving. Your preferences are being learned.
        `.trim();
      },
    },
    clear: {
      name: 'clear',
      description: 'Clear terminal',
      examples: ['clear'],
      category: 'system',
      execute: async () => {
        setOutput([]);
        return '';
      },
    },
    echo: {
      name: 'echo',
      description: 'Echo input text',
      examples: ['echo Hello World'],
      category: 'system',
      execute: async (args) => {
        return args.join(' ');
      },
    },
    date: {
      name: 'date',
      description: 'Show current date and time',
      examples: ['date'],
      category: 'system',
      execute: async () => {
        return new Date().toString();
      },
    },
  };

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCommand.trim()) return;

    const cmd = currentCommand.trim().toLowerCase();
    setOutput((prev) => [...prev, { type: 'input', content: `$ ${currentCommand}` }]);
    setHistory((prev) => [...prev, currentCommand]);
    setHistoryIndex(-1);
    setCurrentCommand('');
    setShowSuggestions(false);

    const [commandName, ...args] = cmd.split(' ');
    const command = commands[commandName];

    if (command) {
      try {
        const result = await command.execute(args);
        if (result) {
          setOutput((prev) => [...prev, { type: 'output', content: result }]);
        }

        // Log to AI assistant
        addMessage({
          role: 'assistant',
          content: `Command executed: ${commandName}. ${result.split('\n')[0]}`,
        });
      } catch (error) {
        setOutput((prev) => [
          ...prev,
          { type: 'error', content: `Error: ${error}` },
        ]);
      }
    } else {
      setOutput((prev) => [
        ...prev,
        { type: 'error', content: `command not found: ${commandName}` },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(newIndex);
      setCurrentCommand(history[history.length - 1 - newIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIndex);
      setCurrentCommand(
        newIndex === -1 ? '' : history[history.length - 1 - newIndex]
      );
    } else if (e.key === 'Tab') {
      e.preventDefault();
      setShowSuggestions(!showSuggestions);
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  // Focus input when opening
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-8 right-8 z-40 bg-iron-dark/60 hover:bg-iron-dark/80 border border-iron-blue/50 rounded px-4 py-2 text-iron-blue text-xs font-mono transition-all"
        title="Press ` to toggle terminal"
      >
        Terminal
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-iron-dark border border-iron-blue/50 rounded-lg shadow-2xl w-full max-w-3xl h-96 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-iron-blue/10 border-b border-iron-blue/30 p-4 flex justify-between items-center">
          <div>
            <h2 className="text-iron-blue font-mono font-bold">JARVIS ADVANCED TERMINAL</h2>
            <p className="text-iron-blue/50 text-xs mt-1">AI-Powered Command Interface</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-iron-blue/70 hover:text-iron-blue text-xl"
          >
            ×
          </button>
        </div>

        {/* Output */}
        <div
          ref={outputRef}
          className="flex-1 overflow-y-auto p-4 space-y-1 font-mono text-xs"
        >
          {output.map((line, idx) => (
            <div
              key={idx}
              className={clsx(
                line.type === 'input'
                  ? 'text-iron-blue'
                  : line.type === 'error'
                    ? 'text-iron-red'
                    : 'text-iron-green'
              )}
            >
              {line.content}
            </div>
          ))}
        </div>

        {/* Suggestions */}
        {showSuggestions && (
          <div className="border-t border-iron-blue/30 bg-iron-dark/50 p-3 max-h-20 overflow-y-auto">
            <div className="text-iron-purple text-xs mb-2 font-bold">SUGGESTED COMMANDS:</div>
            <div className="space-y-1">
              {Object.values(commands)
                .slice(0, 5)
                .map((cmd) => (
                  <div
                    key={cmd.name}
                    className="text-iron-blue/70 text-xs hover:text-iron-blue cursor-pointer"
                    onClick={() => {
                      setCurrentCommand(cmd.name);
                      setShowSuggestions(false);
                    }}
                  >
                    {cmd.name} - {cmd.description}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleCommand} className="border-t border-iron-blue/30 p-4 flex gap-2">
          <span className="text-iron-blue font-mono">$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter command (press Tab for suggestions)..."
            className="flex-1 bg-transparent border-none outline-none text-iron-green font-mono text-xs placeholder-iron-green/30"
          />
        </form>
      </div>
    </div>
  );
};

export default AdvancedTerminal;
