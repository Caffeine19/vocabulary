<script setup lang="ts">
import { reactive, ref, watch, nextTick } from 'vue'
import { onClickOutside } from '@vueuse/core'

import X16 from './Icon/X16.vue'
// import Search16 from './Icon/Search16.vue'
// import Input from './Input.vue'

defineOptions({ name: 'VSelectMenu' })

const props = withDefaults(
  defineProps<{
    title: string
    isShow: boolean
    optionsSeries: any[][]
    searchable?: boolean
  }>(),
  {
    searchable: true
  }
)

const emits = defineEmits<{
  'update:isShow': [e: boolean]
  select: [option: any, seriesIndex: number]
  closeButtonClick: []
  clickOutside: []
}>()

const position = reactive({
  top: 0,
  left: 0
})

const topGap = 20

const triggerWrapRef = ref<HTMLElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)

onClickOutside(menuRef, () => {
  console.log('🚀 ~ onClickOutside ~ menuRef:', menuRef)
  emits('update:isShow', false)
  emits('clickOutside')
})

watch(
  () => props.isShow,
  (newVal) => {
    if (!newVal) return
    nextTick(() => {
      if (triggerWrapRef.value && menuRef.value) {
        const triggerRect = triggerWrapRef.value.getBoundingClientRect()
        // console.log(
        //   '🚀 ~ triggerRect:',
        //   triggerRect,
        //   menuRef.value.clientHeight,
        //   menuRef.value.clientWidth,
        //   window.innerHeight,
        //   window.innerWidth
        // )

        let newLeft = 0
        if (triggerRect.left + menuRef.value.clientWidth > window.innerWidth - 50) {
          newLeft = triggerRect.width - menuRef.value.clientWidth
        }
        position.left = newLeft

        let newTop = triggerRect.height + topGap
        if (triggerRect.bottom + menuRef.value.clientHeight > window.innerHeight - 50) {
          newTop = -(menuRef.value.clientHeight + topGap)
        }
        position.top = newTop
      }
    })
  }
)
</script>
<template>
  <div class="relative">
    <div ref="triggerWrapRef" class="flex items-center justify-center">
      <slot name="trigger"></slot>
    </div>

    <Transition>
      <div
        class="flex flex-col rounded-xl dark:bg-primer-dark-gray-800 absolute z-10 border dark:border-primer-dark-gray-600 overflow-clip"
        style="box-shadow: 0px 8px 24px 0px #010409"
        :style="{ top: position.top + 'px', left: position.left + 'px' }"
        v-show="isShow"
        ref="menuRef"
      >
        <div class="flex justify-between p-2 border-b dark:border-primer-dark-gray-700">
          <span class="dark:text-primer-dark-gray-0 font-semibold fira-code text-xs">
            {{ title }}</span
          >
          <button
            @click="
              () => {
                $emit('update:isShow', false)
                $emit('closeButtonClick')
              }
            "
            class="group"
          >
            <X16
              class="dark:fill-primer-dark-gray-400 group-hover:dark:fill-primer-dark-gray-0"
            ></X16>
          </button>
        </div>
        <div class="flex">
          <!-- no-input-for-search -->
          <!-- <div class="p-2 dark:border-primer-dark-gray-700 border-b" v-if="searchable">
            <Input v-model:value="keyWord" placeholder="Search Tags" class="min-w-48">
              <template #icon>
                <Search16
                  class="absolute top-1/2 -translate-y-1/2 left-2.5 dark:fill-primer-dark-gray-400"
                ></Search16> </template
            ></Input>
          </div> -->
          <ul
            v-for="(series, seriesIndex) in optionsSeries"
            :key="seriesIndex"
            class="first:border-r dark:border-primer-dark-gray-700"
          >
            <li
              class="px-4 py-2 dark:bg-primer-dark-gray-800 dark:hover:bg-primer-dark-gray-400/10 transition-colors cursor-pointer"
              v-for="(option, index) in series"
              :key="index"
              @click="$emit('select', option, seriesIndex)"
            >
              <slot name="menuItem" :option="option" :seriesIndex="seriesIndex"> </slot>
            </li>
          </ul>
        </div>
        <div class="border-t dark:border-primer-dark-gray-700 p-3">
          <slot name="footer"></slot>
        </div>
      </div>
    </Transition>
  </div>
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
