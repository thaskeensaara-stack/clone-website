module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'iron-dark': '#0a0e27',
        'iron-blue': '#00d4ff',
        'iron-orange': '#ff6b35',
        'iron-red': '#e60012',
        'iron-green': '#00ff41',
        'iron-purple': '#9d4edd',
      },
      fontFamily: {
        mono: ['IBM Plex Mono', 'monospace'],
      },
      animation: {
        glow: 'glow 2s infinite',
        'scan-line': 'scan-line 3s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 10px rgba(0, 212, 255, 0.5)' },
          '50%': { textShadow: '0 0 20px rgba(0, 212, 255, 1)' },
          '100%': { textShadow: '0 0 10px rgba(0, 212, 255, 0.5)' },
        },
        'scan-line': {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        },
        'pulse-glow': {
          '0%': { boxShadow: '0 0 5px rgba(0, 212, 255, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.8)' },
          '100%': { boxShadow: '0 0 5px rgba(0, 212, 255, 0.3)' },
        },
      },
    },
  },
  plugins: [],
};
