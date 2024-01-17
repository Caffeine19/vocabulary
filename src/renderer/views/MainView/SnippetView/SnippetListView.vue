<script setup lang="ts">
import { reactive, ref } from 'vue'

import Search16 from '@/components/Icon/Search16.vue'
import Pencil16 from '@/components/Icon/Pencil16.vue'
import SortDesc16 from '@/components/Icon/SortDesc16.vue'
import Input from '@/components/Input.vue'
import Tag, { type TagOption } from '@/components/Tag.vue'
import Box from '@/components/Box.vue'
import Divider from '@/components/Divider.vue'
import Button from '@/components/Button.vue'

const searchKeyword = ref('')

const tagList = reactive<TagOption[]>([
  {
    color: '#3FB950',
    background: 'rgba(63,185,80,0.1)',
    label: 'vue'
  },

  {
    color: 'rgba(121, 192, 255, 1)',
    background: 'rgba(121, 192, 255, 0.1)',
    label: 'TypeScript'
  },
  {
    color: 'rgba(255, 155, 206, 1)',
    background: 'rgba(255, 155, 206, 0.1)',
    label: 'SCSS'
  }
])
</script>

<template>
  <div class="basis-1/2 p-6 space-y-4 flex flex-col border-r dark:border-primer-dark-gray-600">
    <div class="flex items-center space-x-4 justify-between">
      <Input class="relative grow" placeholder="Type to search" v-model:value="searchKeyword">
        <template #icon>
          <Search16
            class="absolute top-1/2 -translate-y-1/2 left-2.5 dark:fill-primer-dark-gray-400"
          ></Search16>
        </template>
      </Input>
      <Button label="New Snippet" type="primary">
        <template #icon>
          <Pencil16 class="dark:fill-primer-dark-white"></Pencil16>
        </template>
      </Button>
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
                  <Tag v-for="(tag, index) in tagList" :key="index" v-bind="tag"></Tag>
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
</template>