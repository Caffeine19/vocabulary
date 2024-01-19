<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

import TagTab from './TagTab.vue'

import { useTagStore } from '@renderer/stores/tag'

defineOptions({ name: 'VTagTabGroup' })

const tagStore = useTagStore()
const { tagList } = storeToRefs(tagStore)
onMounted(() => tagStore.getTagList())

const selectedId = ref()
</script>
<template>
  <ul class="flex flex-col space-y-1 items-stretch">
    <TagTab
      v-for="tag in tagList"
      :key="tag.id"
      :tag="tag"
      :selected="tag.id === selectedId"
      @click="selectedId = tag.id"
    ></TagTab>
  </ul>
</template>
