import { contextBridge, ipcRenderer } from 'electron'
import { ElectronAPI } from '../shared/electronAPI'

export enum IPCMainEvent {
  minimize = 'minimize',
  maximize = 'maximize',
  close = 'close',

  getSnippetList = 'getSnippetList',
  getSnippetDetail = 'getSnippetDetail',
  getSnippetStatusCount = 'getSnippetStatusCount',
  updateSnippetContent = 'updateSnippetContent',
  updateSnippetName = 'updateSnippetName',
  connectSnippetWithTag = 'connectSnippetWithTag',
  createSnippet = 'createSnippet',
  deleteSnippet = 'deleteSnippet',
  destroySnippet = 'destroySnippet',
  updateSnippetFavorite = 'updateSnippetFavorite',
  moveSnippetIntoFolder = 'moveSnippetIntoFolder',
  moveSnippetIntoInbox = 'moveSnippetIntoInbox',

  getTagList = 'getTagList',

  getFolderList = 'getFolderList'
}

const electronAPI: ElectronAPI = {
  minimize: () => ipcRenderer.send(IPCMainEvent.minimize),
  maximize: () => ipcRenderer.send(IPCMainEvent.maximize),
  close: () => ipcRenderer.send(IPCMainEvent.close),

  getSnippetList: (params) => ipcRenderer.invoke(IPCMainEvent.getSnippetList, params),
  getSnippetDetail: (id) => ipcRenderer.invoke(IPCMainEvent.getSnippetDetail, id),
  getSnippetStatusCount: () => ipcRenderer.invoke(IPCMainEvent.getSnippetStatusCount),
  updateSnippetContent: (id, content) =>
    ipcRenderer.invoke(IPCMainEvent.updateSnippetContent, id, content),
  updateSnippetName: (id, name) => ipcRenderer.invoke(IPCMainEvent.updateSnippetName, id, name),
  connectSnippetWithTag: (id, tagId) =>
    ipcRenderer.invoke(IPCMainEvent.connectSnippetWithTag, id, tagId),
  createSnippet: (params) => ipcRenderer.invoke(IPCMainEvent.createSnippet, params),
  deleteSnippet: (id) => ipcRenderer.invoke(IPCMainEvent.deleteSnippet, id),
  destroySnippet: (id) => ipcRenderer.invoke(IPCMainEvent.destroySnippet, id),
  updateSnippetFavorite: (id, favorite) =>
    ipcRenderer.invoke(IPCMainEvent.updateSnippetFavorite, id, favorite),
  moveSnippetIntoFolder: (id, folderId) =>
    ipcRenderer.invoke(IPCMainEvent.moveSnippetIntoFolder, id, folderId),
  moveSnippetIntoInbox: (id) => ipcRenderer.invoke(IPCMainEvent.moveSnippetIntoInbox, id),

  getTagList: () => ipcRenderer.invoke(IPCMainEvent.getTagList),

  getFolderList: () => ipcRenderer.invoke(IPCMainEvent.getFolderList)
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)
