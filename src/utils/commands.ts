/**
 * Command handler utilities for AI interactions with website
 */

export const commandHandlers = {
  scroll: (target: string) => {
    const element = document.querySelector(`[data-section="${target}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      return `Scrolling to ${target}`;
    }
    return `Section ${target} not found`;
  },

  open: (panel: string) => {
    const event = new CustomEvent('openPanel', { detail: { panel } });
    window.dispatchEvent(event);
    return `Opening ${panel}`;
  },

  rotate: (direction: string) => {
    const event = new CustomEvent('rotateSuit', { detail: { direction } });
    window.dispatchEvent(event);
    return `Rotating suit ${direction}`;
  },

  zoom: (level: string) => {
    const zoomLevel = parseFloat(level);
    const event = new CustomEvent('zoomCamera', { detail: { level: zoomLevel } });
    window.dispatchEvent(event);
    return `Zoom set to ${zoomLevel}`;
  },

  highlight: (target: string) => {
    const event = new CustomEvent('highlight', { detail: { target } });
    window.dispatchEvent(event);
    return `Highlighting ${target}`;
  },

  scan: () => {
    const event = new CustomEvent('startScan', {});
    window.dispatchEvent(event);
    return 'Diagnostic scan initiated';
  },

  toggleHUD: () => {
    const event = new CustomEvent('toggleHUD', {});
    window.dispatchEvent(event);
    return 'HUD toggled';
  },

  theme: (mode: string) => {
    const event = new CustomEvent('setTheme', { detail: { mode } });
    window.dispatchEvent(event);
    return `Theme set to ${mode}`;
  },
};

export const parseCommand = (input: string): [string, string[]] => {
  const parts = input.trim().toLowerCase().split(/\s+/);
  const command = parts[0];
  const args = parts.slice(1);
  return [command, args];
};

export const executeCommand = async (
  input: string
): Promise<string> => {
  const [command, args] = parseCommand(input);

  const handler = (commandHandlers as Record<string, (...a: any[]) => string>)[command];
  if (handler) {
    try {
      return handler(...args);
    } catch (error) {
      return `Error executing command: ${error}`;
    }
  }

  return `Unknown command: ${command}`;
};
