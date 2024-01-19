<script setup lang="ts">
import { computed, toRefs, type PropType } from 'vue'

import tinycolor from 'tinycolor2'

import Tag16 from '@renderer/components/Icon/Tag16.vue'
import type { Tag } from '@shared/Tag'

defineOptions({ name: 'VTag' })
const props = defineProps({ tag: { type: Object as PropType<Tag>, required: true } })

const { tag } = toRefs(props)

const backgroundColor = computed(() => tinycolor(tag.value.color).setAlpha(0.08).toRgbString())
</script>
<template>
  <div
    class="rounded-full flex items-center space-x-1.5 py-0.5 px-1.5"
    :style="{ background: backgroundColor }"
  >
    <Tag16 class="fill-" :style="{ fill: tag.color }"></Tag16>
    <span class="fira-code text-sm font-normal" :style="{ color: tag.color || '' }"
      >{{ tag.name }}
    </span>
  </div>
</template>
