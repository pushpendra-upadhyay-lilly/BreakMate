// src/renderer/types/electron.d.ts
export interface IElectronAPI {
  store: {
    get: (key: string) => Promise<unknown>;
    set: (key: string, value: unknown) => Promise<void>;
    delete: (key: string) => Promise<void>;
    has: (key: string) => Promise<boolean>;
  };
}

declare global {
  interface Window {
    api: IElectronAPI;
    electron?: {
      ipcRenderer: {
        send: (channel: string, data: unknown) => void;
      };
    };
  }
}
