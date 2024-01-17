<script setup lang="ts">
import Tag16 from '@/components/Icon/Tag16.vue'

export interface TagOption {
  color: string
  background: string
  label: string
}
defineOptions({ name: 'VTag' })
defineProps<TagOption>()
</script>
<template>
  <div
    class="rounded-full flex items-center space-x-1.5 py-0.5 px-1.5 bg-[#3FB950]/10"
    :style="{ background }"
  >
    <Tag16 class="fill-" :style="{ fill: color }"></Tag16>
    <span class="text-[#3FB950] fira-code text-sm font-normal" :style="{ color }">{{ label }}</span>
  </div>
</template>
