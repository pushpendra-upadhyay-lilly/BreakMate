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

// Check both hash and search params for route (loadFile uses search params)
const hash = window.location.hash;
const searchParams = new URLSearchParams(window.location.search);
const routeParam = searchParams.get('route');

let app;

// Check if this is the break overlay route
const isBreakRoute =
  routeParam === 'break' ||
  hash === '#break' ||
  hash === '#/break' ||
  hash.includes('break');

if (isBreakRoute) {
  console.log('[Renderer] Mounting BreakOverlay component');
  app = mount(BreakOverlay, { target });
} else {
  console.log('[Renderer] Mounting App component');
  app = mount(App, { target });
}

export default app;
