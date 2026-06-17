/**
 * Text-to-speech utilities
 */

export const speak = (text: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.volume = 0.8;

    utterance.onend = () => resolve();
    utterance.onerror = (event) => reject(event.error);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  });
};

export const stopSpeech = () => {
  window.speechSynthesis.cancel();
};

export const isSpeechSupported = (): boolean => {
  return 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
};
