<script setup lang="ts">
import { RouterView } from 'vue-router'
// import { devtools } from '@vue/devtools'

import TitleBar from './components/TitleBar.vue'
import ActionMenu from './components/ActionMenu.vue'
import ConfirmationDialog from './components/ConfirmationDialog.vue'

import { useProvideActionMenu } from './hooks/useActionMenu'
import { useProvideConfirmation } from './hooks/useConfirmation'

useProvideActionMenu()
useProvideConfirmation()

//开发模式下加载vue-devtools
// if (process.env.NODE_ENV === 'development') {
//   try {
//     devtools.connect('http://localhost', 8098)
//   } catch (error) {
//     console.log('🚀 ~ error:', error)
//   }
// }
</script>
<template>
  <div class="flex flex-col w-screen h-screen overflow-hidden">
    <TitleBar></TitleBar>
    <main class="dark:bg-primer-dark-gray-900 grow flex items-stretch overflow-hidden">
      <RouterView></RouterView>
    </main>
  </div>
  <ActionMenu></ActionMenu>
  <ConfirmationDialog></ConfirmationDialog>
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
