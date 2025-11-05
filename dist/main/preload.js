"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
/**
 * Why invoke instead of send?
- invoke is async and returns values (perfect for get).
- send is fire-and-forget (no return value).
*/
// Define the API surface exposed to renderer
const api = {
    store: {
        get: (key) => electron_1.ipcRenderer.invoke('store-get', key),
        set: (key, value) => electron_1.ipcRenderer.invoke('store-set', key, value),
        delete: (key) => electron_1.ipcRenderer.invoke('store-delete', key),
        has: (key) => electron_1.ipcRenderer.invoke('store-has', key),
    },
};
// Expose protected API to renderer via contextBridge
electron_1.contextBridge.exposeInMainWorld('api', api);
// Expose ipcRenderer.send for one-way messages (like notifications)
electron_1.contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: {
        send: (channel, data) => {
            // Whitelist allowed channels for security
            const validChannels = ['timer:complete'];
            if (validChannels.includes(channel)) {
                electron_1.ipcRenderer.send(channel, data);
            }
        }
    }
});
