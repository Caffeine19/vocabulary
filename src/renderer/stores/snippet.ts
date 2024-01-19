import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { SnippetDetail, SnippetItem } from '../../shared/snippet'

export const useSnippetStore = defineStore('snippet', () => {
  const snippetList = ref<SnippetItem[]>([])
  const getSnippetList = async () => {
    try {
      const res = await window.electronAPI.getSnippetList()
      if (res) snippetList.value = res
    } catch (error) {
      console.log('🚀 ~ getSnippetList ~ error:', error)
    }
  }

  const snippetDetail = ref<SnippetDetail | undefined>(undefined)
  const getSnippetDetail = async (id: number) => {
    console.log('🚀 ~ getSnippetDetail ~ id:', id)
    try {
      const res = await window.electronAPI.getSnippetDetail(id)
      if (res) snippetDetail.value = res
    } catch (error) {
      console.log('🚀 ~ getSnippetDetail ~ error:', error)
    }
  }
  return {
    snippetList,
    getSnippetList,
    snippetDetail,
    getSnippetDetail
  }
})
