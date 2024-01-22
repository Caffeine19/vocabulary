import { contextBridge, ipcRenderer } from 'electron'
import { ElectronAPI } from '../shared/electronAPI'

export enum IPCMainEvent {
  minimize = 'minimize',
  maximize = 'maximize',
  close = 'close',

  getSnippetList = 'getSnippetList',
  getSnippetDetail = 'getSnippetDetail',
  updateSnippetContent = 'updateSnippetContent',
  connectSnippetWithTag = 'connectSnippetWithTag',
  createSnippet = 'createSnippet',
  deleteSnippet = 'deleteSnippet',
  destroySnippet = 'destroySnippet',

  getTagList = 'getTagList'
}

const electronAPI: ElectronAPI = {
  minimize: () => ipcRenderer.send(IPCMainEvent.minimize),
  maximize: () => ipcRenderer.send(IPCMainEvent.maximize),
  close: () => ipcRenderer.send(IPCMainEvent.close),

  getSnippetList: (params) => ipcRenderer.invoke(IPCMainEvent.getSnippetList, params),
  getSnippetDetail: (id) => ipcRenderer.invoke(IPCMainEvent.getSnippetDetail, id),
  updateSnippetContent: (id, content) =>
    ipcRenderer.invoke(IPCMainEvent.updateSnippetContent, id, content),
  connectSnippetWithTag: (id, tagId) =>
    ipcRenderer.invoke(IPCMainEvent.connectSnippetWithTag, id, tagId),
  createSnippet: (params) => ipcRenderer.invoke(IPCMainEvent.createSnippet, params),
  deleteSnippet: (id) => ipcRenderer.invoke(IPCMainEvent.deleteSnippet, id),
  destroySnippet: (id) => ipcRenderer.invoke(IPCMainEvent.destroySnippet, id),

  getTagList: () => ipcRenderer.invoke(IPCMainEvent.getTagList)
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)
