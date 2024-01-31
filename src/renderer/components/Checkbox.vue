<script setup lang="ts">
import Check16 from './Icon/Check16.vue'

defineOptions({ name: 'VCheckbox' })
withDefaults(defineProps<{ checked?: boolean }>(), {
  checked: false
})
defineEmits<{ check: []; uncheck: [] }>()
</script>
<template>
  <button
    @click="checked ? $emit('uncheck') : $emit('check')"
    class="outline-transparent relative w-4 h-4 transition-colors border rounded"
    :class="
      checked
        ? 'dark:border-primer-dark-blue-500 dark:bg-primer-dark-blue-500'
        : 'dark:border-primer-dark-gray-400 bg-transparent'
    "
  >
    <Check16
      class="dark:fill-primer-dark-gray-0 top-1/2 left-1/2 absolute transition-opacity -translate-x-1/2 -translate-y-1/2"
      :class="checked ? 'opacity-100' : 'opacity-0'"
    ></Check16>
  </button>
</template>
