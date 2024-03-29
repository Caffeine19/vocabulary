<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useManualRefHistory } from '@vueuse/core'
import { useAutoAnimate } from '@formkit/auto-animate/vue'

import Search16 from '@/components/Icon/Search16.vue'
import Pencil16 from '@/components/Icon/Pencil16.vue'
import SortDesc16 from '@/components/Icon/SortDesc16.vue'
import Input from '@/components/Input.vue'
import Box from '@/components/Box.vue'
import Divider from '@/components/Divider.vue'
import Button from '@/components/Button.vue'
import SnippetItem from '@/components/SnippetItem.vue'
import SelectGroupMenu from '@renderer/components/SelectGroupMenu.vue'
import Check16 from '@renderer/components/Icon/Check16.vue'
import Blank from '@renderer/components/Blank.vue'
import Code24 from '@renderer/components/Icon/Code24.vue'
import Alert16 from '@renderer/components/Icon/Alert16.vue'
import Tag16 from '@renderer/components/Icon/Tag16.vue'
import Dialog from '@renderer/components/Dialog.vue'

import { useSnippetStore } from '@/stores/snippet'
import { useTagStore } from '@renderer/stores/tag'
import { useFolderStore } from '@renderer/stores/folder'

import type { SnippetItem as ISnippetItem, SortAttr, SortDirection } from '@shared/snippet'

import { useInjectConfirmation } from '@renderer/hooks/useConfirmation'
import { ActionMenuOptions, useInjectActionMenu } from '@renderer/hooks/useActionMenu'
import Trashcan16 from '@renderer/components/Icon/Trashcan16.vue'
import FileDirectory16 from '@renderer/components/Icon/FileDirectory16.vue'
import Heart24 from '@renderer/components/Icon/Heart24.vue'

const [parent] = useAutoAnimate({})

const snippetStore = useSnippetStore()
const { snippetList, snippetDetail, selectedStatus, selectedAttr, selectedDirection } =
  storeToRefs(snippetStore)

onMounted(async () => {
  await snippetStore.getSnippetList()
})

const tagStore = useTagStore()

const folderStore = useFolderStore()

const onSnippetItemClick = (id: ISnippetItem['id']) => {
  snippetStore.getSnippetDetail(id)
}

const searchKeyword = ref('')
const filteredSnippet = computed(() => {
  return snippetList.value.filter(
    (s) =>
      s.name?.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
      s.excerpt?.toLowerCase().includes(searchKeyword.value.toLowerCase())
  )
})

const onNewSnippetButtonClick = async () => {
  try {
    const res = await snippetStore.createBlankSnippet()
    if (!res?.id) return
    await snippetStore.getSnippetList()
  } catch (error) {
    console.log('🚀 ~ onNewSnippetButtonClick ~ error:', error)
  }
}

const attr = ref(selectedAttr.value)
const { commit: commitAttr, reset: resetAttr } = useManualRefHistory(attr)
commitAttr()
const direction = ref(selectedDirection.value)
const { commit: commitDirection, reset: resetDirection } = useManualRefHistory(direction)
commitDirection()

const attrOptions: SortAttr[] = ['createdAt', 'name', 'updatedAt']
const directionOptions: SortDirection[] = ['asc', 'desc']

const isSortOptionsShow = ref(false)
const onSortOptionSelect = (sortOption: SortAttr | SortDirection, seriesIndex: number) => {
  console.log('🚀 ~ onSortOptionSelect ~ seriesIndex:', seriesIndex, sortOption)
  if (seriesIndex === 0) {
    direction.value = sortOption as SortDirection
  } else if (seriesIndex === 1) {
    attr.value = sortOption as SortAttr
  }
}

const onApplyButtonClick = () => {
  commitAttr()
  commitDirection()

  selectedAttr.value = attr.value
  selectedDirection.value = direction.value

  isSortOptionsShow.value = false
}

const onCancelButtonClick = () => {
  resetAttr()
  resetDirection()

  isSortOptionsShow.value = false
}

