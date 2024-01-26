<script setup lang="ts">
import FileDirectoryFill16 from './Icon/FileDirectoryFill16.vue'
import TriangleDown16 from './Icon/TriangleDown16.vue'
import FileDirectory16 from './Icon/FileDirectory16.vue'

import { FolderItem } from '@shared/folder'
import { PropType } from 'vue'

defineOptions({ name: 'VFolderTab' })
defineProps({
  selected: Boolean,
  indent: Number,
  isOpen: Boolean,
  folder: Object as PropType<FolderItem>
})
defineEmits<{ click: [e: MouseEvent] }>()
</script>
<template>
  <li class="">
    <div class="group flex items-center space-x-1 w-full" @click="(e) => $emit('click', e)">
      <div
        class="w-1 h-6 rounded-md dark:bg-primer-dark-blue-500"
        :class="selected ? 'opacity-100' : 'opacity-0'"
      ></div>
      <div
        class="flex items-center space-x-2 px-2 py-1.5 rounded-md grow transition-colors"
        :class="
          selected
            ? ' dark:bg-primer-dark-gray-200/[0.08] dark:group-hover:bg-primer-dark-gray-200/[0.12] '
            : ' dark:group-hover:bg-primer-dark-gray-200/[0.12] '
        "
        :style="{ paddingLeft: indent + 'px' }"
      >
        <TriangleDown16
          class="dark:fill-primer-dark-gray-400"
          :class="isOpen ? '' : '-rotate-90'"
        ></TriangleDown16>

        <component
          :is="
            folder?.snippetCount || folder?.childrenCount ? FileDirectoryFill16 : FileDirectory16
          "
          class="dark:fill-primer-dark-gray-400 w-4 h-4"
        ></component>

        <span class="dark:text-primer-dark-gray-100 text-sm font-normal fira-code">{{
          folder?.name
        }}</span>
      </div>
    </div>

    <slot></slot>
  </li>
</template>
