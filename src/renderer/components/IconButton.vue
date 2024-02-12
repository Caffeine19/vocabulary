<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'VIconButton' })

export interface IconButtonProps {
  type?: 'primary' | 'danger' | 'secondary' | 'invisible'
  size?: 'md' | 'sm' | 'lg'
  plain?: boolean
  rounded?: 'full' | 'none' | 'l' | 'r'
}

const props = withDefaults(defineProps<IconButtonProps>(), {
  type: 'primary',
  size: 'md',
  plain: false,
  rounded: 'full'
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
const invisibleStyle = {
  button: 'bg-transparent border-transparent dark:hover:bg-primer-dark-gray-200/[0.12]',
  icon: 'dark:fill-primer-dark-gray-400'
}
const typeStyleConfig = {
  primary: primaryStyle,
  secondary: secondaryStyle,
  danger: dangerStyle,
  invisible: invisibleStyle
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

const roundedStyleConfig: Record<'full' | 'none' | 'l' | 'r', string[]> = {
  full: ['rounded-full'],
  none: ['rounded-none'],
  l: ['rounded-none', 'rounded-l-md'],
  r: ['rounded-none', 'rounded-r-md']
}
const roundedStyle = computed(() => roundedStyleConfig[props.rounded])

const calRoundedFromButtonGroup = (index: number, buttonGroup: any[]) => {
  return index === 0 ? 'l' : index === buttonGroup.length - 1 ? 'r' : 'none'
}
defineExpose({ calRoundedFromButtonGroup })
</script>
<template>
  <button
    @click="(e) => $emit('click', e)"
    class="v-icon-button transition-colors border rounded-md"
    :class="[sizeStyle.button, typeStyle.button, ...roundedStyle]"
  >
    <slot name="icon" :iconStyle="sizeStyle.icon + ' ' + typeStyle.icon"></slot>
  </button>
</template>
