// src/renderer/services/storageService.ts
import type { TimerSettings } from '../stores/timer';

export async function loadSettings(): Promise<TimerSettings> {
  // Use your existing 'store-get' IPC handler
  const settings = await window.api.store.get('timerSettings') as TimerSettings;

  // Return defaults if not found
  return settings || {
    workDuration: 20,
    breakDuration: 20,
    longBreakDuration: 5,
    longBreakInterval: 4
  };
}

export async function saveSettings(settings: TimerSettings): Promise<void> {
  // Use your existing 'store-set' IPC handler
  await window.api.store.set('timerSettings', settings);
}
