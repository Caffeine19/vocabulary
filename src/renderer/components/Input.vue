<script setup lang="ts">
defineOptions({ name: 'VInput' })
defineProps<{ placeholder?: string; value: string }>()
defineEmits<{ 'update:value': [e: string] }>()
</script>
<template>
  <div class="relative">
    <slot name="icon"></slot>
    <input
      @input="$emit('update:value', ($event.target as HTMLInputElement).value)"
      :placeholder="placeholder"
      class="pl-10 pr-2.5 py-1.5 bg-transparent dark:placeholder-primer-dark-gray-400 border outline-none dark:border-primer-dark-gray-600 rounded-md text-sm font-normal dark:text-primer-dark-gray-100 w-full fira-code dark:bg-primer-dark-gray-900 dark:focus:border-primer-dark-blue-400 transition-colors"
    />
  </div>
</template>
