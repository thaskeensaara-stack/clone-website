#!/usr/bin/env node

/**
 * Development server script
 * Starts the Vite development server
 */

const { spawn } = require('child_process');
const path = require('path');

const dev = spawn('vite', { stdio: 'inherit', cwd: __dirname });

dev.on('error', (error) => {
  console.error('Failed to start dev server:', error);
  process.exit(1);
});

dev.on('exit', (code) => {
  process.exit(code || 0);
});
