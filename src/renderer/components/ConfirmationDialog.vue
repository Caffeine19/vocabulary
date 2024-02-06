<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

import { useInjectConfirmation } from '@renderer/hooks/useConfirmation'

import Button from './Button.vue'
import X16 from './Icon/X16.vue'
import IconButton from './IconButton.vue'

defineOptions({ name: 'VConfirmationDialog' })

const { isConfirmationOpen, confirmationOptions, closeConfirmation } = useInjectConfirmation()

const onCloseButtonClick = () => {
  closeConfirmation()
}

const dialogRef = ref<null | HTMLElement>(null)
onClickOutside(dialogRef, () => {
  if (!isConfirmationOpen.value) return
  closeConfirmation()
})
</script>
<template>
  <Teleport to="body">
    <Transition>
      <div
        class="fixed top-0 left-0 z-10 flex items-center justify-center w-screen h-screen dark:bg-primer-dark-black/[0.8]"
        v-if="isConfirmationOpen"
      >
        <div
          class="dark:bg-primer-dark-gray-800 rounded-lg"
          ref="dialogRef"
          style="box-shadow: rgb(48, 54, 61) 0px 0px 0px 1px"
        >
          <div class="flex items-start justify-between p-2">
            <div class="px-2 py-1.5">
              <span class="fira-code dark:text-primer-dark-gray-0 text-xl font-semibold">
                {{ confirmationOptions?.title }}
              </span>
            </div>
            <IconButton @click="onCloseButtonClick" type="invisible">
              <template #icon="{ iconStyle }">
                <X16 :class="iconStyle"></X16>
              </template>
            </IconButton>
          </div>
          <div class="p-4 pt-0">
            <span class="fira-code dark:text-primer-dark-gray-300 text-sm font-normal">{{
              confirmationOptions?.description
            }}</span>
          </div>
          <div class="p-4 pt-1">
            <div class="flex items-center justify-end gap-2">
              <Button
                type="secondary"
                label="Cancel"
                @click="
                  () => {
                    confirmationOptions?.onCancel?.()
                    closeConfirmation()
                  }
                "
              ></Button>
              <Button
                :type="confirmationOptions?.confirmButtonType || 'danger'"
                label="Delete"
                @click="
                  () => {
                    confirmationOptions?.onConfirm?.()
                    closeConfirmation()
                  }
                "
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
