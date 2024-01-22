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
import FileDirectory16 from '@renderer/components/Icon/FileDirectory16.vue'
import TriangleDown16 from '@renderer/components/Icon/TriangleDown16.vue'
import IconButton from '@renderer/components/IconButton.vue'
import Heart24 from '@renderer/components/Icon/Heart24.vue'
import HeartFill16 from '@renderer/components/Icon/HeartFill16.vue'

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
  snippetStore.getSnippetDetail(snippetDetail.value.id)
  tagStore.getTagList()
}

const onDeleteButtonClick = async () => {
  try {
    if (!snippetDetail.value?.id) return
    await snippetStore.deleteSnippet(snippetDetail.value.id)
    snippetStore.getSnippetList()
    snippetStore.getStatusSnippetCount()
    tagStore.getTagList()
  } catch (error) {
    console.log('🚀 ~ onDeleteButtonClick ~ error:', error)
  }
}

const onFavoriteButtonClick = async () => {
  try {
    if (!snippetDetail.value?.id) return
    await snippetStore.updateSnippetFavorite(snippetDetail.value.id)
    snippetStore.getSnippetList()
    snippetStore.getStatusSnippetCount()
  } catch (error) {
    console.log('🚀 ~ onFavoriteButtonClick ~ error:', error)
  }
}
</script>
<template>
  <div class="basis-1/2 p-6 pb-4 space-y-3 grow flex flex-col">
    <div class="space-y-2.5">
      <div class="flex items-center justify-between">
        <span class="fira-code text-base font-normal dark:text-primer-dark-white">
          {{ snippetDetail?.name || 'untitled' }}
        </span>

        <IconButton>
          <template #icon="{ iconStyle }">
            <Heart24 class="w-4 h-4" :class="iconStyle" v-if="!snippetDetail?.favorite"></Heart24>
            <HeartFill16 class="w-4 h-4 dark:fill-primer-dark-red-400" v-else></HeartFill16>
          </template>
        </IconButton>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-1.5">
          <template v-if="snippetDetail?.tags.length">
            <Tag :tag="tag" v-for="(tag, index) in snippetDetail.tags" :key="index"> </Tag>
          </template>

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
      </div>
    </div>
    <CodeEditor
      class="grow"
      :code="snippetDetail?.content || ''"
      @update:code="(e) => onUpdateCode(e)"
    ></CodeEditor>
    <div class="flex items-center justify-between">
      <Button :label="snippetDetail?.folder?.name || 'Inbox'" type="secondary" :plain="true">
        <template #rightIcon="{ iconStyle }">
          <TriangleDown16 :class="iconStyle"></TriangleDown16>
        </template>
        <template #leftIcon="{ iconStyle }">
          <FileDirectory16 :class="iconStyle"></FileDirectory16>
        </template>
      </Button>
      <Button label="Delete" type="danger" @click="onDeleteButtonClick">
        <template #leftIcon="{ iconStyle }">
          <Trashcan16 :class="iconStyle"></Trashcan16>
        </template>
      </Button>
    </div>
  </div>
</template>

<style scoped></style>
