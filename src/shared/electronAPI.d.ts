import type { GetSnippetList, GetSnippetDetail, UpdateSnippetContent } from './snippet'
export interface ElectronAPI {
  close: () => void
  maximize: () => void
  minimize: () => void

  getSnippetList: GetSnippetList
  getSnippetDetail: GetSnippetDetail
  updateSnippetContent: UpdateSnippetContent
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}
