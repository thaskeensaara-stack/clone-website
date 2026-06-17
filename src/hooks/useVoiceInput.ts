import { useEffect, useRef, useCallback } from 'react';
import { useAIStore } from '@/stores/aiStore';
import { startListening, isVoiceInputSupported } from '@/utils/voiceInput';

export const useVoiceInput = () => {
  const stopListeningRef = useRef<(() => void) | null>(null);
  const { setIsListening, addMessage } = useAIStore();
  const isSupported = isVoiceInputSupported();

  const startVoiceInput = useCallback(() => {
    if (!isSupported) {
      console.warn('Voice input not supported');
      return;
    }

    setIsListening(true);
    stopListeningRef.current = startListening(
      (transcript, isFinal) => {
        if (isFinal) {
          addMessage({
            role: 'user',
            content: transcript,
          });
          setIsListening(false);
        }
      },
      (error) => {
        console.error(error);
        setIsListening(false);
      }
    );
  }, [isSupported, setIsListening, addMessage]);

  const stopVoiceInput = useCallback(() => {
    if (stopListeningRef.current) {
      stopListeningRef.current();
      stopListeningRef.current = null;
    }
    setIsListening(false);
  }, [setIsListening]);

  useEffect(() => {
    return () => {
      if (stopListeningRef.current) {
        stopListeningRef.current();
      }
    };
  }, []);

  return { startVoiceInput, stopVoiceInput, isSupported };
};
