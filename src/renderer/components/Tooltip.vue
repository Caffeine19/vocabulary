<script setup lang="ts">
import { nextTick } from 'process'
import { reactive, ref, watch } from 'vue'

defineProps<{ text: string }>()
defineOptions({ name: 'VTooltip' })

const triggerRef = ref<null | HTMLElement>(null)

const isShow = ref(false)
const tooltipPosition = reactive({ top: 0, left: 0 })
const groupRef = ref<null | HTMLElement>(null)

watch(isShow, (newVal) => {
  if (newVal) {
    nextTick(() => {
      if (triggerRef.value) {
        const triggerRect = triggerRef.value.getBoundingClientRect()

        tooltipPosition.left = triggerRect.left
      }
    })
  }
})
</script>
<template>
  <div ref="groupRef" @mouseenter="isShow = true" @mouseleave="isShow = false">
    <div class="" ref="triggerRef">
      <slot name="trigger"></slot>
    </div>
    <div
      class="dark:bg-primer-dark-gray-400 dark:text-primer-dark-white fira-code group-hover:flex fixed z-10 items-center justify-center px-2 py-1 text-sm rounded-md"
      :style="{ top: tooltipPosition.top + 'px', left: tooltipPosition.left + 'px' }"
      v-show="isShow"
    >
      <span>{{ text }}</span>
    </div>
  </div>
</template>
