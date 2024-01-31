<script setup lang="ts">
import { ref, shallowRef, nextTick, reactive } from 'vue'

import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { type ViewUpdate, EditorView } from '@codemirror/view'

import { useClipboard } from '@vueuse/core'

import Box from '@/components/Box.vue'
import Copy24 from '@/components/Icon/Copy24.vue'
import PaintBrush16 from '@renderer/components/Icon/PaintBrush16.vue'
import IconButtonGroup from '@renderer/components/IconButtonGroup.vue'

import GithubDark from '@/theme/GithubDark'

const props = withDefaults(defineProps<{ code?: string; disabled?: boolean }>(), {
  code: 'hi',
  disabled: false
})
const emits = defineEmits<{ 'update:code': [e: string]; format: [] }>()

const { copy } = useClipboard()
const onCopyButtonClick = () => {
  copy(props.code)
}

const onFormatButtonClick = async () => {
  emits('format')
}

const iconButtonOptions = reactive([
  {
    type: 'secondary',
    icon: Copy24,
    action: onCopyButtonClick
  },
  {
    type: 'secondary',
    icon: PaintBrush16,
    action: onFormatButtonClick
  }
])

const extensions = [javascript(), GithubDark, EditorView.lineWrapping]

// Codemirror EditorView instance ref
const view = shallowRef<EditorView>()
const onCodeReady = (payload: { view: any }) => {
  view.value = payload.view

  // ??? why
  setTimeout(() => {
    const newState = getCodemirrorStates()
    console.log('🚀 ~ onCodeReady ~ newState:', newState)
    length.value = newState.length
    lines.value = newState.lines
    loc.value = newState.loc
  }, 1000)
}

const length = ref(0)
const lines = ref(0)
const loc = ref(0)

// Status is available at all times via Codemirror EditorView
const getCodemirrorStates = () => {
  if (!view.value) return { length: 0, lines: 0, loc: 0 }

  const state = view.value.state
  // const ranges = state.selection.ranges
  // const selected = ranges.reduce(
  //   (r: any, range: { to: any; from: number }) => r + range.to - range.from,
  //   0
  // )
  // const cursor = ranges[0].anchor
  const length = state.doc.length
  const lines = state.doc.lines
  const text = (state.doc as any).text as string[]
  const loc = text?.filter((line) => line.length > 0)?.length || 0
  console.log('🚀 ~ getCodemirrorStates ~ loc:', loc)

  return {
    length,
    lines,
    loc
  }
}

const onCodeChange = (value: string, viewUpdate: ViewUpdate) => {
  console.log('🚀 ~ onCodeChange ~ value:', value, viewUpdate.state.doc)
  nextTick(() => {
    const newState = getCodemirrorStates()
    console.log('🚀 ~ nextTick ~ newState:', newState)
    length.value = newState.length
    lines.value = newState.lines
    loc.value = newState.loc
  })
}
</script>
<template>
  <Box>
    <template #header>
      <span class="fira-code dark:text-primer-dark-gray-400 text-xs font-normal"
        >{{ lines }} lines ({{ loc }} loc) · {{ length }} Bytes</span
      >
      <div>
        <IconButtonGroup :options="iconButtonOptions"></IconButtonGroup>
        <!-- <button @click="onCopyButtonClick" class="p-1.5 transition-colors rounded-l-md">
          <Copy24 class="w-4 h-4"></Copy24>
        </button>
        <button
          @click="onFormatButtonClick"
          class="p-1.5 dark:bg-primer-dark-gray-700 border dark:border-primer-dark-gray-0/10 dark:hover:border-primer-dark-gray-200/[0.357] transition-colors dark:hover:bg-primer-dark-gray-600 rounded-r-md"
        >
          <Copy24 class="w-4 h-4 dark:fill-primer-dark-gray-100"></Copy24>
        </button> -->
      </div>
    </template>
    <template #main>
      <codemirror
        :model-value="code"
        @update:model-value="(e) => $emit('update:code', e)"
        placeholder="Code goes here..."
        :style="{ padding: '0.5rem' }"
        :autofocus="true"
        :indent-with-tab="true"
        :tab-size="2"
        :extensions="extensions"
        @ready="onCodeReady"
        @change="onCodeChange"
        :disabled="disabled"
      />
    </template>
  </Box>
</template>

<style>
.cm-editor {
  @apply text-sm font-normal;
}
.cm-line {
  @apply fira-code;
}
</style>
