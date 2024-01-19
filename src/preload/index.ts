import { contextBridge, ipcRenderer } from 'electron'
import { ElectronAPI } from '../shared/electronAPI'

export enum IPCMainEvent {
  minimize = 'minimize',
  maximize = 'maximize',
  close = 'close',

  getSnippetList = 'getSnippetList'
}

const electronAPI: ElectronAPI = {
  minimize: () => ipcRenderer.invoke(IPCMainEvent.minimize),
  maximize: () => ipcRenderer.invoke(IPCMainEvent.maximize),
  close: () => ipcRenderer.invoke(IPCMainEvent.close),

  getSnippetList: () => ipcRenderer.invoke(IPCMainEvent.getSnippetList)
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)
