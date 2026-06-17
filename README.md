# Iron Man OS - Futuristic AI Interface

A premium, cinematic futuristic operating system inspired by the AI interface from Iron Man films. Built with React, Three.js, and TypeScript.

## Features

### 🤖 AI Assistant
- Floating interactive AI orb
- Voice input (Web Speech API)
- Text-to-speech responses
- Chat history and session memory
- Natural language command processing

### 🎨 3D Scene
- Procedurally generated Iron Man suit
- Advanced lighting with HDR
- Bloom post-processing effects
- Floating particle system
- Smooth camera controls and animations

### 📊 Advanced HUD
- Real-time metric displays
- Animated progress bars
- System status indicators
- Power, reactor, temperature monitoring
- Flight and weapons system readouts

### 🛠️ Customization
- Armor color selection
- Glow effect customization
- Material finish options
- Battle damage visualization
- Real-time suit updates

### 🖥️ Terminal Interface
- Futuristic command-line interface
- System diagnostic commands
- Status reporting
- Command history
- Auto-complete support

### 🎯 Scanning Mode
- Full-screen scanning overlay
- Grid and target detection
- Real-time threat analysis
- Animated reticle system
- Distance calculations

### 📋 Mission System
- Mission dashboard
- Objective tracking
- Progress monitoring
- Status indicators
- Mission logs

## Tech Stack

- **React 18** - UI framework
- **Three.js** - 3D rendering
- **React Three Fiber** - React renderer for Three.js
- **TypeScript** - Type-safe JavaScript
- **GSAP** - Animation library
- **Zustand** - State management
- **Tailwind CSS** - Utility-first CSS
- **Vite** - Build tool

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/        # React UI components
├── scenes/           # Three.js scene components
├── stores/           # Zustand state management
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── types/            # TypeScript types
├── App.tsx           # Main app component
├── App.css           # App styles
├── main.tsx          # React entry point
└── index.css         # Global styles
```

## Key Commands

### Voice Input
Press **SPACE** to activate voice input. Speak your commands naturally.

### Terminal
Press **`** (backtick) to open the terminal interface.

### Available Terminal Commands
- `help` - Show available commands
- `status` - System status report
- `scan` - Initiate diagnostic scan
- `reactor` - Reactor status
- `power` - Power distribution
- `clear` - Clear terminal
- `date` - Show current date/time

### AI Commands
- "Scroll to Features"
- "Open Technology"
- "Rotate the suit"
- "Zoom camera"
- "Highlight reactor"
- "Start diagnostics"
- "Hide HUD"
- "Switch to dark mode"

## Performance Optimizations

- Lazy loading of assets
- Memoized expensive calculations
- Optimized render cycles
- Component splitting for better performance
- Three.js LOD (Level of Detail) implementation
- Efficient particle system

## Browser Support

- Chrome/Edge (88+)
- Firefox (87+)
- Safari (14+)
- Requires WebGL 2.0
- Web Speech API (for voice features)

## Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:

```javascript
colors: {
  'iron-dark': '#0a0e27',
  'iron-blue': '#00d4ff',
  'iron-orange': '#ff6b35',
  // ...
}
```

### 3D Scene
Modify `src/scenes/IronManSuit.tsx` to adjust suit geometry and materials.

### HUD Metrics
Edit `src/components/HUD.tsx` to add or modify metrics.

## Performance Tips

1. Use `React.memo()` for expensive components
2. Optimize Three.js geometry (avoid unnecessary geometry updates)
3. Use LOD for complex 3D models
4. Lazy load large assets
5. Monitor FPS in development tools

## Future Enhancements

- [ ] 3D model imports (GLTF/GLB)
- [ ] Advanced particle physics
- [ ] Multiplayer support
- [ ] VR compatibility
- [ ] Advanced gesture recognition
- [ ] ML-powered command suggestions
- [ ] Custom audio themes
- [ ] Scene recording and playback

## License

MIT

## Author

Built with ❤️ by a Principal Software Engineer

## Support

For issues or feature requests, please open an issue on GitHub.
