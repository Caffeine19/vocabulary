<script setup lang="ts">
defineOptions({ name: 'VBlank' })

defineProps<{ title?: string; subtitle?: string }>()
</script>
<template>
  <div class="flex flex-col items-center p-12">
    <slot name="icon" iconStyle="w-6 h-6 dark:fill-primer-dark-gray-400 mb-2"></slot>
    <span v-if="title" class="fira-code dark:text-primer-dark-gray-0 text-xl font-medium">{{
      title
    }}</span>
    <span v-if="subtitle" class="dark:text-primer-dark-gray-300 text-base font-normal">
      {{ subtitle }}</span
    >
  </div>
</template>
