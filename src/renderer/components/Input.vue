<script setup lang="ts">
import { ref, watchEffect } from 'vue'

defineOptions({ name: 'VInput' })
const props = withDefaults(
  defineProps<{ placeholder?: string; value: string; focused?: boolean }>(),
  {
    focused: false
  }
)
defineEmits<{ 'update:value': [e: string] }>()

const inputRef = ref<HTMLElement | null>(null)

watchEffect(() => {
  if (props.focused && inputRef.value) {
    inputRef.value.focus()
  }
})
</script>
<template>
  <div class="relative">
    <slot name="icon"></slot>
    <input
      ref="inputRef"
      @input="$emit('update:value', ($event.target as HTMLInputElement).value)"
      :placeholder="placeholder"
      :value="value"
      class="pr-2.5 py-1.5 bg-transparent dark:placeholder-primer-dark-gray-400 border outline-none dark:border-primer-dark-gray-600 rounded-md text-sm font-normal dark:text-primer-dark-gray-100 w-full fira-code dark:bg-primer-dark-gray-900 dark:focus:border-primer-dark-blue-400 transition-colors"
      :class="$slots.icon ? 'pl-10' : 'pl-2.5'"
    />
  </div>
</template>
