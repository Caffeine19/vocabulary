<script setup lang="ts">
import { type Component } from 'vue'

export interface WindowControllerProps {
  action: () => void
  icon: Component
}

defineProps<{ action: WindowControllerProps['action'] }>()
</script>
<template>
  <button @click="action()" class="cursor-pointer">
    <slot name="icon"></slot>
  </button>
</template>
