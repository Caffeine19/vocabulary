import { contextBridge, ipcRenderer } from 'electron'

import { IPCMainEvent } from './ipcMainEvent'
import { ElectronAPI } from '../shared/electronAPI'

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
  close: () => ipcRenderer.invoke(IPCMainEvent.close)
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)
