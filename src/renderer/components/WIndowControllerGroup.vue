<script setup lang="ts">
import WindowController, { type WindowControllerProps } from './WindowController.vue'

import Copy24 from './Icon/Copy24.vue'
import Rule24 from './Icon/Rule24.vue'
import X24 from './Icon/X24.vue'

const windowControllerOptions: WindowControllerProps[] = [
  {
    icon: Rule24,
    action: window.electronAPI.minimize
  },
  {
    icon: Copy24,
    action: window.electronAPI.maximize
  },
  {
    icon: X24,
    action: window.electronAPI.close
  }
]
</script>
<template>
  <div class="flex items-center space-x-4">
    <WindowController
      v-for="(con, index) in windowControllerOptions"
      :key="index"
      :action="con.action"
    >
      <template #icon>
        <component :is="con.icon" class="fill-primer-dark-gray-0 w-5 h-5"></component>
      </template>
    </WindowController>
  </div>
</template>
