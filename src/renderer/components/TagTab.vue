<script setup lang="ts">
import { PropType } from 'vue'

import Tag16 from './Icon/Tag16.vue'
import type { Tag } from '@shared/Tag'

defineOptions({ name: 'VFolderTab' })
defineProps({
  tag: { type: Object as PropType<Tag>, required: true },
  selected: Boolean
})
</script>
<template>
  <li class="group">
    <a class="flex items-center space-x-1 w-full" href="">
      <div
        class="w-1 h-6 rounded-md dark:bg-primer-dark-blue-500"
        :class="selected ? 'opacity-100' : 'opacity-0'"
      ></div>
      <div
        class="flex items-center justify-between px-2 py-1.5 rounded-md grow transition-colors"
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

        <div class="rounded-full w-2.5 h-2.5" :style="{ backgroundColor: tag.color || '' }"></div>
      </div>
    </a>
  </li>
</template>
