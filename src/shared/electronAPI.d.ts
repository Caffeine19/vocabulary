import { GetTagList } from './Tag'
import { CreateFolder, DeleteFolder, GetFolderList, UpdateFolderName } from './folder'
import type {
  GetSnippetList,
  GetSnippetDetail,
  UpdateSnippetContent,
  CreateSnippet,
  DeleteSnippet,
  DestroySnippet,
  GetSnippetStatusCount,
  UpdateSnippetFavorite,
  MoveSnippetIntoFolder,
  MoveSnippetIntoInbox,
  UpdateSnippetName,
  RestoreSnippet,
  FormatSnippetContent,
  UpdateSnippetTags,
  EmptySnippet
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
  updateSnippetTags: UpdateSnippetTags
  createSnippet: CreateSnippet
  deleteSnippet: DeleteSnippet
  destroySnippet: DestroySnippet
  updateSnippetFavorite: UpdateSnippetFavorite
  moveSnippetIntoFolder: MoveSnippetIntoFolder
  moveSnippetIntoInbox: MoveSnippetIntoInbox
  restoreSnippet: RestoreSnippet
  formatSnippetContent: FormatSnippetContent
  emptySnippet: EmptySnippet

  getTagList: GetTagList

  getFolderList: GetFolderList
  createFolder: CreateFolder
  deleteFolder: DeleteFolder
  updateFolderName: UpdateFolderName
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}
