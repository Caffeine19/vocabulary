<script setup lang="ts">
import FileDirectoryFill16 from './Icon/FileDirectoryFill16.vue'

defineOptions({ name: 'VFolderTab' })
defineProps<{ label: string; selected: boolean }>()
defineEmits<{ click: [e: MouseEvent] }>()
</script>
<template>
  <li class="group flex items-center space-x-1 w-full" @click="(e) => $emit('click', e)">
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
    >
      <FileDirectoryFill16 class="dark:fill-primer-dark-gray-400"></FileDirectoryFill16>
      <span class="dark:text-primer-dark-gray-100 text-sm font-normal fira-code">{{ label }}</span>
    </div>
  </li>
</template>
