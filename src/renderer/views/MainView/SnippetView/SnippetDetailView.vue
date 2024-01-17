<script setup lang="ts">
import { reactive } from 'vue'

import Divider from '@/components/Divider.vue'
import Tag, { type TagOption } from '@/components/Tag.vue'
import Button from '@/components/Button.vue'
import Trashcan16 from '@/components/Icon/Trashcan16.vue'

import CodeEditor from './CodeEditor.vue'

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
  }
])
</script>
<template>
  <div class="basis-1/2 p-6 space-y-3 grow flex flex-col">
    <div class="space-y-2.5">
      <span class="fira-code text-base font-normal dark:text-primer-dark-white">
        define store
      </span>
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-1.5">
          <Tag v-for="(tag, index) in tagList" :key="index" v-bind="tag"></Tag>
        </div>
        <Button label="delete" type="danger">
          <template #icon>
            <Trashcan16 class="dark:fill-primer-dark-white"></Trashcan16>
          </template>
        </Button>
      </div>
    </div>
    <Divider></Divider>
    <CodeEditor class="grow"></CodeEditor>
  </div>
</template>

<style scoped>
.v-button {
  @apply px-1.5 py-0.5;
}
</style>