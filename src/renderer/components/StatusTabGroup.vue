<script setup lang="ts">
import { storeToRefs } from 'pinia'

import StatusTab, { type StatusTabProps } from './StatusTab.vue'
import Inbox24 from './Icon/Inbox24.vue'
import Trash24 from './Icon/Trash24.vue'
import Archive24 from './Icon/Archive24.vue'
import Heart24 from './Icon/Heart24.vue'

import { useSnippetStore } from '@renderer/stores/snippet'
import { computed, onMounted } from 'vue'
import { SnippetStatus } from '@shared/snippet'
import { useTagStore } from '@renderer/stores/tag'
import { useFolderStore } from '@renderer/stores/folder'

const snippetStore = useSnippetStore()
const { statusCount, selectedStatus } = storeToRefs(snippetStore)

const StatusTabOptions = computed<(StatusTabProps & { label: SnippetStatus })[]>(() => [
  {
    icon: Inbox24,
    label: 'inbox',
    num: statusCount.value?.inbox || 0
  },
  {
    icon: Archive24,
    label: 'all',
    num: statusCount.value?.all || 0
  },
  {
    icon: Heart24,
    label: 'favorite',
    num: statusCount.value?.favorite || 0
  },
  {
    icon: Trash24,
    label: 'deleted',
    num: statusCount.value?.deleted || 0
  }
])
onMounted(() => {
  snippetStore.getStatusSnippetCount()
})

const tagStore = useTagStore()
const folderStore = useFolderStore()

const onStatusClick = (label: SnippetStatus) => {
  selectedStatus.value = label
  tagStore.unsetSelectedTag()
  folderStore.unsetSelectedFolder()
}
</script>
<template>
  <ul class="space-y-1.5">
    <StatusTab
      v-for="(tab, index) in StatusTabOptions"
      :key="index"
      :label="tab.label"
      :num="tab.num"
      @click="onStatusClick(tab.label)"
      :selected="selectedStatus === tab.label"
    >
      <template #icon>
        <component :is="tab.icon" class="dark:fill-primer-dark-gray-400 w-5 h-5"></component>
      </template>
    </StatusTab>
  </ul>
</template>
