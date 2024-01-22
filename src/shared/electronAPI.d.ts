import { GetTagList } from './Tag'
import type {
  GetSnippetList,
  GetSnippetDetail,
  UpdateSnippetContent,
  ConnectSnippetWithTag,
  CreateSnippet,
  DeleteSnippet,
  DestroySnippet
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
  deleteSnippet: DeleteSnippet
  destroySnippet: DestroySnippet

  getTagList: GetTagList
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}
