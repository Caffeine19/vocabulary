<script setup lang="ts">
import { computed } from 'vue'
defineOptions({ name: 'VButton' })
const props = withDefaults(
  defineProps<{ type?: 'primary' | 'danger' | 'secondary'; label: string; plain?: boolean }>(),
  {
    type: 'primary',
    plain: false
  }
)
defineEmits<{ click: [e: MouseEvent] }>()

const primaryStyle = {
  button: 'dark:bg-primer-dark-green-500 dark:hover:bg-primer-dark-green-400 border-transparent',
  label: 'dark:text-primer-dark-white',
  icon: 'dark:fill-primer-dark-white'
}
const dangerStyle = {
  button:
    'dark:bg-primer-dark-gray-700 dark:hover:bg-primer-dark-red-400 dark:border-primer-dark-gray-0/10',
  label: 'dark:text-primer-dark-red-400 dark:group-hover:text-primer-dark-white',
  icon: 'dark:fill-primer-dark-red-400 dark:group-hover:fill-primer-dark-white'
}
const secondaryStyle = {
  button: props.plain
    ? 'dark:bg-transparent dark:hover:bg-primer-dark-gray-700 dark:border-primer-dark-gray-600 dark:hover:border-primer-dark-gray-300'
    : 'dark:bg-primer-dark-gray-700 dark:hover:bg-primer-dark-gray-600 dark:border-primer-dark-gray-0/10 dark:hover:border-primer-dark-gray-300',
  label: 'dark:text-primer-dark-gray-100',
  icon: 'dark:fill-primer-dark-gray-400'
}

const styleConfig = {
  primary: primaryStyle,
  danger: dangerStyle,
  secondary: secondaryStyle
}

const style = computed(() => styleConfig[props.type])
</script>
<template>
  <button
    @click="(e) => $emit('click', e)"
    class="v-button flex items-center space-x-2 px-2.5 py-1 rounded-md 0 transition-colors group border"
    :class="style.button"
  >
    <slot name="leftIcon" :iconStyle="style.icon + ' ' + 'transition-colors'"></slot>
    <span
      class="v-button-label text-base font-normal fira-code transition-colors"
      :class="style.label"
      >{{ label }}</span
    >
    <slot name="rightIcon" :iconStyle="style.icon + ' ' + 'transition-colors'"></slot>
  </button>
</template>
