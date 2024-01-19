<script setup lang="ts">
defineOptions({ name: 'VBadge' })
defineProps<{ num: number }>()
</script>
<template>
  <div
    class="dark:bg-primer-dark-gray-400/40 rounded-full flex items-center justify-center px-2 py-0.5"
  >
    <span class="text-sm dark:text-primer-dark-white fira-code">{{ num }}</span>
  </div>
  <div></div>
</template>
