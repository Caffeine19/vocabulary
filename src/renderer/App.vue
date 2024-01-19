<script setup lang="ts">
import { RouterView } from 'vue-router'

import TitleBar from './components/TitleBar.vue'
</script>
<template>
  <div class="flex flex-col w-screen h-screen overflow-hidden">
    <TitleBar></TitleBar>
    <main class="dark:bg-primer-dark-gray-900 grow flex items-stretch overflow-hidden">
      <RouterView></RouterView>
    </main>
  </div>
</template>

<style>
:root {
  color-scheme: dark;
}

body,
html {
  @apply dark:bg-primer-dark-gray-900;
}
</style>
@/theme/GithubDark
