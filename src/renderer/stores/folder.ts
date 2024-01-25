import { FolderItem } from '@shared/folder'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useFolderStore = defineStore('folder', () => {
  const folderList = ref<FolderItem[]>([])
  const getFolderList = async () => {
    try {
      const res = await window.electronAPI.getFolderList()
      if (res) folderList.value = res
    } catch (error) {
      console.log('🚀 ~ getFolderList ~ error:', error)
    }
  }

  const selectedFolder = ref<FolderItem | undefined>(undefined)
  const selectedFolderId = computed(() => selectedFolder.value?.id)
  const setSelectedFolder = (folder: FolderItem) => {
    selectedFolder.value = folder
  }
  const unsetSelectedFolder = () => {
    selectedFolder.value = undefined
  }

  return {
    folderList,
    getFolderList,
    selectedFolder,
    selectedFolderId,
    setSelectedFolder,
    unsetSelectedFolder
  }
})
