import React, { useState, useRef, useEffect } from 'react';
import { useAIStore } from '@/stores/aiStore';
import { useVoiceInput, useTextToSpeech, useKeyboard } from '@/hooks';
import { animateScale, pulseAnimation } from '@/utils/animations';
import clsx from 'clsx';

/**
 * AI Assistant Orb Component
 * Floating interactive AI assistant with voice capabilities
 */
export const AIAssistantOrb: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const orbRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);

  const { messages, currentInput, isListening } = useAIStore();
  const { addMessage, setCurrentInput, setIsListening, setIsTyping } = useAIStore();
  const { startVoiceInput, stopVoiceInput, isSupported: voiceSupported } = useVoiceInput();
  const { speakText, isSpeaking } = useTextToSpeech();

  // Voice activation with spacebar
  useKeyboard({
    key: ' ',
    onPress: () => {
      if (voiceSupported) {
        if (isListening) {
          stopVoiceInput();
        } else {
          startVoiceInput();
        }
      }
    },
  });

  // Handle message submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim()) return;

    addMessage({
      role: 'user',
      content: currentInput,
    });
    setCurrentInput('');

    // Simulate AI response
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response =
      'Command received. Processing your request. All systems nominal.';
    addMessage({
      role: 'assistant',
      content: response,
    });
    setIsTyping(false);

    // Speak response
    try {
      await speakText(response);
    } catch (error) {
      console.error('Speech error:', error);
    }
  };

  // Pulse animation on interaction
  useEffect(() => {
    if (orbRef.current && (isListening || isSpeaking)) {
      pulseAnimation(orbRef.current, 1.15, 0.6);
    }
  }, [isListening, isSpeaking]);

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center">
      {/* Expanded Chat Panel */}
      {isExpanded && (
        <div
          ref={panelRef}
          className="mb-4 bg-iron-dark/80 backdrop-blur border border-iron-blue/50 rounded-lg shadow-2xl w-96 max-h-96 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-iron-blue to-iron-purple p-4 border-b border-iron-blue/30">
            <h3 className="text-white font-mono font-bold text-sm">JARVIS-AI</h3>
            <p className="text-iron-blue/70 text-xs mt-1">Status: Ready</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 ? (
              <div className="text-iron-blue/50 text-xs text-center mt-4">
                Awaiting your command...
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={clsx(
                    'text-xs font-mono p-2 rounded',
                    msg.role === 'user'
                      ? 'bg-iron-blue/20 text-iron-blue ml-4'
                      : 'bg-iron-purple/20 text-iron-purple mr-4'
                  )}
                >
                  {msg.content}
                </div>
              ))
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-iron-blue/30 p-3">
            <div className="flex gap-2">
              <input
                ref={messageInputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder="Command..."
                className="flex-1 bg-iron-dark border border-iron-blue/30 rounded px-3 py-2 text-xs font-mono text-iron-blue placeholder-iron-blue/50 outline-none focus:border-iron-blue/70 focus:shadow-[0_0_10px_rgba(0,212,255,0.3)]"
              />
              <button
                type="submit"
                className="bg-iron-blue/20 hover:bg-iron-blue/40 border border-iron-blue/50 rounded px-3 py-2 text-iron-blue text-xs font-mono transition-all"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Orb */}
      <div
        ref={orbRef}
        onClick={() => setIsExpanded(!isExpanded)}
        className={clsx(
          'relative w-16 h-16 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-110',
          isListening || isSpeaking
            ? 'bg-gradient-to-br from-iron-blue to-iron-purple shadow-[0_0_30px_rgba(0,212,255,0.8)]'
            : 'bg-gradient-to-br from-iron-purple to-iron-blue shadow-[0_0_20px_rgba(157,78,221,0.5)]'
        )}
      >
        {/* Orb glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-iron-blue to-transparent opacity-50" />

        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
          {isListening ? '🎙️' : isSpeaking ? '🔊' : '🤖'}
        </div>

        {/* Animated rings */}
        {(isListening || isSpeaking) && (
          <>
            <div className="absolute inset-0 rounded-full border-2 border-iron-blue/50 animate-pulse" />
            <div className="absolute -inset-2 rounded-full border border-iron-blue/30 animate-pulse" style={{ animationDelay: '0.2s' }} />
          </>
        )}

        {/* Floating indicator */}
        {voiceSupported && (
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-iron-green rounded-full shadow-lg" />
        )}
      </div>

      {/* Voice hint */}
      {voiceSupported && !isExpanded && (
        <div className="mt-2 text-iron-blue/70 text-xs font-mono text-center">
          Press SPACE to voice command
        </div>
      )}
    </div>
  );
};

export default AIAssistantOrb;
