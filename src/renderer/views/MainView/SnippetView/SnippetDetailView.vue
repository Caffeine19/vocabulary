<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDebounceFn } from '@vueuse/core'

import Divider from '@/components/Divider.vue'
import Tag from '@/components/Tag.vue'
import Button from '@/components/Button.vue'
import Trashcan16 from '@/components/Icon/Trashcan16.vue'

import CodeEditor from './CodeEditor.vue'

import { useSnippetStore } from '@renderer/stores/snippet'

const snippetStore = useSnippetStore()
const { snippetDetail } = storeToRefs(snippetStore)

const onUpdateCode = useDebounceFn((e) => {
  if (!snippetDetail.value?.id) return
  snippetStore.updateSnippetContent(snippetDetail.value.id, e)
}, 300)
</script>
<template>
  <div class="basis-1/2 p-6 space-y-3 grow flex flex-col">
    <div class="space-y-2.5">
      <span class="fira-code text-base font-normal dark:text-primer-dark-white">
        {{ snippetDetail?.name || 'untitled' }}
      </span>
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-1.5" v-if="snippetDetail?.tags.length">
          <Tag :tag="tag" v-for="(tag, index) in snippetDetail.tags" :key="index"></Tag>
        </div>
        <Button label="delete" type="danger">
          <template #icon>
            <Trashcan16 class="dark:fill-primer-dark-white"></Trashcan16>
          </template>
        </Button>
      </div>
    </div>
    <Divider></Divider>
    <CodeEditor
      class="grow"
      :code="snippetDetail?.content || ''"
      @update:code="(e) => onUpdateCode(e)"
    ></CodeEditor>
  </div>
</template>

<style scoped>
.v-button {
  @apply px-1.5 py-0.5;
}
</style>
<script setup lang="”ts”"></script>
