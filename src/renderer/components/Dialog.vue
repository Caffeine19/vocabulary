<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

import X16 from './Icon/X16.vue'
import IconButton from './IconButton.vue'
import Divider from './Divider.vue'

defineOptions({ name: 'VDialog' })
const props = defineProps<{ isShow: boolean; title?: string; subtitle?: string }>()
const emits = defineEmits<{ 'update:show': [e: boolean] }>()

const onCloseButtonClick = () => {
  if (!props.isShow) return
  emits('update:show', false)
}

const dialogRef = ref<null | HTMLElement>(null)
onClickOutside(dialogRef, () => emits('update:show', false))
</script>
<template>
  <Teleport to="body">
    <div
      class="fixed top-0 left-0 z-10 flex items-center justify-center w-screen h-screen dark:bg-primer-dark-black/[0.8]"
      v-if="isShow"
    >
      <div class="dark:bg-primer-dark-gray-700 w-80 max-h-64 rounded-lg" ref="dialogRef">
        <div class="flex items-center justify-between p-2">
          <div class="px-2 py-1.5">
            <span class="fira-code text-sm font-normal">{{ title }}</span>
            <span>{{ subtitle }}</span>
          </div>
          <IconButton @click="onCloseButtonClick" type="invisible">
            <template #icon="{ iconStyle }"><X16 :class="iconStyle"></X16></template>
          </IconButton>
        </div>
        <Divider></Divider>
        <div class="p-4">
          <slot name="body"></slot>
        </div>
        <Divider></Divider>
        <div class="p-4">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>
