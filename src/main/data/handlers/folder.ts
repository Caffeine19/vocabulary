import { AddParametersBefore } from '../../../shared/addParameters'
import { CreateFolder, DeleteFolder } from '../../../shared/folder'
import { createFolder, deleteFolder } from '../services/folder'

export const onCreateFolder: AddParametersBefore<
  CreateFolder,
  [e: Electron.IpcMainInvokeEvent]
> = async (_, params) => {
  try {
    const res = await createFolder(params)
    return {
      data: res,
      success: true
    }
  } catch (error) {
    return {
      msg: (error as Error).message,
      success: false
    }
  }
}

export const onDeleteFolder: AddParametersBefore<
  DeleteFolder,
  [e: Electron.IpcMainInvokeEvent]
> = async (_, id) => {
  try {
    const res = await deleteFolder(id)
    return {
      data: res,
      success: true
    }
  } catch (error) {
    return {
      msg: (error as Error).message,
      success: false
    }
  }
}
