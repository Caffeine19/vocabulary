<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDebounceFn } from '@vueuse/core'
import { ref } from 'vue'

import Divider from '@/components/Divider.vue'
import Tag from '@/components/Tag.vue'
import Button from '@/components/Button.vue'
import Trashcan16 from '@/components/Icon/Trashcan16.vue'
import Plus24 from '@renderer/components/Icon/Plus24.vue'
import SelectMenu from '@renderer/components/SelectMenu.vue'
import CodeEditor from './CodeEditor.vue'

import { useSnippetStore } from '@renderer/stores/snippet'
import { useTagStore } from '@renderer/stores/tag'

import type { TagItem } from '@shared/Tag'

const snippetStore = useSnippetStore()
const { snippetDetail } = storeToRefs(snippetStore)

const tagStore = useTagStore()
const { tagList } = storeToRefs(tagStore)

const onUpdateCode = useDebounceFn((e) => {
  if (!snippetDetail.value?.id) return
  snippetStore.updateSnippetContent(snippetDetail.value.id, e)
}, 300)

const isSelectMenuShow = ref(false)
const onTagSelect = async (tag: TagItem) => {
  if (!snippetDetail.value) return
  await snippetStore.connectSnippetWithTag(snippetDetail.value.id, tag.id)
  //refresh
  await snippetStore.getSnippetList()
  await snippetStore.getSnippetDetail(snippetDetail.value.id)
}
</script>
<template>
  <div class="basis-1/2 p-6 space-y-3 grow flex flex-col">
    <div class="space-y-2.5">
      <span class="fira-code text-base font-normal dark:text-primer-dark-white">
        {{ snippetDetail?.name || 'untitled' }}
      </span>
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-1.5" v-if="snippetDetail?.tags.length">
          <Tag :tag="tag" v-for="(tag, index) in snippetDetail.tags" :key="index"> </Tag>

          <SelectMenu
            title="Select Tag"
            v-model:is-show="isSelectMenuShow"
            :options="tagList"
            @select="(tag) => onTagSelect(tag)"
          >
            <template #trigger>
              <button @click="isSelectMenuShow = !isSelectMenuShow">
                <Plus24
                  class="dark:fill-primer-dark-gray-400 dark:hover:fill-primer-dark-gray-0 transition-colors"
                ></Plus24>
              </button>
            </template>
            <template #menuItem="{ option }">
              <div>
                <Tag :tag="option" class="w-fit"></Tag>
              </div>
            </template>
          </SelectMenu>
        </div>

        <Button label="Delete" type="danger">
          <template #icon>
            <Trashcan16
              class="dark:fill-primer-dark-red-500 dark:group-hover:fill-primer-dark-white transition-colors"
            ></Trashcan16>
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
  @apply py-0.5;
}
</style>
