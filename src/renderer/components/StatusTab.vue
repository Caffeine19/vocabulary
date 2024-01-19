<script setup lang="ts">
import { type Component } from 'vue'

import Badge from './Badge.vue'

export interface StatusTabProps {
  icon: Component
  label: string
  num: number
}
defineOptions({ name: 'VStatusTab' })
defineProps<StatusTabProps>()
</script>
<template>
  <li>
    <a
      href=""
      class="rounded-lg flex justify-between items-center px-2 py-1.5 space-x-6 bg-transparent dark:hover:bg-primer-dark-gray-200/[0.08] transition-colors"
    >
      <div class="flex space-x-3 items-center">
        <slot name="icon"></slot>
        <span class="dark:text-primer-dark-gray-100 font-normal text-lg fira-code">
          {{ label }}
        </span>
      </div>
      <Badge :num="num"></Badge>
    </a>
  </li>
</template>
