import { GetTagList } from './Tag'
import type {
  GetSnippetList,
  GetSnippetDetail,
  UpdateSnippetContent,
  ConnectSnippetWithTag,
  CreateSnippet,
  DeleteSnippet,
  DestroySnippet,
  GetSnippetStatusCount,
  UpdateSnippetFavorite
} from './snippet'
export interface ElectronAPI {
  close: () => void
  maximize: () => void
  minimize: () => void

  getSnippetList: GetSnippetList
  getSnippetDetail: GetSnippetDetail
  getSnippetStatusCount: GetSnippetStatusCount
  updateSnippetContent: UpdateSnippetContent
  connectSnippetWithTag: ConnectSnippetWithTag
  createSnippet: CreateSnippet
  deleteSnippet: DeleteSnippet
  destroySnippet: DestroySnippet
  updateSnippetFavorite: UpdateSnippetFavorite

  getTagList: GetTagList
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}
