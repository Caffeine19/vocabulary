<script setup lang="ts">
import { type Component } from 'vue'

import Badge from './Badge.vue'

export interface StatusTabProps {
  icon: Component
  label: string
  num: number
}
defineOptions({ name: 'VStatusTab' })
defineProps<Omit<StatusTabProps, 'icon'> & { selected: boolean }>()
</script>
<template>
  <li
    :class="
      selected
        ? 'cursor-default  dark:bg-primer-dark-gray-200/[0.08]'
        : 'cursor-pointer dark:hover:bg-primer-dark-gray-200/[0.12]'
    "
    class="rounded-lg flex justify-between items-center px-2 py-1.5 bg-transparent transition-colors"
  >
    <div class="flex items-center space-x-3">
      <slot name="icon"></slot>
      <span class="dark:text-primer-dark-gray-100 fira-code text-base font-normal">
        {{ label }}
      </span>
    </div>
    <Badge :num="num"></Badge>
  </li>
</template>
