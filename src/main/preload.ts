import { contextBridge, ipcRenderer } from 'electron';

/**
 * Why invoke instead of send?
- invoke is async and returns values (perfect for get).
- send is fire-and-forget (no return value).
*/

// Define the API surface exposed to renderer
const api = {
  store: {
    get: (key: string) => ipcRenderer.invoke('store-get', key),
    set: (key: string, value: unknown) => ipcRenderer.invoke('store-set', key, value),
    delete: (key: string) => ipcRenderer.invoke('store-delete', key),
    has: (key: string) => ipcRenderer.invoke('store-has', key),
  },
};

// Expose protected API to renderer via contextBridge
contextBridge.exposeInMainWorld('api', api);

// Expose ipcRenderer.send for one-way messages (like notifications)
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send: (channel: string, data: unknown) => {
      // Whitelist allowed channels for security
      const validChannels = ['timer:complete'];
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    }
  }
});