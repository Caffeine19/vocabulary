<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDebounceFn } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { useManualRefHistory } from '@vueuse/core'

// import Divider from '@/components/Divider.vue'
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
// import Input from '@renderer/components/Input.vue'
import Check16 from '@renderer/components/Icon/Check16.vue'
import Inbox16 from '@renderer/components/Icon/Inbox16.vue'
import Fire16 from '@renderer/components/Icon/Fire16.vue'
import History16 from '@renderer/components/Icon/History16.vue'
import Checkbox from '@renderer/components/Checkbox.vue'

import { useSnippetStore } from '@renderer/stores/snippet'
import { useTagStore } from '@renderer/stores/tag'
import { useFolderStore } from '@renderer/stores/folder'

import type { TagItem } from '@shared/Tag'
import type { FolderItem } from '@shared/folder'
import { useInjectConfirmation } from '@renderer/hooks/useConfirmation'
import { open } from 'inspector'
import Link16 from '@renderer/components/Icon/Link16.vue'

const snippetStore = useSnippetStore()
const { snippetDetail } = storeToRefs(snippetStore)

const tagStore = useTagStore()
const { tagList } = storeToRefs(tagStore)

const onUpdateCode = useDebounceFn(async (e) => {
  if (!snippetDetail.value?.id) return
  await snippetStore.updateSnippetContent(snippetDetail.value.id, e)
  snippetStore.getSnippetDetail(snippetDetail.value.id)
  // await snippetStore.getSnippetList()
}, 300)

const onFormatCode = async () => {
  if (!snippetDetail.value?.id) return
  await snippetStore.formatSnippetContent(snippetDetail.value.id)
  snippetStore.getSnippetDetail(snippetDetail.value.id)
}

const onChangeName = useDebounceFn(async (e) => {
  if (!snippetDetail.value?.id) return
  await snippetStore.updateSnippetName(snippetDetail.value.id, e)
  snippetStore.getSnippetList()
})

const isTagMenuShow = ref(false)
const checkedTagList = ref<TagItem['id'][]>([])
watch(
  () => snippetDetail.value?.tags,
  () => {
    checkedTagList.value = snippetDetail.value ? snippetDetail.value.tags.map((t) => t.id) : []
    commitCheckedTagList()
  }
)
const { commit: commitCheckedTagList, reset: resetCheckedTagList } =
  useManualRefHistory(checkedTagList)

const onTagApplyButtonClick = async () => {
  if (!snippetDetail.value) return
  const connectTagIdList = checkedTagList.value.filter(
    (checkedTagId) => !snippetDetail.value?.tags.find((t) => t.id === checkedTagId)
  )
  const disconnectTagIdList = snippetDetail.value.tags
    .filter((t) => !checkedTagList.value.find((checkedTagId) => checkedTagId === t.id))
    .map((t) => t.id)
  try {
    await snippetStore.updateSnippetTags(snippetDetail.value.id, {
      connect: connectTagIdList,
      disconnect: disconnectTagIdList
    })

    isTagMenuShow.value = false

    commitCheckedTagList()

    snippetStore.getSnippetDetail(snippetDetail.value.id)
    snippetStore.getSnippetList()
    tagStore.getTagList()
  } catch (error) {
    console.log('🚀 ~ onTagCancelButtonClick ~ error:', error)
  }
}

const onTagCancelButtonClick = () => {
  resetCheckedTagList()
  isTagMenuShow.value = false
}

const onDeleteButtonClick = async () => {
  try {
    if (!snippetDetail.value?.id) return
    await snippetStore.deleteSnippet(snippetDetail.value.id)
    snippetStore.getSnippetList()
    snippetStore.getStatusSnippetCount()
    tagStore.getTagList()
    folderStore.getFolderList()
  } catch (error) {
    console.log('🚀 ~ onDeleteButtonClick ~ error:', error)
  }
}

