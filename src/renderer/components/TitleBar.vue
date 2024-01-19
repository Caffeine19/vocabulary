<script setup lang="ts">
import Logo from './Logo.vue'
import WIndowControllerGroup from './WIndowControllerGroup.vue'
</script>
<template>
  <header
    class="flex items-center justify-between dark:bg-primer-dark-gray-700 px-6 py-2"
    style="-webkit-app-region: drag"
  >
    <div class="flex items-end space-x-2" style="-webkit-app-region: no-drag">
      <Logo class="w-8 h-8"></Logo>
      <p class="dark:text-primer-dark-gray-0 fira-code text-xl">VOCABULARY</p>
    </div>

    <WIndowControllerGroup style="-webkit-app-region: no-drag"></WIndowControllerGroup>
  </header>
  <div></div>
</template>
