<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

import Search16 from '@/components/Icon/Search16.vue'
import Pencil16 from '@/components/Icon/Pencil16.vue'
import SortDesc16 from '@/components/Icon/SortDesc16.vue'
import Input from '@/components/Input.vue'
import Box from '@/components/Box.vue'
import Divider from '@/components/Divider.vue'
import Button from '@/components/Button.vue'
import SnippetItem from '@/components/SnippetItem.vue'

import { useSnippetStore } from '@/stores/snippet'

import { type SnippetItem as ISnippetItem } from '@shared/snippet'

const snippetStore = useSnippetStore()

const { snippetList, snippetDetail } = storeToRefs(snippetStore)

onMounted(async () => {
  await snippetStore.getSnippetList()
})

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

watch(
  () => filteredSnippet.value.length,
  () => {
    const initId = filteredSnippet.value[0]?.id
    if (initId) snippetStore.getSnippetDetail(initId)
  }
)

const onNewSnippetButtonClick = async () => {
  try {
    const res = await snippetStore.createBlankSnippet()
    if (!res?.id) return
    await snippetStore.getSnippetList()
  } catch (error) {
    console.log('🚀 ~ onNewSnippetButtonClick ~ error:', error)
  }
}
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
      <Button label="New Snippet" type="primary" @click="onNewSnippetButtonClick">
        <template #rightIcon="{ iconStyle }">
          <Pencil16 :class="iconStyle"></Pencil16>
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
          <template v-for="snippet in filteredSnippet" :key="snippet.id">
            <SnippetItem
              :snippet-item="snippet"
              @click="onSnippetItemClick(snippet.id)"
              :selected="snippetDetail?.id === snippet.id"
            ></SnippetItem>
            <Divider></Divider>
          </template>
        </ul>
      </template>
    </Box>
  </div>
</template>
