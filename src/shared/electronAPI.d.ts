import { GetTagList } from './Tag'
import type {
  GetSnippetList,
  GetSnippetDetail,
  UpdateSnippetContent,
  ConnectSnippetWithTag,
  CreateSnippet
} from './snippet'
export interface ElectronAPI {
  close: () => void
  maximize: () => void
  minimize: () => void

  getSnippetList: GetSnippetList
  getSnippetDetail: GetSnippetDetail
  updateSnippetContent: UpdateSnippetContent
  connectSnippetWithTag: ConnectSnippetWithTag
  createSnippet: CreateSnippet

  getTagList: GetTagList
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}
