<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

import TagTab from './TagTab.vue'

import { useTagStore } from '@renderer/stores/tag'
import { useSnippetStore } from '@renderer/stores/snippet'
import { useFolderStore } from '@renderer/stores/folder'

import { TagItem } from '@shared/Tag'
defineOptions({ name: 'VTagTabGroup' })

const tagStore = useTagStore()
const { tagList, selectedTagId } = storeToRefs(tagStore)
onMounted(() => tagStore.getTagList())

const snippetStore = useSnippetStore()
const { selectedStatus } = storeToRefs(snippetStore)

const folderStore = useFolderStore()

const onTagClick = (tag: TagItem) => {
  tagStore.setSelectedTag(tag)
  selectedStatus.value = 'all'
  folderStore.unsetSelectedFolder()
}
</script>
<template>
  <ul class="flex flex-col items-stretch space-y-1">
    <TagTab
      v-for="tag in tagList"
      :key="tag.id"
      :tag="tag"
      :selected="tag.id === selectedTagId"
      @click="onTagClick(tag)"
    ></TagTab>
  </ul>
</template>
