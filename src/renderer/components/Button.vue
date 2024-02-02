<script setup lang="ts">
import { computed } from 'vue'
defineOptions({ name: 'VButton' })
const props = withDefaults(
  defineProps<{
    type?: 'primary' | 'danger' | 'secondary' | 'invisible'
    label: string
    plain?: boolean
    size?: 'md' | 'sm'
  }>(),
  {
    type: 'primary',
    plain: false,
    size: 'md'
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

const invisibleStyle = {
  button: 'bg-transparent border-transparent dark:hover:bg-primer-dark-gray-200/[0.12]',
  label: 'dark:fill-primer-dark-gray-400',
  icon: 'dark:fill-primer-dark-gray-400'
}

const typeStyleConfig = {
  primary: primaryStyle,
  danger: dangerStyle,
  secondary: secondaryStyle,
  invisible: invisibleStyle
}
const typeStyle = computed(() => typeStyleConfig[props.type])

const smStyle = {
  button: 'space-x-1 px-2 py-1',
  label: 'text-xs'
}
const mdStyle = {
  button: 'space-x-2 px-3 py-1.5',
  label: 'text-sm'
}

const sizeStyleConfig = {
  sm: smStyle,
  md: mdStyle
}

const sizeStyle = computed(() => sizeStyleConfig[props.size])
</script>
<template>
  <button
    @click="(e) => $emit('click', e)"
    class="v-button 0 group flex items-center transition-colors border rounded-md"
    :class="typeStyle.button + ' ' + sizeStyle.button"
  >
    <slot name="leftIcon" :iconStyle="typeStyle.icon + ' ' + 'transition-colors'"></slot>
    <span
      class="v-button-label fira-code font-semibold transition-colors"
      :class="typeStyle.label + ' ' + sizeStyle.label"
      >{{ label }}</span
    >
    <slot name="rightIcon" :iconStyle="typeStyle.icon + ' ' + 'transition-colors'"></slot>
  </button>
</template>
