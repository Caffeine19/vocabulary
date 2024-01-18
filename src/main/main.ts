import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'

import { fileURLToPath } from 'url'
import { dirname } from 'path'

import { IPCMainEvent } from './ipcMainEvent'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, './preload.js')
    },
    titleBarStyle: 'hidden'
  })

  const isDev = process.env.NODE_ENV?.trim() === 'development'
  if (isDev) {
    //开发环境下加载vite的预览页面
    const port = process.env.VITE_PORT?.trim()
    console.log('🚀 ~ file: main.js:19 ~ createWindow ~ port:', port)
    win.loadURL(`http://localhost:${port}`)
  } else {
    win.loadFile(path.join(__dirname, '../../../dist/index.html'))
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

  ipcMain.on(IPCMainEvent.minimize, () => {
    BrowserWindow.getFocusedWindow()?.minimize()
  })
  ipcMain.on(IPCMainEvent.maximize, () => {
    const win = BrowserWindow.getFocusedWindow()
    if (win?.isMaximized()) {
      win.unmaximize()
    } else {
      win?.maximize()
    }
  })
  ipcMain.on(IPCMainEvent.close, () => {
    BrowserWindow.getFocusedWindow()?.close()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
