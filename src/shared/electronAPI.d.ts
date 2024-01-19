import type { GetSnippetList, GetSnippetDetail } from './snippet'
export interface ElectronAPI {
  close: () => void
  maximize: () => void
  minimize: () => void

  getSnippetList: GetSnippetList
  getSnippetDetail: GetSnippetDetail
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}
