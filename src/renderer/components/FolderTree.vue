<script setup lang="ts">
import { PropType } from 'vue'
import type { FolderNode } from './FolderTabGroup.vue'
import FolderTab from './FolderTab.vue'
import { FolderItem } from '@shared/folder'

defineOptions({ name: 'VFolderTree' })
defineProps({
  folderNode: { type: Object as PropType<FolderNode>, required: true },
  selectedFolderId: { type: Number as PropType<FolderItem['id']> }
})
defineEmits<{ clickFolderNode: [e: FolderNode] }>()
</script>
<template>
  <FolderTab
    :label="folderNode.name"
    :selected="selectedFolderId === folderNode.id"
    @click="$emit('clickFolderNode', folderNode)"
  >
    <ul v-if="folderNode.children" class="pl-4 mt-1">
      <FolderTree
        v-for="childFolder in folderNode.children"
        :key="childFolder.id"
        :folderNode="childFolder"
        @clickFolderNode="(folderNode) => $emit('clickFolderNode', folderNode)"
        :selectedFolderId="selectedFolderId"
      />
    </ul>
  </FolderTab>
</template>
