<script setup lang="ts">
defineOptions({ name: 'VBox' })
</script>
<template>
  <div class="rounded-md border dark:border-primer-dark-gray-600 overflow-clip flex flex-col">
    <div
      class="dark:bg-primer-dark-gray-800 flex justify-between px-3 py-1.5 border-b dark:border-primer-dark-gray-600"
    >
      <slot name="header"></slot>
    </div>
    <div class="overflow-y-auto">
      <slot name="main"></slot>
    </div>
  </div>
</template>
