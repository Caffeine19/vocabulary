<script setup lang="ts">
import TitleBar from './components/TitleBar'
import StatusTabGroup from './components/StatusTab'
import Divider from './components/Divider.vue'
</script>
<template>
  <div class="flex flex-col w-screen h-screen">
    <TitleBar></TitleBar>
    <main class="dark:bg-primer-dark-gray-900 grow flex items-stretch">
      <nav class="p-6 space-y-6">
        <StatusTabGroup></StatusTabGroup>
        <Divider></Divider>
        <div>
          <span class="dark:text-primer-dark-gray-0 text-sm font-normal">Folders</span>
        </div>
      </nav>
      <Divider type="vertical"></Divider>
      <div></div>
      <div></div>
    </main>
  </div>
</template>
