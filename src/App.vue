<script setup lang="ts">
import TitleBar from './components/TitleBar'
import StatusTabGroup from './components/StatusTab'
import Divider from './components/Divider.vue'
import FolderTabGroup from './components/FolderTabGroup.vue'
import TagTabGroup from './components/TagTabGroup.vue'
</script>
<template>
  <div class="flex flex-col w-screen h-screen overflow-hidden">
    <TitleBar></TitleBar>
    <main class="dark:bg-primer-dark-gray-900 grow flex items-stretch overflow-hidden">
      <nav class="p-6 space-y-6 overflow-auto">
        <StatusTabGroup></StatusTabGroup>
        <Divider></Divider>
        <div class="space-y-2.5">
          <span class="dark:text-primer-dark-gray-0 text-sm font-normal">Folders</span>
          <FolderTabGroup></FolderTabGroup>
        </div>
        <Divider></Divider>
        <div class="space-y-2.5">
          <span class="dark:text-primer-dark-gray-0 text-sm font-normal">Tags</span>
          <TagTabGroup></TagTabGroup>
        </div>
      </nav>
      <Divider type="vertical"></Divider>
      <div></div>
      <div></div>
    </main>
  </div>
</template>
