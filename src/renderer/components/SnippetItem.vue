<script setup lang="ts">
import Tag, { type TagOption } from './Tag.vue'

defineOptions({ name: 'VSnippetItem' })
defineProps<{ name: string; tags: TagOption[]; preview: string }>()
</script>
<template>
  <li class="px-3 py-1.5 dark:hover:bg-primer-dark-gray-800 transition-colors">
    <div class="flex items-center justify-between">
      <span class="fira-code dark:text-primer-dark-gray-0 text-base font-normal">
        vue ts init
      </span>
      <div class="flex items-center space-x-1.5">
        <Tag v-for="(tag, index) in tags" :key="index" v-bind="tag"></Tag>
      </div>
    </div>
    <div>
      <span class="text-xs font-normal fira-code dark:text-primer-dark-gray-400">
        {{ preview }}
      </span>
    </div>
  </li>
</template>