const { openConfirmation } = useInjectConfirmation()
const onDestroyButtonClick = () => {
  openConfirmation({
    title: 'Destroy Snippet',
    description: 'Are you sure you want to destroy this snippet?',
    confirmButtonType: 'danger',
    onConfirm: async () => {
      try {
        if (!snippetDetail.value?.id) return
        await snippetStore.destroySnippet(snippetDetail.value.id)
        snippetStore.getSnippetList()
        snippetStore.getStatusSnippetCount()
      } catch (error) {
        console.log('🚀 ~ onDestoryButtonClick ~ error:', error)
      }
    }
  })
}

const onFavoriteButtonClick = async () => {
  try {
    if (!snippetDetail.value?.id) return
    await snippetStore.updateSnippetFavorite(snippetDetail.value.id, !snippetDetail.value.favorite)

    snippetDetail.value.favorite = !snippetDetail.value.favorite

    snippetStore.getSnippetList()
    snippetStore.getStatusSnippetCount()
  } catch (error) {
    console.log('🚀 ~ onFavoriteButtonClick ~ error:', error)
  }
}

const onRestoreButtonClick = async () => {
  if (!snippetDetail.value?.id) return
  try {
    await snippetStore.restoreSnippet(snippetDetail.value.id)
    snippetStore.getSnippetList()
    snippetStore.getStatusSnippetCount()
    tagStore.getTagList()
    folderStore.getFolderList()
  } catch (error) {
    console.log('🚀 ~ onRecoverButtonClick ~ error:', error)
  }
}

const folderStore = useFolderStore()
const { folderList } = storeToRefs(folderStore)

