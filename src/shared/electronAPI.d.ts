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
  UpdateSnippetFavorite,
  MoveSnippetIntoFolder,
  MoveSnippetIntoInbox,
  UpdateSnippetName
} from './snippet'
export interface ElectronAPI {
  close: () => void
  maximize: () => void
  minimize: () => void

  getSnippetList: GetSnippetList
  getSnippetDetail: GetSnippetDetail
  getSnippetStatusCount: GetSnippetStatusCount
  updateSnippetContent: UpdateSnippetContent
  updateSnippetName: UpdateSnippetName
  connectSnippetWithTag: ConnectSnippetWithTag
  createSnippet: CreateSnippet
  deleteSnippet: DeleteSnippet
  destroySnippet: DestroySnippet
  updateSnippetFavorite: UpdateSnippetFavorite
  moveSnippetIntoFolder: MoveSnippetIntoFolder
  moveSnippetIntoInbox: MoveSnippetIntoInbox

  getTagList: GetTagList

  getFolderList: GetFolderList
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}
