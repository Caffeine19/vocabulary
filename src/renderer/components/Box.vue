<script setup lang="ts">
defineOptions({ name: 'VBox' })
</script>
<template>
  <div class="rounded-md flex flex-col">
    <div
      class="dark:bg-primer-dark-gray-800 flex justify-between px-3 py-1.5 border-b border dark:border-primer-dark-gray-600 rounded-t-md"
    >
      <slot name="header"></slot>
    </div>
    <div class="overflow-y-auto border border-t-0 dark:border-primer-dark-gray-600 rounded-b-md">
      <slot name="main"></slot>
    </div>
  </div>
</template>
