import { contextBridge, ipcRenderer } from 'electron'
import { ElectronAPI } from '../shared/electronAPI'

import { IPCMainEvent } from '../main/IPCMainEvent'

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
  updateSnippetTags: (id, tagIdList) =>
    ipcRenderer.invoke(IPCMainEvent.updateSnippetTags, id, tagIdList),
  createSnippet: (params) => ipcRenderer.invoke(IPCMainEvent.createSnippet, params),
  deleteSnippet: (id) => ipcRenderer.invoke(IPCMainEvent.deleteSnippet, id),
  destroySnippet: (id) => ipcRenderer.invoke(IPCMainEvent.destroySnippet, id),
  updateSnippetFavorite: (id, favorite) =>
    ipcRenderer.invoke(IPCMainEvent.updateSnippetFavorite, id, favorite),
  moveSnippetIntoFolder: (id, folderId) =>
    ipcRenderer.invoke(IPCMainEvent.moveSnippetIntoFolder, id, folderId),
  moveSnippetIntoInbox: (id) => ipcRenderer.invoke(IPCMainEvent.moveSnippetIntoInbox, id),
  restoreSnippet: (id) => ipcRenderer.invoke(IPCMainEvent.restoreSnippet, id),
  formatSnippetContent: (id) => ipcRenderer.invoke(IPCMainEvent.formatSnippetContent, id),
  emptySnippet: () => ipcRenderer.invoke(IPCMainEvent.emptySnippet),

  getTagList: () => ipcRenderer.invoke(IPCMainEvent.getTagList),

  getFolderList: () => ipcRenderer.invoke(IPCMainEvent.getFolderList),
  createFolder: (params) => ipcRenderer.invoke(IPCMainEvent.createFolder, params),
  deleteFolder: (id) => ipcRenderer.invoke(IPCMainEvent.deleteFolder, id)
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)
