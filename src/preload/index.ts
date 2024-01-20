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

  getTagList: () => ipcRenderer.invoke(IPCMainEvent.getTagList)
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)
