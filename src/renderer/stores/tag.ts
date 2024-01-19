import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import { TagItem } from '@shared/Tag'

export const useTagStore = defineStore('tag', () => {
  const tagList = ref<TagItem[]>([])
  const getTagList = async () => {
    try {
      const res = await window.electronAPI.getTagList()
      if (res) tagList.value = res
    } catch (error) {
      console.log('🚀 ~ getTagList ~ error:', error)
    }
  }

  const selectedTag = ref<TagItem | undefined>(undefined)
  const selectedTagId = computed(() => selectedTag.value?.id)
  const setSelectedTag = (tag: TagItem) => {
    selectedTag.value = tag
  }
  const unsetSelectedTag = () => {
    selectedTag.value = undefined
  }

  return {
    tagList,
    getTagList,
    selectedTag,
    selectedTagId,
    setSelectedTag,
    unsetSelectedTag
  }
})
