<script setup lang="ts">
import { ref } from 'vue'

import TagTab from './TagTab.vue'

defineOptions({ name: 'VTagTabGroup' })

const TagList = ref(['vue', 'react', 'go', 'java', 'python', 'scss'])
</script>
<template>
  <ul class="flex flex-col space-y-1 items-stretch">
    <TagTab
      v-for="(Tag, index) in TagList"
      :key="index"
      :label="Tag"
      :selected="index === 2"
    ></TagTab>
  </ul>
</template>
