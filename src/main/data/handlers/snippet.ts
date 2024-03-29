import { AddParametersBefore } from '../../../shared/addParameters'
import {
  EmptySnippet,
  FormatSnippetContent,
  GetSnippetDetail,
  GetSnippetList,
  GetSnippetStatusCount,
  RestoreSnippet,
  UpdateSnippetContent,
  UpdateSnippetName,
  UpdateSnippetTags
} from '../../../shared/snippet'

import {
  emptySnippet,
  formatSnippetContent,
  getSnippetDetail,
  getSnippetList,
  getSnippetStatusCount,
  restoreSnippet,
  updateSnippetContent,
  updateSnippetName,
  updateSnippetTags
} from '../services/snippet'

export const onGetSnippetList: AddParametersBefore<
  GetSnippetList,
  [e: Electron.IpcMainInvokeEvent]
> = async (_, params) => {
  try {
    const res = await getSnippetList(params)
    return {
      success: true,
      data: res
    }
  } catch (error) {
    return {
      msg: (error as Error).message,
      success: false
    }
  }
}

export const onGetSnippetStatusCount: AddParametersBefore<
  GetSnippetStatusCount,
  [e: Electron.IpcMainInvokeEvent]
> = async () => {
  try {
    const res = await getSnippetStatusCount()
    return {
      success: true,
      data: res
    }
  } catch (error) {
    return {
      msg: (error as Error).message,
      success: false
    }
  }
}

export const onGetSnippetDetail: AddParametersBefore<
  GetSnippetDetail,
  [e: Electron.IpcMainInvokeEvent]
> = async (_, params) => {
  try {
    const res = await getSnippetDetail(params)
    return {
      success: true,
      data: res
    }
  } catch (error) {
    console.log('🚀 ~ error:', error)
    return { msg: (error as Error).message, success: false }
  }
}

export const onUpdateSnippetContent: AddParametersBefore<
  UpdateSnippetContent,
  [e: Electron.IpcMainInvokeEvent]
> = async (_, id, content) => {
  try {
    const res = await updateSnippetContent(id, content)

    return {
      success: true,
      data: res
    }
  } catch (error) {
    console.log('🚀 ~ onUpdateSnippetContent ~ error:', error)

    return { msg: (error as Error).message, success: false }
  }
}

export const onUpdateSnippetName: AddParametersBefore<
  UpdateSnippetName,
  [e: Electron.IpcMainInvokeEvent]
> = async (_, id, name) => {
  try {
    const res = await updateSnippetName(id, name)
    return {
      success: true,
      data: res
    }
  } catch (error) {
    return { msg: (error as Error).message, success: false }
  }
}

export const onRestoreSnippet: AddParametersBefore<
  RestoreSnippet,
  [e: Electron.IpcMainInvokeEvent]
> = async (_, id) => {
  try {
    const res = await restoreSnippet(id)
    return {
      success: true,
      data: res
    }
  } catch (error) {
    return { msg: (error as Error).message, success: false }
  }
}

export const onFormatSnippetContent: AddParametersBefore<
  FormatSnippetContent,
  [e: Electron.IpcMainInvokeEvent]
> = async (_, id) => {
  try {
    const res = await formatSnippetContent(id)
    return {
      success: true,
      data: res
    }
  } catch (error) {
    return { msg: (error as Error).message, success: false }
  }
}

export const onUpdateSnippetTags: AddParametersBefore<
  UpdateSnippetTags,
  [e: Electron.IpcMainInvokeEvent]
> = async (_, id, tagIdList) => {
  try {
    const res = await updateSnippetTags(id, tagIdList)
    console.log('🚀 ~ >= ~ res:', res)
    return {
      success: true,
      data: res
    }
  } catch (error) {
    return { msg: (error as Error).message, success: false }
  }
}

export const onEmptySnippet: AddParametersBefore<
  EmptySnippet,
  [e: Electron.IpcMainInvokeEvent]
> = async () => {
  try {
    const res = await emptySnippet()
    return {
      success: true,
      data: res
    }
  } catch (error) {
    return { msg: (error as Error).message, success: false }
  }
}
