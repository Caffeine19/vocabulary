<script setup lang="ts">
import type { PropType } from 'vue'

import Tag16 from '@renderer/components/Icon/Tag16.vue'
import type { Tag } from '@shared/Tag'

defineOptions({ name: 'VTag' })
defineProps({ tag: { type: Object as PropType<Tag>, required: true } })
</script>
<template>
  <div
    class="rounded-full flex items-center space-x-1.5 py-0.5 px-1.5 bg-[#3FB950]/10"
    :style="{ background: tag.color || '' }"
  >
    <Tag16 class="fill-" :style="{ fill: tag.color }"></Tag16>
    <span
      class="text-[#3FB950] fira-code text-sm font-normal"
      :style="{ color: tag.color || '' }"
      >{{ tag.name }}</span
    >
  </div>
</template>
