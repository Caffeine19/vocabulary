import { contextBridge, ipcRenderer } from 'electron'

import { ElectronAPI } from '../shared/electronAPI'

export enum IPCMainEvent {
  minimize = 'minimize',
  maximize = 'maximize',
  close = 'close',

  getSnippetList = 'getSnippetList'
}

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type] || '')
  }
})

const electronAPI: ElectronAPI = {
  minimize: () => ipcRenderer.invoke(IPCMainEvent.minimize),
  maximize: () => ipcRenderer.invoke(IPCMainEvent.maximize),
  close: () => ipcRenderer.invoke(IPCMainEvent.close),

  getSnippetList: () => ipcRenderer.invoke(IPCMainEvent.getSnippetList)
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)
