<script setup lang="ts">
import StatusTabGroup from '@/components/StatusTabGroup.vue'
import FolderTabGroup from '@/components/FolderTabGroup.vue'
import TagTabGroup from '@/components/TagTabGroup.vue'
import Divider from '@/components/Divider.vue'

defineOptions({ name: 'VNav' })
</script>
<template>
  <nav class="p-6 space-y-6 overflow-auto">
    <StatusTabGroup></StatusTabGroup>
    <Divider></Divider>
    <div class="space-y-2.5">
      <span class="dark:text-primer-dark-gray-0 text-sm font-normal fira-code">Folders</span>
      <FolderTabGroup></FolderTabGroup>
    </div>
    <Divider></Divider>
    <div class="space-y-2.5">
      <span class="dark:text-primer-dark-gray-0 text-sm font-normal fira-code">Tags</span>
      <TagTabGroup></TagTabGroup>
    </div>
  </nav>
</template>
