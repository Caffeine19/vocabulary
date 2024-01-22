<script setup lang="ts">
defineOptions({ name: 'VIconButton' })
defineEmits<{ click: [e: MouseEvent] }>()
</script>
<template>
  <button
    @click="(e) => $emit('click', e)"
    class="rounded-md p-2 border dark:border-primer-dark-gray-600 dark:hover:border-primer-dark-gray-300 transition-colors"
  >
    <slot name="icon" iconStyle="dark:fill-primer-dark-gray-400"></slot>
  </button>
</template>
