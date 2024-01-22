<script setup lang="ts">
import { PropType } from 'vue'

import Tag16 from './Icon/Tag16.vue'
import Badge from './Badge.vue'

import type { TagItem } from '@shared/Tag'

defineOptions({ name: 'VFolderTab' })
defineProps({
  tag: { type: Object as PropType<TagItem>, required: true },
  selected: Boolean
})
</script>
<template>
  <li
    class="group flex items-center space-x-1 w-full"
    :class="selected ? 'cursor-default' : 'cursor-pointer'"
  >
    <div
      class="w-1 h-6 rounded-md dark:bg-primer-dark-blue-500"
      :class="selected ? 'opacity-100' : 'opacity-0'"
    ></div>
    <div
      class="flex items-center justify-between px-2 py-1.5 rounded-md grow transition-colors space-x-4"
      :class="
        selected
          ? ' dark:bg-primer-dark-gray-200/[0.08] dark:group-hover:bg-primer-dark-gray-200/[0.12] '
          : ' dark:group-hover:bg-primer-dark-gray-200/[0.12] '
      "
    >
      <div class="flex items-center space-x-2">
        <Tag16 class="dark:fill-primer-dark-gray-400"></Tag16>
        <span class="dark:text-primer-dark-gray-100 text-sm font-normal fira-code">{{
          tag.name
        }}</span>
      </div>

      <Badge :num="tag.snippetCount"></Badge>
    </div>
  </li>
</template>
