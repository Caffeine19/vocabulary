import { GetTagList } from './Tag'
import type { GetSnippetList, GetSnippetDetail, UpdateSnippetContent } from './snippet'
export interface ElectronAPI {
  close: () => void
  maximize: () => void
  minimize: () => void

  getSnippetList: GetSnippetList
  getSnippetDetail: GetSnippetDetail
  updateSnippetContent: UpdateSnippetContent

  getTagList: GetTagList
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}
