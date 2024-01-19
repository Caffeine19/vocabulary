import { contextBridge, ipcRenderer } from 'electron'
import { ElectronAPI } from '../shared/electronAPI'

export enum IPCMainEvent {
  minimize = 'minimize',
  maximize = 'maximize',
  close = 'close',

  getSnippetList = 'getSnippetList',
  getSnippetDetail = 'getSnippetDetail',
  updateSnippetContent = 'updateSnippetContent',
  getTagList = 'getTagList'
}

const electronAPI: ElectronAPI = {
  minimize: () => ipcRenderer.invoke(IPCMainEvent.minimize),
  maximize: () => ipcRenderer.invoke(IPCMainEvent.maximize),
  close: () => ipcRenderer.invoke(IPCMainEvent.close),

  getSnippetList: (params) => ipcRenderer.invoke(IPCMainEvent.getSnippetList, params),
  getSnippetDetail: (id) => ipcRenderer.invoke(IPCMainEvent.getSnippetDetail, id),
  updateSnippetContent: (id, content) =>
    ipcRenderer.invoke(IPCMainEvent.updateSnippetContent, id, content),

  getTagList: () => ipcRenderer.invoke(IPCMainEvent.getTagList)
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)
