import { useEffect } from 'react';

interface UseKeyboardOptions {
  key: string;
  onPress: (event: KeyboardEvent) => void;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
}

export const useKeyboard = ({
  key,
  onPress,
  ctrlKey = false,
  shiftKey = false,
  altKey = false,
}: UseKeyboardOptions) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() === key.toLowerCase() &&
        event.ctrlKey === ctrlKey &&
        event.shiftKey === shiftKey &&
        event.altKey === altKey
      ) {
        event.preventDefault();
        onPress(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [key, onPress, ctrlKey, shiftKey, altKey]);
};
