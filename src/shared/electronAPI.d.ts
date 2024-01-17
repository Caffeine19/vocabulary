export interface ElectronAPI {
  close: () => void
  maximize: () => void
  minimize: () => void
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}
