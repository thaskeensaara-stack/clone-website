import React, { useState, useRef, useEffect } from 'react';
import { useKeyboard } from '@/hooks';
import clsx from 'clsx';

interface TerminalCommand {
  name: string;
  description: string;
  execute: () => Promise<string>;
}

/**
 * Terminal Component
 * Futuristic command-line interface
 */
export const Terminal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [output, setOutput] = useState<Array<{ type: 'input' | 'output'; content: string }>>([
    { type: 'output', content: 'JARVIS TERMINAL v1.0' },
    { type: 'output', content: 'Type "help" for commands' },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut to toggle terminal
  useKeyboard({
    key: '`',
    onPress: () => setIsOpen(!isOpen),
  });

  // Commands
  const commands: Record<string, TerminalCommand> = {
    help: {
      name: 'help',
      description: 'Show available commands',
      execute: async () => {
        return `
Available Commands:
  help      - Show this help message
  status    - System status report
  scan      - Initiate diagnostic scan
  reactor   - Reactor status
  power     - Power distribution
  clear     - Clear terminal
  theme     - Change UI theme
  date      - Show current date
        `.trim();
      },
    },
    status: {
      name: 'status',
      description: 'System status report',
      execute: async () => {
        return `
SYSTEM STATUS REPORT
====================
All Systems: OPERATIONAL
Reactor Output: 88%
Shield Status: ONLINE
Weapons System: ARMED
Flight Systems: READY
        `.trim();
      },
    },
    scan: {
      name: 'scan',
      description: 'Initiate diagnostic scan',
      execute: async () => {
        return 'Scanning... [████████████████████] 100% - Scan complete. All systems nominal.';
      },
    },
    clear: {
      name: 'clear',
      description: 'Clear terminal',
      execute: async () => {
        setOutput([]);
        return '';
      },
    },
    date: {
      name: 'date',
      description: 'Show current date',
      execute: async () => {
        return new Date().toLocaleString();
      },
    },
  };

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCommand.trim()) return;

    const cmd = currentCommand.trim().toLowerCase();
    setOutput((prev) => [...prev, { type: 'input', content: `$ ${currentCommand}` }]);
    setHistory((prev) => [...prev, currentCommand]);
    setCurrentCommand('');

    const command = Object.entries(commands).find(
      ([name]) => name === cmd.split(' ')[0]
    );

    if (command) {
      try {
        const result = await command[1].execute();
        if (result) {
          setOutput((prev) => [...prev, { type: 'output', content: result }]);
        }
      } catch (error) {
        setOutput((prev) => [
          ...prev,
          { type: 'output', content: `Error: ${error}` },
        ]);
      }
    } else {
      setOutput((prev) => [
        ...prev,
        { type: 'output', content: `command not found: ${cmd}` },
      ]);
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-8 right-8 z-40 bg-iron-dark/60 hover:bg-iron-dark/80 border border-iron-blue/50 rounded px-4 py-2 text-iron-blue text-xs font-mono transition-all"
      >
        Terminal
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-iron-dark border border-iron-blue/50 rounded-lg shadow-2xl w-full max-w-2xl h-96 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-iron-blue/10 border-b border-iron-blue/30 p-4 flex justify-between items-center">
          <h2 className="text-iron-blue font-mono font-bold">JARVIS TERMINAL</h2>
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
                line.type === 'input' ? 'text-iron-blue' : 'text-iron-green'
              )}
            >
              {line.content}
            </div>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={handleCommand}
          className="border-t border-iron-blue/30 p-4 flex gap-2"
        >
          <span className="text-iron-blue font-mono">$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent border-none outline-none text-iron-green font-mono text-xs"
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal;
