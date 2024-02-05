<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

import { useAutoAnimate } from '@formkit/auto-animate/vue'

import TagTab from './TagTab.vue'
import Plus16 from './Icon/Plus16.vue'
import IconButton from './IconButton.vue'

import { useTagStore } from '@renderer/stores/tag'
import { useSnippetStore } from '@renderer/stores/snippet'
import { useFolderStore } from '@renderer/stores/folder'

import { TagItem } from '@shared/Tag'
defineOptions({ name: 'VTagTabGroup' })

const [parent] = useAutoAnimate({})

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
  <div class="space-y-2.5">
    <div class="flex items-center justify-between">
      <span class="dark:text-primer-dark-gray-0 fira-code text-sm font-normal">Tags</span>
      <IconButton type="invisible">
        <template #icon="{ iconStyle }">
          <Plus16 :class="iconStyle"></Plus16>
        </template>
      </IconButton>
    </div>
    <ul class="flex flex-col items-stretch space-y-1" ref="parent">
      <TagTab
        v-for="tag in tagList"
        :key="tag.id"
        :tag="tag"
        :selected="tag.id === selectedTagId"
        @click="onTagClick(tag)"
      ></TagTab>
    </ul>
  </div>
</template>
