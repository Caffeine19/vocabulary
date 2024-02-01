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
    <FolderTabGroup></FolderTabGroup>
    <Divider></Divider>
    <TagTabGroup></TagTabGroup>
  </nav>
</template>
