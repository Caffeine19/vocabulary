<script setup lang="ts">
import Tag16 from './Icon/Tag16.vue'

defineOptions({ name: 'VFolderTab' })
defineProps<{ label: string; selected: boolean }>()
</script>
<template>
  <li class="group">
    <a class="flex items-center space-x-1 w-full" href="">
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
        <Tag16 class="dark:fill-primer-dark-gray-400"></Tag16>
        <span class="dark:text-primer-dark-gray-100 text-sm font-normal">{{ label }}</span>
      </div>
    </a>
  </li>
</template>