const isFolderMenuShow = ref(false)
const folderOptions = computed(() => [{ id: undefined, name: 'Inbox' }, ...folderList.value])
const onFolderSelect = async (folderId: FolderItem['id']) => {
  if (!snippetDetail.value?.id) return

  if (folderId === undefined) {
    await snippetStore.moveSnippetIntoInbox(snippetDetail.value.id)
    snippetStore.getStatusSnippetCount()
  } else {
    await snippetStore.moveSnippetIntoFolder(snippetDetail.value.id, folderId)
  }

  snippetStore.getSnippetList()
  snippetStore.getSnippetDetail(snippetDetail.value.id)
  snippetStore.getStatusSnippetCount()
  folderStore.getFolderList()

  isFolderMenuShow.value = false
}
</script>
<template>
  <div class="basis-1/2 grow flex flex-col p-6 pb-4 space-y-3 overflow-hidden">
    <div class="space-y-2.5">
      <div class="flex items-center justify-between space-x-6">
        <input
          :value="snippetDetail?.name || ''"
          :disabled="snippetDetail?.deleted"
          @change="(e) => onChangeName((e.target as HTMLInputElement).value)"
          placeholder="untitled"
          class="fira-code dark:text-primer-dark-white dark:placeholder-primer-dark-gray-400 focus:dark:border-primer-dark-blue-400 grow py-1 text-base font-normal transition-colors bg-transparent border-b border-transparent outline-none"
        />

        <div class="flex items-center space-x-2">
          <template v-if="!snippetDetail?.deleted">
            <IconButton @click="onFavoriteButtonClick" type="secondary" :plain="true">
              <template #icon="{ iconStyle }">
                <HeartFill16
                  class="dark:fill-primer-dark-pink-200 w-4 h-4"
                  v-if="snippetDetail?.favorite"
                ></HeartFill16>
                <Heart24 class="w-4 h-4" :class="iconStyle" v-else></Heart24>
              </template>
            </IconButton>
            <SelectMenu
              title="Select Folder"
              v-model:is-show="isFolderMenuShow"
              :options="folderOptions"
              @select="(folder) => onFolderSelect(folder.id)"
            >
              <template #trigger>
                <Button
                  :label="snippetDetail?.folder?.name || 'Inbox'"
                  type="secondary"
                  :plain="true"
                  @click="isFolderMenuShow = !isFolderMenuShow"
                >
                  <template #rightIcon="{ iconStyle }">
                    <TriangleDown16 :class="iconStyle"></TriangleDown16>
                  </template>
                  <template #leftIcon="{ iconStyle }">
                    <FileDirectory16 :class="iconStyle"></FileDirectory16>
                  </template>
                </Button>
              </template>
              <template #menuItem="{ option }">
                <li class="flex items-center justify-between space-x-4">
                  <div class="flex items-center space-x-4">
                    <component
                      :is="option.id === undefined ? Inbox16 : FileDirectory16"
                      class="dark:fill-primer-dark-gray-400"
                    ></component>
                    <span class="dark:text-primer-dark-gray-0 fira-code text-sm">
                      {{ option.name }}
                    </span>
                  </div>

                  <Check16
                    class="dark:fill-primer-dark-gray-0 transition-opacity"
                    :class="option.id === snippetDetail?.folderId ? 'opacity-100' : 'opacity-0'"
                  ></Check16>
                </li>
              </template>
            </SelectMenu>
          </template>
          <template v-else>
            <IconButton @click="onRestoreButtonClick" type="secondary" :plain="true">
              <template #icon="{ iconStyle }">
                <History16 :class="iconStyle"> </History16>
              </template>
            </IconButton>
          </template>
        </div>
      </div>

      <div class="flex items-center space-x-1.5">
        <template v-if="snippetDetail?.tags.length">
          <Tag :tag="tag" v-for="(tag, index) in snippetDetail.tags" :key="index"> </Tag>
        </template>

        <SelectMenu
          v-show="!snippetDetail?.deleted"
          title="Select Tag"
          :is-show="isTagMenuShow"
          :options="tagList"
          @click-outside="
            () => {
              if (isTagMenuShow) {
                isTagMenuShow = false
                resetCheckedTagList()
              }
            }
          "
          @close-button-click="
            () => {
              if (isTagMenuShow) {
                isTagMenuShow = false
                resetCheckedTagList()
              }
            }
          "
        >
          <template #trigger>
            <IconButton @click="isTagMenuShow = !isTagMenuShow" type="invisible" size="sm">
              <template #icon="{ iconStyle }">
                <Link16 :class="iconStyle"></Link16>
              </template>
            </IconButton>
          </template>

          <template #menuItem="{ option }">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <Checkbox
                  :checked="checkedTagList.includes(option.id)"
                  @check="checkedTagList.push(option.id)"
                  @uncheck="checkedTagList = checkedTagList.filter((tag) => tag !== option.id)"
                ></Checkbox>
                <span class="dark:text-primer-dark-gray-0 fira-code text-sm">{{
                  option.name
                }}</span>
              </div>
              <div class="w-3 h-3 rounded-full" :style="{ background: option.color }"></div>
            </div>
          </template>
          <template #footer>
            <div class="flex justify-end space-x-4">
              <Button
                label="Cancel"
                type="secondary"
                size="sm"
                @click="onTagCancelButtonClick"
              ></Button>
              <Button label="Apply" size="sm" @click="onTagApplyButtonClick"></Button>
            </div>
          </template>
        </SelectMenu>
      </div>
    </div>
    <CodeEditor
      class="grow overflow-hidden"
      :code="snippetDetail?.content || ''"
      @update:code="(e) => onUpdateCode(e)"
      @format="onFormatCode"
      :disabled="snippetDetail?.deleted"
    ></CodeEditor>
    <div class="flex items-center justify-between">
      <div>
        <Button
          v-if="!snippetDetail?.deleted"
          label="Delete"
          type="danger"
          @click="onDeleteButtonClick"
        >
          <template #leftIcon="{ iconStyle }">
            <Trashcan16 :class="iconStyle"></Trashcan16>
          </template>
        </Button>
        <Button v-else label="Destroy" type="danger" @click="onDestroyButtonClick">
          <template #leftIcon="{ iconStyle }">
            <Fire16 :class="iconStyle"></Fire16>
          </template>
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
