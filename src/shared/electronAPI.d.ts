import type { GetSnippetList } from './snippet'
export interface ElectronAPI {
  close: () => void
  maximize: () => void
  minimize: () => void

  getSnippetList: GetSnippetList
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}
