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

  isOpen: {
    type: Boolean
  },
  folder: Object as PropType<FolderItem>
})
defineEmits<{ click: [e: MouseEvent]; contextmenu: [e: MouseEvent] }>()
</script>
<template>
  <li class="">
    <div
      class="group flex items-center w-full space-x-1"
      @click="(e) => $emit('click', e)"
      @contextmenu="(e) => $emit('contextmenu', e)"
    >
      <div
        class="flex items-center space-x-2 py-1.5 rounded-md grow transition-colors after:rounded-md after:dark:dark:bg-primer-dark-blue-500 after:-left-2 after:absolute after:transition-opacity relative after:w-1 after:h-6"
        :class="
          selected
            ? ' dark:bg-primer-dark-gray-200/[0.08] dark:group-hover:bg-primer-dark-gray-200/[0.12]   after:opacity-100'
            : ' dark:group-hover:bg-primer-dark-gray-200/[0.12]  after:opacity-0'
        "
        :style="{ paddingLeft: indent + 'px' }"
      >
        <TriangleDown16
          class="dark:fill-primer-dark-gray-400"
          :class="isOpen || folder?.childrenCount ? '-rotate-90' : ''"
        ></TriangleDown16>

        <component
          :is="
            folder?.snippetCount || folder?.childrenCount ? FileDirectoryFill16 : FileDirectory16
          "
          class="dark:fill-primer-dark-gray-400 w-4 h-4"
        ></component>

        <span class="dark:text-primer-dark-gray-100 fira-code text-sm font-normal">{{
          folder?.name
        }}</span>
      </div>
    </div>

    <slot></slot>
  </li>
</template>