const { openConfirmation } = useInjectConfirmation()
const onEmptyButtonClick = async () => {
  openConfirmation({
    title: 'Empty Snippet',
    description: 'Are you sure you want to empty all snippets?',
    onConfirm: async () => {
      await snippetStore.emptySnippet()
      snippetStore.getSnippetList()
    }
  })
}

const onDeleteButtonClick = async () => {
  if (!rightClickedSnippet.value) return
  try {
    await snippetStore.deleteSnippet(rightClickedSnippet.value.id)
    snippetStore.getSnippetList()
    snippetStore.getStatusSnippetCount()
    tagStore.getTagList()
    folderStore.getFolderList()
  } catch (error) {
    console.log('🚀 ~ onDeleteButtonClick ~ error:', error)
  }
}

const onFavoriteButtonClick = async (favorite: boolean) => {
  if (!rightClickedSnippet.value) return
  try {
    await snippetStore.updateSnippetFavorite(rightClickedSnippet.value.id, favorite)
    snippetStore.getSnippetList()
    snippetStore.getStatusSnippetCount()

    // Update snippet detail if it's the same snippet
    if (snippetDetail.value && snippetDetail.value.id === rightClickedSnippet.value.id) {
      snippetStore.getSnippetDetail(snippetDetail.value.id)
    }
  } catch (error) {
    console.log('🚀 ~ onDeleteButtonClick ~ error:', error)
  }
}

const isDialogShow = ref(false)
const newName = ref('')
const renameInputFocused = ref(false)
const onRenameButtonClick = async () => {
  if (!rightClickedSnippet.value) return

  isDialogShow.value = true
  renameInputFocused.value = true
  newName.value = rightClickedSnippet.value.name || ''
}
const onCancelRenameButtonClick = () => {
  isDialogShow.value = false
  renameInputFocused.value = false
}
const onApplyRenameButtonClick = async () => {
  try {
    if (!rightClickedSnippet.value) return
    const res = await snippetStore.updateSnippetName(rightClickedSnippet.value.id, newName.value)
    console.log('🚀 ~ onApplyRenameButtonClick ~ res:', res)

    isDialogShow.value = false
    renameInputFocused.value = false

    if (snippetDetail.value?.id === rightClickedSnippet.value.id) {
      snippetStore.getSnippetDetail(snippetDetail.value.id)
    }
  } catch (error) {
    console.log('🚀 ~ onApplyRenameButtonClick ~ error:', error)
  }
}

const { openActionMenu } = useInjectActionMenu()
const actionMenuOptions = computed<ActionMenuOptions>(() => [
  [
    {
      name: 'Rename',
      action: onRenameButtonClick,
      icon: Pencil16
    },
    {
      name: 'Move to',
      action: () => console.log(''),
      icon: FileDirectory16
    },
    {
      name: 'Add tag',
      action: () => console.log(''),
      icon: Tag16
    },
    {
      name: rightClickedSnippet.value?.favorite ? 'Remove from favorite' : 'Add to favorite',
      action: () => onFavoriteButtonClick(!rightClickedSnippet.value?.favorite),
      icon: Heart24
    }
  ],
  [
    {
      name: 'Delete',
      action: onDeleteButtonClick,
      icon: Trashcan16
    }
  ]
])

const rightClickedSnippet = ref<ISnippetItem | null>(null)
const onSnippetItemRightClick = (snippetItem: ISnippetItem, e: MouseEvent) => {
  if (!openActionMenu) return
  rightClickedSnippet.value = snippetItem
  openActionMenu(actionMenuOptions.value, e)
}
</script>

