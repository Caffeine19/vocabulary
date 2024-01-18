import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { SnippetItem } from '../../shared/snippet'

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
  return {
    snippetList,
    getSnippetList
  }
})
