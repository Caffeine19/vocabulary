<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useStorage } from '@vueuse/core'

import FolderTree from './FolderTree.vue'
import IconButton from './IconButton.vue'
import Plus16 from './Icon/Plus16.vue'
import Trashcan16 from './Icon/Trashcan16.vue'
import Fold16 from './Icon/Fold16.vue'
import Unfold16 from './Icon/Unfold16.vue'
import ArrowDown16 from './Icon/ArrowDown16.vue'
import ArrowLeft16 from './Icon/ArrowLeft16.vue'
import Pencil16 from './Icon/Pencil16.vue'
import Dialog from './Dialog.vue'
import Button from './Button.vue'
import Input from './Input.vue'

import { useFolderStore } from '@renderer/stores/folder'
import { useSnippetStore } from '@renderer/stores/snippet'
import { useTagStore } from '@renderer/stores/tag'

import { FolderItem, Folder } from '@shared/folder'

import { useInjectActionMenu } from '@renderer/hooks/useActiveMenu'

defineOptions({ name: 'VFolderTabGroup' })

const folderStore = useFolderStore()
const { folderList, selectedFolderId } = storeToRefs(folderStore)
onMounted(() => {
  folderStore.getFolderList()
})

const snippetStore = useSnippetStore()
const { selectedStatus } = storeToRefs(snippetStore)

const tagStore = useTagStore()

const onFolderClick = (folder: FolderNode) => {
  folderStore.setSelectedFolder(folder)
  selectedStatus.value = 'all'
  tagStore.unsetSelectedTag()
}

export type FolderNode = FolderItem & { children: FolderNode[] | null }

// 递归转换为树形结构
function buildFolderTree(
  folders: FolderItem[],
  parentId: FolderItem['parentId'] = null
): FolderNode[] | null {
  const children: FolderNode[] = folders
    .filter((folder) => folder.parentId === parentId)
    .map((folder) => ({
      ...folder,
      children: buildFolderTree(folders, folder.id)
    }))

  return children.length > 0 ? children : null
}

// 构建树形结构
const folderTree = computed(() => buildFolderTree(folderList.value))
console.log('🚀 ~ folderTree:', folderTree)

const openedFolderList = useStorage<Folder['id'][]>('openedFolderList', [])
const openFolder = (id: Folder['id']) => {
  openedFolderList.value.push(id)
}
const closeFolder = (id: Folder['id']) => {
  openedFolderList.value = openedFolderList.value.filter((f) => f !== id)
}

const onCreateButtonClick = async (parentId: FolderItem['parentId']) => {
  console.log('🚀 ~ onCreateButtonClick ~ parentId:', parentId)
  try {
    await folderStore.createBlankFolder({ parentId })
    folderStore.getFolderList()
  } catch (error) {
    console.log('🚀 ~ onCreateButtonClick ~ error:', error)
  }
}

const onDeleteButtonClick = async () => {
  if (!rightClickedFolder.value) return
  try {
    await folderStore.deleteFolder(rightClickedFolder.value.id)
    folderStore.getFolderList()
    snippetStore.getStatusSnippetCount()
  } catch (error) {
    console.log('🚀 ~ onDeleteButtonClick ~ error:', error)
  }
}

const onRenameButtonClick = async () => {
  isDialogShow.value = true
}

const { openActionMenu } = useInjectActionMenu()
const actionMenuOptions = [
  [
    {
      name: 'Create',
      action: () => console.log('hi'),
      icon: Plus16,
      children: [
        {
          name: 'Create inside',
          action: () => onCreateButtonClick(rightClickedFolder.value?.id || null),
          icon: ArrowLeft16
        },
        {
          name: 'Create below',
          action: () => onCreateButtonClick(null),
          icon: ArrowDown16
        }
      ]
    },
    {
      name: 'Rename',
      action: onRenameButtonClick,
      icon: Pencil16
    }
  ],
  [
    {
      name: 'Collapse all',
      action: () => console.log('hi'),
      icon: Unfold16
    },
    {
      name: 'Expand all',
      action: () => console.log('hi'),
      icon: Fold16
    }
  ],
  [
    {
      name: 'Delete folder',
      action: onDeleteButtonClick,
      icon: Trashcan16
    }
  ]
]

const rightClickedFolder = ref<FolderItem>()
const onFolderItemRightClick = (folderItem: FolderItem, e: MouseEvent) => {
  rightClickedFolder.value = folderItem

  if (!openActionMenu) return
  openActionMenu(actionMenuOptions, e)
}

const isDialogShow = ref(false)

const newName = ref('')
</script>
<template>
  <div class="space-y-2.5">
    <div class="flex items-center justify-between">
      <span class="dark:text-primer-dark-gray-0 fira-code text-sm font-normal">Folders</span>
      <IconButton type="invisible" @click="() => onCreateButtonClick(null)">
        <template #icon="{ iconStyle }">
          <Plus16 :class="iconStyle"></Plus16>
        </template>
      </IconButton>
    </div>
    <ul class="flex flex-col items-stretch space-y-1">
      <FolderTree
        v-for="folder in folderTree"
        :folder-node="folder"
        :key="folder.id"
        @click-folder-node="(folderNode) => onFolderClick(folderNode)"
        @right-click-folder-node="(folderNode, e) => onFolderItemRightClick(folderNode, e)"
        :selected-folder-id="selectedFolderId"
        :opened-folder-list="openedFolderList"
      ></FolderTree>
      <!-- <FolderTab
      v-for="folder in folderTree"
      :key="folder.id"
      :label="folder.name"
      :selected="folder.id === selectedFolderId"
      @click="onFolderClick(folder)"
    >
      <ul v-if="folder.children" class="pl-4">
        <FolderTab
          v-for="childFolder in folder.children"
          :key="childFolder.id"
          :label="childFolder.name"
          :selected="childFolder.id === selectedFolderId"
          @click="onFolderClick(childFolder)"
        ></FolderTab>
      </ul>
    </FolderTab> -->
    </ul>
  </div>
  <Dialog v-model:isShow="isDialogShow" title="Rename folder">
    <template #body>
      <Input v-model:value="newName" placeholder="New name for folder"></Input>
    </template>
    <template #footer>
      <div class="flex items-center justify-end gap-2">
        <Button type="secondary" label="Cancel"></Button>
        <Button type="primary" label="Apply"></Button>
      </div>
    </template>
  </Dialog>
</template>
