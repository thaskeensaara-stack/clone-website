/**
 * Voice input utilities using Web Speech API
 */

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  isFinal: boolean;
}

const SpeechRecognition =
  (window as any).SpeechRecognition ||
  (window as any).webkitSpeechRecognition ||
  (window as any).mozSpeechRecognition ||
  (window as any).msSpeechRecognition;

export const startListening = (
  onResult: (transcript: string, isFinal: boolean) => void,
  onError?: (error: string) => void
): (() => void) | null => {
  if (!SpeechRecognition) {
    console.warn('Speech Recognition not supported');
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.language = 'en-US';

  recognition.onstart = () => {
    console.log('Listening...');
  };

  recognition.onresult = (event: any) => {
    let interimTranscript = '';
    let finalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;

      if (event.results[i].isFinal) {
        finalTranscript += transcript + ' ';
      } else {
        interimTranscript += transcript;
      }
    }

    if (finalTranscript) {
      onResult(finalTranscript.trim(), true);
    } else if (interimTranscript) {
      onResult(interimTranscript, false);
    }
  };

  recognition.onerror = (event: any) => {
    if (onError) {
      onError(`Speech recognition error: ${event.error}`);
    }
  };

  recognition.onend = () => {
    console.log('Stopped listening');
  };

  recognition.start();

  return () => recognition.stop();
};

export const isVoiceInputSupported = (): boolean => {
  return !!SpeechRecognition;
};