<template>
  <div
    class="basis-1/2 dark:border-primer-dark-gray-600 flex flex-col p-6 space-y-4 overflow-hidden border-r"
  >
    <div class="flex items-center justify-between space-x-4">
      <Input class="grow relative" placeholder="Type to search" v-model:value="searchKeyword">
        <template #icon>
          <Search16
            class="absolute top-1/2 -translate-y-1/2 left-2.5 dark:fill-primer-dark-gray-400"
          ></Search16>
        </template>
      </Input>

      <Button
        label="New Snippet"
        type="primary"
        @click="onNewSnippetButtonClick"
        v-show="selectedStatus !== 'deleted'"
      >
        <template #rightIcon="{ iconStyle }">
          <Pencil16 :class="iconStyle"></Pencil16>
        </template>
      </Button>

      <Button
        label="Empty"
        type="danger"
        @click="onEmptyButtonClick"
        v-show="selectedStatus === 'deleted'"
      >
        <template #leftIcon="{ iconStyle }">
          <Alert16 :class="iconStyle"></Alert16>
        </template>
      </Button>
    </div>

    <Box class="overflow-hidden">
      <template #header>
        <div></div>
        <div>
          <SelectGroupMenu
            title="Sort by"
            :is-show="isSortOptionsShow"
            :searchable="false"
            :optionsSeries="[directionOptions, attrOptions]"
            @select="(option, seriesIndex) => onSortOptionSelect(option, seriesIndex)"
            @close-button-click="
              () => {
                if (isSortOptionsShow) {
                  isSortOptionsShow = false
                  resetAttr()
                  resetDirection()
                }
              }
            "
            @click-outside="
              () => {
                if (isSortOptionsShow) {
                  isSortOptionsShow = false
                  resetAttr()
                  resetDirection()
                }
              }
            "
          >
            <template #trigger>
              <button
                class="flex items-center space-x-1.5 group"
                @click="isSortOptionsShow = !isSortOptionsShow"
              >
                <SortDesc16
                  class="dark:fill-primer-dark-gray-400 dark:group-hover:fill-primer-dark-gray-0 transition-colors"
                ></SortDesc16>
                <span
                  class="fira-code dark:text-primer-dark-gray-400 dark:group-hover:text-primer-dark-gray-0 text-sm transition-colors"
                  >Sort
                </span>
              </button>
            </template>
            <template #menuItem="{ option, seriesIndex }">
              <li class="min-w-28 flex items-center space-x-4">
                <Check16
                  class="dark:fill-primer-dark-gray-0 transition-opacity"
                  :class="
                    (seriesIndex === 0 && option === direction) ||
                    (seriesIndex === 1 && option === attr)
                      ? 'opacity-100'
                      : 'opacity-0'
                  "
                ></Check16>
                <span class="whitespace-nowrap dark:text-primer-dark-gray-0 fira-code text-sm">
                  {{ option }}
                </span>
              </li>
            </template>
            <template #footer>
              <div class="flex justify-end space-x-4">
                <Button
                  label="Cancel"
                  type="secondary"
                  size="sm"
                  @click="onCancelButtonClick"
                ></Button>
                <Button label="Apply" size="sm" @click="onApplyButtonClick"></Button>
              </div>
            </template>
          </SelectGroupMenu>
        </div>
      </template>

      <template #main>
        <ul v-show="filteredSnippet.length > 0" ref="parent">
          <template v-for="snippet in filteredSnippet" :key="snippet.id">
            <SnippetItem
              :snippet-item="snippet"
              @click="onSnippetItemClick(snippet.id)"
              :selected="snippetDetail?.id === snippet.id"
              @contextmenu="(e: MouseEvent) => onSnippetItemRightClick(snippet, e)"
            ></SnippetItem>
            <Divider></Divider>
          </template>
        </ul>
        <Blank
          v-show="filteredSnippet.length === 0"
          title="No snippet in list."
          subtitle="Add snippets to view them here."
        >
          <template #icon="{ iconStyle }"> <Code24 :class="iconStyle"></Code24></template>
        </Blank>
      </template>
    </Box>
  </div>
  <Dialog v-model:isShow="isDialogShow" title="Rename snippet">
    <template #body>
      <Input
        v-model:value="newName"
        placeholder="New name for folder"
        :focused="renameInputFocused"
      ></Input>
    </template>
    <template #footer>
      <div class="flex items-center justify-end gap-2">
        <Button type="secondary" label="Cancel" @click="onCancelRenameButtonClick"></Button>
        <Button type="primary" label="Apply" @click="onApplyRenameButtonClick"></Button>
      </div>
    </template>
  </Dialog>
</template>
