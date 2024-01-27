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
    class="group flex items-center w-full justify-between px-2 py-1.5 rounded-md grow transition-colors space-x-4 after:w-1 after:h-6 after:rounded-md after:dark:dark:bg-primer-dark-blue-500 after:-left-2 after:absolute after:transition-opacity relative"
    :class="
      selected
        ? 'cursor-default dark:bg-primer-dark-gray-200/[0.08] dark:hover:bg-primer-dark-gray-200/[0.12] after:opacity-100'
        : 'cursor-pointer dark:hover:bg-primer-dark-gray-200/[0.12] after:opacity-0'
    "
  >
    <div class="flex items-center space-x-2">
      <Tag16 class="dark:fill-primer-dark-gray-400"></Tag16>
      <span class="dark:text-primer-dark-gray-100 text-sm font-normal fira-code">{{
        tag.name
      }}</span>
    </div>

    <Badge :num="tag.snippetCount"></Badge>
  </li>
</template>
