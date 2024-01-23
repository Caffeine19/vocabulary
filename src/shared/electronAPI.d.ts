import { GetTagList } from './Tag'
import { GetFolderList } from './folder'
import type {
  GetSnippetList,
  GetSnippetDetail,
  UpdateSnippetContent,
  ConnectSnippetWithTag,
  CreateSnippet,
  DeleteSnippet,
  DestroySnippet,
  GetSnippetStatusCount,
  MoveSnippetIntoFolder
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
  moveSnippetIntoFolder: MoveSnippetIntoFolder

  getTagList: GetTagList

  getFolderList: GetFolderList
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}
