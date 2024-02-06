<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

import X16 from './Icon/X16.vue'
import IconButton from './IconButton.vue'
import Divider from './Divider.vue'

defineOptions({ name: 'VDialog' })
const props = defineProps<{ isShow: boolean; title?: string; subtitle?: string }>()
const emits = defineEmits<{ 'update:isShow': [e: boolean] }>()

const onCloseButtonClick = () => {
  console.log('🚀 ~ onCloseButtonClick ~ onCloseButtonClick:')
  // if (!props.isShow) return
  console.log('🚀 ~ onCloseButtonClick ~ onCloseButtonClick:')
  emits('update:isShow', false)
}

const dialogRef = ref<null | HTMLElement>(null)
onClickOutside(dialogRef, () => {
  if (!props.isShow) return
  emits('update:isShow', false)
})
</script>
<template>
  <Teleport to="body">
    <Transition>
      <div
        class="fixed top-0 left-0 z-10 flex items-center justify-center w-screen h-screen dark:bg-primer-dark-black/[0.8]"
        v-if="isShow"
      >
        <div
          class="dark:bg-primer-dark-gray-800 w-80 max-h-64 rounded-lg"
          ref="dialogRef"
          style="box-shadow: rgb(48, 54, 61) 0px 0px 0px 1px"
        >
          <div class="flex items-center justify-between p-2">
            <div class="px-2 py-1.5">
              <span class="fira-code dark:text-primer-dark-gray-0 text-sm font-semibold">{{
                title
              }}</span>
              <span
                class="dark:text-primer-dark-gray-300 fira-code mt-1 text-xs font-bold"
                v-if="subtitle"
                >{{ subtitle }}</span
              >
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
    </Transition>
  </Teleport>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
