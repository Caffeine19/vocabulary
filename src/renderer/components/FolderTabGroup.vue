<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { useStorage } from '@vueuse/core'
// import FolderTab from './FolderTab.vue'
import FolderTree from './FolderTree.vue'

import { useFolderStore } from '@renderer/stores/folder'

import { FolderItem } from '@shared/folder'

import { useSnippetStore } from '@renderer/stores/snippet'
import { useTagStore } from '@renderer/stores/tag'
import { Folder } from '@prisma/client'

defineOptions({ name: 'VFolderTabGroup' })

const folderStore = useFolderStore()
const { folderList, selectedFolderId } = storeToRefs(folderStore)
onMounted(() => {
  folderStore.getFolderList()
})

const snippetStore = useSnippetStore()
const { selectedStatus } = storeToRefs(snippetStore)

const tagStore = useTagStore()

const onFolderClick = (folder: FolderNode) => {
  folderStore.setSelectedFolder(folder)
  selectedStatus.value = 'all'
  tagStore.unsetSelectedTag()
}

export type FolderNode = FolderItem & { children: FolderNode[] | null }

// 递归转换为树形结构
function buildFolderTree(
  folders: FolderItem[],
  parentId: FolderItem['parentId'] = null
): FolderNode[] | null {
  const children: FolderNode[] = folders
    .filter((folder) => folder.parentId === parentId)
    .map((folder) => ({
      ...folder,
      children: buildFolderTree(folders, folder.id)
    }))

  return children.length > 0 ? children : null
}

// 构建树形结构
const folderTree = computed(() => buildFolderTree(folderList.value))
console.log('🚀 ~ folderTree:', folderTree)

const openedFolderList = useStorage<Folder['id'][]>('openedFolderList', [])
const openFolder = (id: Folder['id']) => {
  openedFolderList.value.push(id)
}
const closeFolder = (id: Folder['id']) => {
  openedFolderList.value = openedFolderList.value.filter((f) => f !== id)
}
</script>
<template>
  <ul class="flex flex-col space-y-1 items-stretch">
    <FolderTree
      v-for="folder in folderTree"
      :folder-node="folder"
      :key="folder.id"
      @click-folder-node="(folderNode) => onFolderClick(folderNode)"
      :selected-folder-id="selectedFolderId"
      :opened-folder-list="openedFolderList"
    ></FolderTree>
    <!-- <FolderTab
      v-for="folder in folderTree"
      :key="folder.id"
      :label="folder.name"
      :selected="folder.id === selectedFolderId"
      @click="onFolderClick(folder)"
    >
      <ul v-if="folder.children" class="pl-4">
        <FolderTab
          v-for="childFolder in folder.children"
          :key="childFolder.id"
          :label="childFolder.name"
          :selected="childFolder.id === selectedFolderId"
          @click="onFolderClick(childFolder)"
        ></FolderTab>
      </ul>
    </FolderTab> -->
  </ul>
</template>
