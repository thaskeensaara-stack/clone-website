/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
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
        'futura': ['Futura', 'sans-serif'],
        'mono': ['IBM Plex Mono', 'monospace'],
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(0, 212, 255, 0.5)',
        'glow-orange': '0 0 20px rgba(255, 107, 53, 0.5)',
        'glow-purple': '0 0 20px rgba(157, 78, 221, 0.5)',
      },
    },
  },
  plugins: [],
};
