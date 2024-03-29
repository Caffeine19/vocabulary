import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

import type {
  SortAttr,
  SnippetDetail,
  SnippetItem,
  SnippetStatus,
  SnippetStatusCount,
  SortDirection
} from '../../shared/snippet'

import type { TagItem } from '@shared/Tag'
import type { FolderItem } from '@shared/folder'

import { useTagStore } from './tag'
import { useFolderStore } from './folder'

export const useSnippetStore = defineStore('snippet', () => {
  const tagStore = useTagStore()
  const folderStore = useFolderStore()

  const statusCount = ref<SnippetStatusCount>()
  const getStatusSnippetCount = async () => {
    try {
      const res = await window.electronAPI.getSnippetStatusCount()
      if (!res.success) throw new Error(res.msg)
      if (res.data) statusCount.value = res.data
    } catch (error) {
      console.log('🚀 ~ getStatusSnippetCount ~ error:', error)
    }
  }

  const selectedStatus = ref<SnippetStatus>('inbox')
  const selectedAttr = ref<SortAttr>('createdAt')
  const selectedDirection = ref<SortDirection>('desc')

  const snippetList = ref<SnippetItem[]>([])
  const getSnippetList = async () => {
    const { selectedTagId } = tagStore
    const { selectedFolderId } = folderStore
    try {
      const res = await window.electronAPI.getSnippetList({
        tagId: selectedTagId,
        folderId: selectedFolderId,
        status: selectedStatus.value,
        sortAttr: selectedAttr.value,
        sortDirection: selectedDirection.value
      })
      if (!res.success) throw new Error(res.msg)
      if (res.data) snippetList.value = res.data
    } catch (error) {
      console.log('🚀 ~ getSnippetList ~ error:', error)
    }
  }
  watch(
    () => [
      tagStore.selectedTagId,
      folderStore.selectedFolderId,
      selectedStatus.value,
      selectedAttr.value,
      selectedDirection.value
    ],
    () => getSnippetList()
  )

  const snippetDetail = ref<SnippetDetail | undefined>(undefined)

  const getSnippetDetail = async (id: SnippetItem['id']) => {
    console.log('🚀 ~ getSnippetDetail ~ id:', id)
    try {
      const res = await window.electronAPI.getSnippetDetail(id)
      const { msg, success, data } = res
      if (!success) throw new Error(msg)
      if (data) snippetDetail.value = data
    } catch (error) {
      console.log('🚀 ~ getSnippetDetail ~ error:', error)
    }
  }

  const updateSnippetContent = async (
    id: SnippetDetail['id'],
    content: SnippetDetail['content']
  ) => {
    try {
      const res = await window.electronAPI.updateSnippetContent(id, content)
      console.log('🚀 ~ useSnippetStore ~ res:', res)
      const { msg, success } = res
      if (!success) throw new Error(msg)
    } catch (error) {
      console.log('🚀 ~ updateSnippetContent ~ error:', error)
    }
  }

  const updateSnippetName = async (id: SnippetDetail['id'], name: SnippetDetail['name']) => {
    try {
      const res = await window.electronAPI.updateSnippetName(id, name)
      console.log('🚀 ~ updateSnippetName ~ res:', res)
      const { msg, success } = res
      if (!success) throw new Error(msg)
    } catch (error) {
      console.log('🚀 ~ updateSnippetName ~ error:', error)
    }
  }

  const updateSnippetTags = async (
    id: SnippetDetail['id'],
    tagIdList: {
      connect: TagItem['id'][]
      disconnect: TagItem['id'][]
    }
  ) => {
    try {
      const res = await window.electronAPI.updateSnippetTags(id, tagIdList)
      console.log('🚀 ~ connectSnippetWithTag ~ res:', res)
    } catch (error) {
      console.log('🚀 ~ connectSnippetWithTag ~ error:', error)
    }
  }

  const createBlankSnippet = async () => {
    try {
      const res = await window.electronAPI.createSnippet({
        name: '',
        content: '',
        excerpt: '',
        tagId: tagStore.selectedTagId
      })
      return res
    } catch (error) {
      console.log('🚀 ~ createBlankSnippet ~ error:', error)
      throw error
    }
  }

  const deleteSnippet = async (id: SnippetDetail['id']) => {
    try {
      const res = await window.electronAPI.deleteSnippet(id)
      console.log('🚀 ~ deleteSnippet ~ res:', res)
    } catch (error) {
      console.log('🚀 ~ deleteSnippet ~ error:', error)
    }
  }

  const destroySnippet = async (id: SnippetDetail['id']) => {
    try {
      const res = await window.electronAPI.destroySnippet(id)
      console.log('🚀 ~ destroySnippet ~ res:', res)
    } catch (error) {
      console.log('🚀 ~ destroySnippet ~ error:', error)
    }
  }

  const updateSnippetFavorite = async (
    id: SnippetDetail['id'],
    favorite: SnippetDetail['favorite']
  ) => {
    try {
      const res = await window.electronAPI.updateSnippetFavorite(id, favorite)
      console.log('🚀 ~ useSnippetStore ~ res:', res)
    } catch (error) {
      console.log('🚀 ~ updateSnippetFavorite ~ error:', error)
    }
  }
  const moveSnippetIntoFolder = async (id: SnippetDetail['id'], folderId: FolderItem['id']) => {
    try {
      const res = await window.electronAPI.moveSnippetIntoFolder(id, folderId)
      console.log('🚀 ~ moveSnippetIntoFolder ~ res:', res)
    } catch (error) {
      console.log('🚀 ~ moveSnippetIntoFolder ~ error:', error)
    }
  }

  const moveSnippetIntoInbox = async (id: SnippetDetail['id']) => {
    try {
      const res = await window.electronAPI.moveSnippetIntoInbox(id)
      console.log('🚀 ~ moveSnippetIntoInbox ~ res:', res)
    } catch (error) {
      console.log('🚀 ~ moveSnippetIntoInbox ~ error:', error)
    }
  }

  const restoreSnippet = async (id: SnippetDetail['id']) => {
    try {
      const res = await window.electronAPI.restoreSnippet(id)
      console.log('🚀 ~ restoreSnippet ~ res:', res)
      const { msg, success } = res
      if (!success) throw new Error(msg)
    } catch (error) {
      console.log('🚀 ~ restoreSnippet ~ error:', error)
    }
  }

  const formatSnippetContent = async (id: SnippetDetail['id']) => {
    try {
      const res = await window.electronAPI.formatSnippetContent(id)
      console.log('🚀 ~ formatSnippetContent ~ res:', res)
    } catch (error) {
      console.log('🚀 ~ formatSnippetContent ~ error:', error)
    }
  }

  const emptySnippet = async () => {
    try {
      const res = await window.electronAPI.emptySnippet()
      console.log('🚀 ~ emptySnippet ~ res:', res)
    } catch (error) {
      console.log('🚀 ~ emptySnippet ~ error:', error)
    }
  }

  return {
    snippetList,
    getSnippetList,
    statusCount,
    selectedStatus,
    getStatusSnippetCount,
    snippetDetail,
    getSnippetDetail,
    updateSnippetContent,
    updateSnippetName,
    updateSnippetTags,
    createBlankSnippet,
    deleteSnippet,
    destroySnippet,
    updateSnippetFavorite,
    moveSnippetIntoFolder,
    moveSnippetIntoInbox,
    restoreSnippet,
    selectedAttr,
    selectedDirection,
    formatSnippetContent,
    emptySnippet
  }
})
