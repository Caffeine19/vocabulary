<script setup lang="ts">
import type { PropType } from 'vue'

import type { SnippetItem } from 'src/shared/snippet'
import Tag from './Tag.vue'

defineOptions({ name: 'VSnippetItem' })
defineProps({
  snippetItem: { type: Object as PropType<SnippetItem>, required: true },
  selected: { type: Boolean }
})
</script>
<template>
  <li
    class="px-3 py-1.5 transition-colors cursor-pointer"
    :class="selected ? 'dark:bg-primer-dark-gray-800' : 'dark:hover:bg-primer-dark-gray-800'"
  >
    <div class="flex items-center justify-between">
      <span class="fira-code dark:text-primer-dark-gray-0 text-base font-normal">
        {{ snippetItem.name || 'Untitled' }}
      </span>
      <div class="flex items-center space-x-1.5" v-if="snippetItem.tags.length > 0">
        <Tag v-for="(tag, index) in snippetItem.tags" :key="index" :tag="tag"></Tag>
      </div>
    </div>
    <div>
      <span class="fira-code dark:text-primer-dark-gray-400 text-xs font-normal">
        {{ snippetItem.excerpt || 'No content yet' }}
      </span>
    </div>
  </li>
</template>
