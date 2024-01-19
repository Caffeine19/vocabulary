import { contextBridge, ipcRenderer } from 'electron'
import { ElectronAPI } from '../shared/electronAPI'

export enum IPCMainEvent {
  minimize = 'minimize',
  maximize = 'maximize',
  close = 'close',

  getSnippetList = 'getSnippetList',
  getSnippetDetail = 'getSnippetDetail',
  updateSnippetContent = 'updateSnippetContent'
}

const electronAPI: ElectronAPI = {
  minimize: () => ipcRenderer.invoke(IPCMainEvent.minimize),
  maximize: () => ipcRenderer.invoke(IPCMainEvent.maximize),
  close: () => ipcRenderer.invoke(IPCMainEvent.close),

  getSnippetList: () => ipcRenderer.invoke(IPCMainEvent.getSnippetList),
  getSnippetDetail: (id) => ipcRenderer.invoke(IPCMainEvent.getSnippetDetail, id),
  updateSnippetContent: (id, content) =>
    ipcRenderer.invoke(IPCMainEvent.updateSnippetContent, id, content)
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)
