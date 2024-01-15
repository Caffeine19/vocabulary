<script setup lang="ts">
import TitleBar from './components/TitleBar'
import StatusTabGroup from './components/StatusTab'
import Divider from './components/Divider.vue'
import FolderTabGroup from './components/FolderTabGroup.vue'
import TagTabGroup from './components/TagTabGroup.vue'
import Search16 from './components/Icon/Search16.vue'
import Pencil16 from './components/Icon/Pencil16.vue'
import SortDesc16 from './components/Icon/SortDesc16.vue'
import Tag16 from './components/Icon/Tag16.vue'
import Box from './components/Box.vue'
import Copy24 from './components/Icon/Copy24'
</script>
<template>
  <div class="flex flex-col w-screen h-screen overflow-hidden">
    <TitleBar></TitleBar>
    <main class="dark:bg-primer-dark-gray-900 grow flex items-stretch overflow-hidden">
      <nav class="p-6 space-y-6 overflow-auto">
        <StatusTabGroup></StatusTabGroup>
        <Divider></Divider>
        <div class="space-y-2.5">
          <span class="dark:text-primer-dark-gray-0 text-sm font-normal fira-code">Folders</span>
          <FolderTabGroup></FolderTabGroup>
        </div>
        <Divider></Divider>
        <div class="space-y-2.5">
          <span class="dark:text-primer-dark-gray-0 text-sm font-normal fira-code">Tags</span>
          <TagTabGroup></TagTabGroup>
        </div>
      </nav>
      <Divider type="vertical"></Divider>

      <div class="p-6 space-y-4 flex flex-col">
        <div class="flex items-center space-x-4 justify-between">
          <div class="relative min-w-[20rem] grow">
            <Search16
              class="absolute top-1/2 -translate-y-1/2 left-2.5 dark:fill-primer-dark-gray-400"
            ></Search16>
            <input
              placeholder="Type to search"
              class="pl-10 pr-2.5 py-1.5 bg-transparent dark:placeholder-primer-dark-gray-400 border outline-none dark:border-primer-dark-gray-600 rounded-md text-sm font-normal dark:text-primer-dark-gray-100 w-full fira-code"
            />
          </div>
          <button
            class="flex items-center space-x-1.5 px-2.5 py-1 rounded-md dark:bg-primer-dark-green-500 dark:hover:bg-primer-dark-green-400 transition-colors"
          >
            <span class="dark:text-primer-dark-white text-base font-normal fira-code"
              >New Snippet</span
            >
            <Pencil16 class="dark:fill-primer-dark-white"></Pencil16>
          </button>
        </div>

        <Box>
          <template #header>
            <div></div>
            <div>
              <div class="flex items-center space-x-1.5">
                <SortDesc16 class="dark:fill-primer-dark-gray-400"></SortDesc16>
                <span class="fira-code text-sm dark:text-primer-dark-gray-400">Sort</span>
              </div>
            </div>
          </template>

          <template #main>
            <ul>
              <template v-for="i in 32" :key="i">
                <li class="px-3 py-1.5">
                  <div class="flex items-center justify-between">
                    <span class="fira-code dark:text-primer-dark-gray-0 text-base font-normal">
                      vue ts init
                    </span>
                    <div class="flex items-center space-x-1.5">
                      <div
                        class="rounded-full flex items-center space-x-1.5 py-0.5 px-1.5 bg-[#3FB950]/10"
                      >
                        <Tag16 class="fill-[#3FB950]"></Tag16>
                        <span class="text-[#3FB950] fira-code text-sm font-normal">vue</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span class="text-xs font-normal fira-code dark:text-primer-dark-gray-400">
                      &lt;script setup lang=&quot;ts&quot;&gt;&lt;/script&gt;
                      &lt;template&gt;&lt;/template&gt; &lt;style scoped&gt;&lt;/style&gt;
                    </span>
                  </div>
                </li>
                <Divider></Divider>
              </template>
            </ul>
          </template>
        </Box>
      </div>
      <Divider type="vertical"></Divider>
      <div class="p-6 space-y-3 grow">
        <Divider></Divider>
        <Box>
          <template #header>
            <span class="fira-code text-xs font-normal dark:text-primer-dark-gray-400"
              >19 lines (16 loc) · 170 Bytes</span
            >
            <button>
              <Copy24 class="w-4 h-4 dark:fill-primer-dark-gray-400"></Copy24>
            </button>
          </template>
          <template #main>
            <pre class="p-4"><code class="dark:text-primer-dark-gray-100">
&lt;script setup lang=&quot;ts&quot;&gt;&lt;/script&gt;
&lt;template&gt;&lt;/template&gt;
&lt;style scoped&gt;&lt;/style&gt;
</code></pre>
          </template>
        </Box>
      </div>
    </main>
  </div>
</template>
