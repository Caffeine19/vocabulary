import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

import type {
  SnippetDetail,
  SnippetItem,
  SnippetStatus,
  SnippetStatusCount
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
      if (res) statusCount.value = res
    } catch (error) {
      console.log('🚀 ~ getStatusSnippetCount ~ error:', error)
    }
  }

  const selectedStatus = ref<SnippetStatus>('inbox')

  const snippetList = ref<SnippetItem[]>([])
  const getSnippetList = async () => {
    const { selectedTagId } = tagStore
    const { selectedFolderId } = folderStore
    try {
      const res = await window.electronAPI.getSnippetList({
        tagId: selectedTagId,
        folderId: selectedFolderId,
        status: selectedStatus.value
      })
      if (res) snippetList.value = res
    } catch (error) {
      console.log('🚀 ~ getSnippetList ~ error:', error)
    }
  }
  watch(
    () => [tagStore.selectedTagId, folderStore.selectedFolderId, selectedStatus.value],
    () => getSnippetList()
  )

  const snippetDetail = ref<SnippetDetail | undefined>(undefined)
  const getSnippetDetail = async (id: SnippetItem['id']) => {
    console.log('🚀 ~ getSnippetDetail ~ id:', id)
    try {
      const res = await window.electronAPI.getSnippetDetail(id)
      if (res) snippetDetail.value = res
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
    } catch (error) {
      console.log('🚀 ~ updateSnippetContent ~ error:', error)
    }
  }

  const connectSnippetWithTag = async (id: SnippetDetail['id'], tagId: TagItem['id']) => {
    try {
      const res = await window.electronAPI.connectSnippetWithTag(id, tagId)
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

  return {
    snippetList,
    getSnippetList,
    statusCount,
    selectedStatus,
    getStatusSnippetCount,
    snippetDetail,
    getSnippetDetail,
    updateSnippetContent,
    connectSnippetWithTag,
    createBlankSnippet,
    deleteSnippet,
    destroySnippet,
    moveSnippetIntoFolder,
    moveSnippetIntoInbox
  }
})
