<script setup lang="ts">
import { reactive, ref, watch, nextTick, computed } from 'vue'

import X16 from './Icon/X16.vue'
import Search16 from './Icon/Search16.vue'
import Input from './Input.vue'

defineOptions({ name: 'VSelectMenu' })

const props = defineProps<{
  title: string
  isShow: boolean
  options: any[]
}>()

defineEmits<{ 'update:isShow': [e: boolean]; select: [e: any] }>()

const position = reactive({
  top: 0,
  left: 0
})

const topGap = 20

const triggerWrapRef = ref<HTMLElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)

watch(
  () => props.isShow,
  (newVal) => {
    if (!newVal) return
    nextTick(() => {
      if (triggerWrapRef.value && menuRef.value) {
        const triggerRect = triggerWrapRef.value.getBoundingClientRect()
        console.log(
          '🚀 ~ triggerRect:',
          triggerRect,
          menuRef.value.clientHeight,
          menuRef.value.clientWidth,
          window.innerHeight,
          window.innerWidth
        )

        let newLeft = triggerRect.left
        if (newLeft + menuRef.value.clientWidth > window.innerWidth - 50) {
          newLeft = triggerRect.right - menuRef.value.clientWidth
        }
        position.left = newLeft

        let newTop = triggerRect.bottom
        if (newTop + menuRef.value.clientHeight > window.innerHeight - 50) {
          newTop = triggerRect.top - menuRef.value.clientHeight - topGap
        }
        position.top = newTop
      }
    })
  }
)

const keyWord = ref('')

const filteredOptions = computed(() => {
  return props.options.filter((o) => o.name.toLowerCase().includes(keyWord.value.toLowerCase()))
})
</script>
<template>
  <div ref="triggerWrapRef" class="flex items-center justify-center">
    <slot name="trigger"></slot>
  </div>
  <Teleport to="body">
    <Transition>
      <div
        class="flex flex-col rounded-xl dark:bg-primer-dark-gray-800 fixed z-10 border dark:border-primer-dark-gray-600 overflow-clip"
        style="box-shadow: 0px 8px 24px 0px #010409"
        :style="{ top: position.top + 'px', left: position.left + 'px' }"
        v-show="isShow"
        ref="menuRef"
      >
        <div class="flex justify-between p-2 border-b dark:border-primer-dark-gray-700">
          <span class="dark:text-primer-dark-gray-0 font-semibold fira-code text-xs">
            {{ title }}</span
          >
          <button @click="$emit('update:isShow', false)" class="group">
            <X16
              class="dark:fill-primer-dark-gray-400 group-hover:dark:fill-primer-dark-gray-0"
            ></X16>
          </button>
        </div>
        <div class="flex flex-col">
          <div class="p-2 dark:border-primer-dark-gray-700 border-b">
            <Input v-model:value="keyWord" placeholder="Search Tags">
              <template #icon>
                <Search16
                  class="absolute top-1/2 -translate-y-1/2 left-2.5 dark:fill-primer-dark-gray-400"
                ></Search16> </template
            ></Input>
          </div>
          <ul>
            <li
              class="px-4 py-2 border-b dark:border-primer-dark-gray-700 dark:bg-primer-dark-gray-800 dark:hover:bg-primer-dark-gray-400/10 transition-colors last:border-b-0 cursor-pointer"
              v-for="(option, index) in filteredOptions"
              :key="index"
              @click="$emit('select', option)"
            >
              <slot name="menuItem" :option="option"> </slot>
            </li>
          </ul>
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
