<script setup lang="ts">
import { ref } from 'vue'

import FolderTab from './FolderTab.vue'

defineOptions({ name: 'VFolderTabGroup' })

const folderList = ref(['react-native', 'electron', 'echarts', 'vue3', 'vue2', 'dayjs'])
</script>
<template>
  <ul class="flex flex-col space-y-1 items-stretch">
    <FolderTab
      v-for="(folder, index) in folderList"
      :key="index"
      :label="folder"
      :selected="index === 2"
    ></FolderTab>
  </ul>
</template>
