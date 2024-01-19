import { Tag } from '@shared/Tag'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTagStore = defineStore('tag', () => {
  const tagList = ref<Tag[]>([])
  const getTagList = async () => {
    try {
      const res = await window.electronAPI.getTagList()
      if (res) tagList.value = res
    } catch (error) {
      console.log('🚀 ~ getTagList ~ error:', error)
    }
  }

  return {
    tagList,
    getTagList
  }
})
