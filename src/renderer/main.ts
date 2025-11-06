// src/renderer/main.ts (or wherever you initialize your app)
import { mount } from 'svelte';
import App from './App.svelte';
import BreakOverlay from './components/BreakOverlay.svelte';
import { timerService } from './services/timerService';

// Expose timerService to window for main process access
declare global {
  interface Window {
    timerService: typeof timerService;
  }
}

window.timerService = timerService;

const target = document.getElementById('app')!;

// Simple hash-based routing
const hash = window.location.hash;

let app;

if (hash === '#/break') {
  console.log('[Renderer] Mounting BreakOverlay component');
  app = mount(BreakOverlay, { target });
} else {
  console.log('[Renderer] Mounting App component');
  app = mount(App, { target });
}

export default app;
