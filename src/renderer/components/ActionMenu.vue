<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

import { useInjectActionMenu } from '@renderer/hooks/useActionMenu'

import Divider from './Divider.vue'
import ActionMenuItem from './ActionMenuItem.vue'

defineOptions({ name: 'VActionMenu' })

const { actionMenuOptions, isActionMenuOpen, actionMenuPosition, closeActionMenu } =
  useInjectActionMenu()

const menuRef = ref<HTMLElement | null>(null)
onClickOutside(menuRef, () => {
  if (closeActionMenu) closeActionMenu()
})
</script>
<template>
  <Teleport to="body">
    <Transition>
      <ul
        class="rounded-xl dark:bg-primer-dark-gray-800 top-1/2 left-1/2 min-w-48 fixed z-10"
        style="box-shadow: 0px 8px 24px 0px #010409"
        :style="{ top: actionMenuPosition.top + 'px', left: actionMenuPosition.left + 'px' }"
        v-if="isActionMenuOpen"
        ref="menuRef"
      >
        <template v-for="(section, index) in actionMenuOptions" :key="index">
          <ul class="p-2">
            <ActionMenuItem
              v-for="(item, index) in section"
              :key="index"
              v-bind="item"
              @action-execute="closeActionMenu"
            ></ActionMenuItem>
          </ul>
          <Divider
            class="dark:!bg-primer-dark-gray-600/[0.48]"
            v-if="index !== actionMenuOptions.length - 1"
          ></Divider>
        </template>
      </ul>
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
@renderer/hooks/useActionMenu
