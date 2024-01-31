<script setup lang="ts">
defineOptions({ name: 'VBox' })
</script>
<template>
  <div class="flex flex-col rounded-md">
    <div
      class="dark:bg-primer-dark-gray-800 flex justify-between items-center px-3 py-1.5 border-b border dark:border-primer-dark-gray-600 rounded-t-md"
    >
      <slot name="header"></slot>
    </div>
    <div class="dark:border-primer-dark-gray-600 rounded-b-md overflow-y-auto border border-t-0">
      <slot name="main"></slot>
    </div>
  </div>
</template>
