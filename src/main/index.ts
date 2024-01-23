import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

import {
  getSnippetList,
  getSnippetDetail,
  updateSnippetContent,
  connectSnippetWithTag,
  createSnippet,
  deleteSnippet,
  destroySnippet,
  getSnippetStatusCount,
  moveSnippetIntoFolder,
  moveSnippetIntoInbox
} from './data/snippet'
import { getTagList } from './data/tag'
import { getFolderList } from './data/folder'

export enum IPCMainEvent {
  minimize = 'minimize',
  maximize = 'maximize',
  close = 'close',

  getSnippetList = 'getSnippetList',
  getSnippetDetail = 'getSnippetDetail',
  getSnippetStatusCount = 'getSnippetStatusCount',
  updateSnippetContent = 'updateSnippetContent',
  connectSnippetWithTag = 'connectSnippetWithTag',
  createSnippet = 'createSnippet',
  deleteSnippet = 'deleteSnippet',
  destroySnippet = 'destroySnippet',
  moveSnippetIntoFolder = 'moveSnippetIntoFolder',
  moveSnippetIntoInbox = 'moveSnippetIntoInbox',

  getTagList = 'getTagList',

  getFolderList = 'getFolderList'
}

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    },
    trafficLightPosition: { x: 16, y: 20 },
    titleBarStyle: 'hidden'
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  //window
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

  //snippet
  ipcMain.handle(IPCMainEvent.getSnippetList, async (_, params) => {
    const res = await getSnippetList(params)
    return res
  })
  ipcMain.handle(IPCMainEvent.getSnippetStatusCount, async () => {
    const res = await getSnippetStatusCount()
    return res
  })
  ipcMain.handle(IPCMainEvent.getSnippetDetail, async (_, id) => {
    console.log('🚀 ~ ipcMain.handle ~ id:', id)
    const res = await getSnippetDetail(id)
    return res
  })
  ipcMain.handle(IPCMainEvent.updateSnippetContent, async (_, id, content) => {
    await updateSnippetContent(id, content)
  })
  ipcMain.handle(IPCMainEvent.connectSnippetWithTag, async (_, id, tagId) => {
    await connectSnippetWithTag(id, tagId)
  })
  ipcMain.handle(IPCMainEvent.createSnippet, async (_, params) => {
    const res = await createSnippet(params)
    return res
  })
  ipcMain.handle(IPCMainEvent.deleteSnippet, async (_, id) => {
    const res = await deleteSnippet(id)
    return res
  })
  ipcMain.handle(IPCMainEvent.destroySnippet, async (_, id) => {
    const res = await destroySnippet(id)
    return res
  })
  ipcMain.handle(IPCMainEvent.moveSnippetIntoFolder, async (_, id, folderId) => {
    await moveSnippetIntoFolder(id, folderId)
  })
  ipcMain.handle(IPCMainEvent.moveSnippetIntoInbox, async (_, id) => {
    await moveSnippetIntoInbox(id)
  })

  //tag
  ipcMain.handle(IPCMainEvent.getTagList, async () => {
    const res = await getTagList()
    return res
  })

  //folder
  ipcMain.handle(IPCMainEvent.getFolderList, async () => {
    const res = await getFolderList()
    return res
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
