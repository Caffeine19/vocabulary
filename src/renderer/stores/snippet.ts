import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

import type { SnippetDetail, SnippetItem } from '../../shared/snippet'

import { useTagStore } from './tag'

export const useSnippetStore = defineStore('snippet', () => {
  const tagStore = useTagStore()

  const snippetList = ref<SnippetItem[]>([])
  const getSnippetList = async () => {
    const { selectedTagId } = tagStore
    try {
      const res = await window.electronAPI.getSnippetList({
        tagId: selectedTagId
      })
      if (res) snippetList.value = res
    } catch (error) {
      console.log('🚀 ~ getSnippetList ~ error:', error)
    }
  }
  watch(
    () => tagStore.selectedTagId,
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
  return {
    snippetList,
    getSnippetList,
    snippetDetail,
    getSnippetDetail,
    updateSnippetContent
  }
})
