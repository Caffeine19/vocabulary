<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import FolderTab from './FolderTab.vue'

import { useFolderStore } from '@renderer/stores/folder'

import { FolderItem } from '@shared/folder'

import { useSnippetStore } from '@renderer/stores/snippet'
import { useTagStore } from '@renderer/stores/tag'

defineOptions({ name: 'VFolderTabGroup' })

const folderStore = useFolderStore()
const { folderList, selectedFolderId } = storeToRefs(folderStore)
onMounted(() => {
  folderStore.getFolderList()
})

const snippetStore = useSnippetStore()
const { selectedStatus } = storeToRefs(snippetStore)

const tagStore = useTagStore()

const onFolderClick = (folder: FolderItem) => {
  folderStore.setSelectedFolder(folder)
  selectedStatus.value = 'all'
  tagStore.unsetSelectedTag()
}
</script>
<template>
  <ul class="flex flex-col space-y-1 items-stretch">
    <FolderTab
      v-for="folder in folderList"
      :key="folder.id"
      :label="folder.name"
      :selected="folder.id === selectedFolderId"
      @click="onFolderClick(folder)"
    ></FolderTab>
  </ul>
</template>
