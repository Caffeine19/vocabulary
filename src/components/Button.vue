<script setup lang="ts">
import { computed } from 'vue'
defineOptions({ name: 'VButton' })
const props = withDefaults(
  defineProps<{ type?: 'primary' | 'danger'; label: string; iconPosition?: 'left' | 'right' }>(),
  { type: 'primary', iconPosition: 'left' }
)

const primaryStyle = {
  button: 'dark:bg-primer-dark-green-500 dark:hover:bg-primer-dark-green-400',
  label: 'dark:text-primer-dark-white',
  icon: 'dark:fill-primer-dark-white'
}
const dangerStyle = {
  button: 'dark:bg-primer-dark-red-500 dark:hover:bg-primer-dark-red-400',
  label: 'dark:text-primer-dark-white',
  icon: 'dark:fill-primer-dark-white'
}
const style = computed(() => (props.type === 'primary' ? primaryStyle : dangerStyle))
</script>
<template>
  <button
    class="v-button flex items-center space-x-1.5 px-2.5 py-1 rounded-md 0 transition-colors"
    :class="style.button"
  >
    <span class="v-button-label text-base font-normal fira-code" :class="style.label">{{
      label
    }}</span>
    <slot name="icon" :class="style.icon"></slot>
  </button>
</template>
