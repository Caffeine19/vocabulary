<script setup lang="ts">
import { PropType } from 'vue'
import type { FolderNode } from './FolderTabGroup.vue'
import FolderTab from './FolderTab.vue'
import { FolderItem } from '@shared/folder'

defineOptions({ name: 'VFolderTree' })
defineProps({
  folderNode: { type: Object as PropType<FolderNode>, required: true },
  selectedFolderId: { type: Number as PropType<FolderItem['id']> },
  accIndent: { type: Number, default: 8 },
  openedFolderList: { type: Array as PropType<FolderItem['id'][]>, required: true }
})
defineEmits<{ clickFolderNode: [e: FolderNode] }>()

const indent = 24
</script>
<template>
  <FolderTab
    :label="folderNode.name"
    :selected="selectedFolderId === folderNode.id"
    @click="$emit('clickFolderNode', folderNode)"
    :indent="accIndent"
    :isOpen="openedFolderList.includes(folderNode.id)"
  >
    <ul v-if="folderNode.children" class="mt-1">
      <FolderTree
        v-for="childFolder in folderNode.children"
        :key="childFolder.id"
        :folderNode="childFolder"
        @clickFolderNode="(folderNode) => $emit('clickFolderNode', folderNode)"
        :selectedFolderId="selectedFolderId"
        :accIndent="accIndent + indent"
        :openedFolderList="openedFolderList"
      />
    </ul>
  </FolderTab>
</template>
