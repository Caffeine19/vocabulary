import { AddParametersBefore } from '../../../shared/addParameters'
import { CreateFolder } from '../../../shared/folder'
import { createFolder } from '../services/folder'

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
