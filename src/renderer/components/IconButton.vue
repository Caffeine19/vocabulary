<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'VIconButton' })

export interface IconButtonOption {
  type?: 'primary' | 'danger' | 'secondary'
  size?: 'md' | 'sm' | 'lg'
  plain?: boolean
}
const props = withDefaults(defineProps<IconButtonOption>(), {
  type: 'primary',
  size: 'md',
  plain: false
})
defineEmits<{ click: [e: MouseEvent] }>()

const secondaryStyle = {
  button: props.plain
    ? 'dark:border-primer-dark-gray-600 dark:hover:border-primer-dark-gray-300 dark:hover:bg-primer-dark-gray-200/[0.12]'
    : 'dark:bg-primer-dark-gray-700 border dark:border-primer-dark-gray-0/10 dark:hover:border-primer-dark-gray-200/[0.357] dark:hover:bg-primer-dark-gray-600',
  icon: props.plain ? 'dark:fill-primer-dark-gray-400' : 'dark:fill-primer-dark-gray-100'
}

const primaryStyle = {
  button: '',
  icon: ''
}

const dangerStyle = {
  button: '',
  icon: ''
}

const typeStyleConfig = {
  primary: primaryStyle,
  secondary: secondaryStyle,
  danger: dangerStyle
}

const typeStyle = computed(() => typeStyleConfig[props.type])

const smStyle = {
  button: 'p-1.5',
  icon: 'w-4 h-4'
}

const mdStyle = {
  button: 'p-2',
  icon: 'w-4 h-4'
}

const lgStyle = {
  button: '',
  icon: ''
}

const sizeStyleConfig = {
  sm: smStyle,
  md: mdStyle,
  lg: lgStyle
}

const sizeStyle = computed(() => sizeStyleConfig[props.size])
</script>
<template>
  <button
    @click="(e) => $emit('click', e)"
    class="rounded-md border transition-colors"
    :class="sizeStyle.button + ' ' + typeStyle.button"
  >
    <slot name="icon" :iconStyle="sizeStyle.icon + ' ' + typeStyle.icon"></slot>
  </button>
</template>
