<script setup lang="ts">
import TitleBar from './components/TitleBar'
import StatusTabGroup from './components/StatusTab'
import Divider from './components/Divider.vue'
import FolderTabGroup from './components/FolderTabGroup.vue'
import TagTabGroup from './components/TagTabGroup.vue'
import Search16 from './components/Icon/Search16.vue'
import Pencil16 from './components/Icon/Pencil16.vue'
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

      <div class="p-6 space-y-4">
        <div class="flex items-center space-x-4">
          <div class="relative min-w-[20rem]">
            <Search16
              class="absolute top-1/2 -translate-y-1/2 left-2.5 dark:fill-primer-dark-gray-400"
            ></Search16>
            <input
              placeholder="Type to search"
              class="pl-10 pr-2.5 py-1.5 bg-transparent dark:placeholder-primer-dark-gray-400 border outline-none dark:border-primer-dark-gray-600 rounded-md text-sm font-normal dark:text-primer-dark-gray-100 w-full"
            />
          </div>
          <button
            class="flex items-center space-x-1.5 px-2.5 py-1 rounded-md dark:bg-primer-dark-green-500 dark:hover:bg-primer-dark-green-400 transition-colors"
          >
            <span class="dark:text-primer-dark-white text-base font-normal">New Snippet</span>
            <Pencil16 class="dark:fill-primer-dark-white"></Pencil16>
          </button>
        </div>

        <div class="rounded-md border dark:border-primer-dark-gray-600">
          <div class="dark:bg-primer-dark-gray-800 flex justify-between px-3 py-1.5">
            <div></div>
            <div>
              <div class="flex items-center">
                <span>Sort</span>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <Divider type="vertical"></Divider>
      <div></div>
    </main>
  </div>
</template>
