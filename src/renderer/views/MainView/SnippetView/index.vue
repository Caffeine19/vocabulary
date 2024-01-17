<script setup lang="ts">
import SnippetDetail from './SnippetDetailView.vue'
import SnippetList from './SnippetListView.vue'

defineOptions({ name: 'SnippetView' })
</script>
<template>
  <div class="flex grow">
    <SnippetList></SnippetList>
    <SnippetDetail></SnippetDetail>
  </div>
</template>
