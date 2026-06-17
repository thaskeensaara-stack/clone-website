import { useEffect, useRef, useCallback, useState } from 'react';
import { speak, stopSpeech, isSpeechSupported } from '@/utils/speech';

export const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const isSupported = isSpeechSupported();
  const speakTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const speakText = useCallback(
    async (text: string) => {
      if (!isSupported) {
        console.warn('Text-to-speech not supported');
        return;
      }

      try {
        setIsSpeaking(true);
        await speak(text);
        setIsSpeaking(false);
      } catch (error) {
        console.error('Speech error:', error);
        setIsSpeaking(false);
      }
    },
    [isSupported]
  );

  const stop = useCallback(() => {
    stopSpeech();
    setIsSpeaking(false);
    if (speakTimeoutRef.current) {
      clearTimeout(speakTimeoutRef.current);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (speakTimeoutRef.current) {
        clearTimeout(speakTimeoutRef.current);
      }
      stop();
    };
  }, [stop]);

  return { speakText, stop, isSpeaking, isSupported };
};
