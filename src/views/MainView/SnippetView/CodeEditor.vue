<script setup lang="ts">
import { onMounted, ref, shallowRef, nextTick } from 'vue'

import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { type ViewUpdate, type EditorView } from '@codemirror/view'
import GithubDark from '@/theme/GithubDark'

import Box from '@/components/Box.vue'
import Copy24 from '@/components/Icon/Copy24'

const code = ref(`console.log('Hello, world!')`)
const extensions = [javascript(), GithubDark]

// Codemirror EditorView instance ref
const view = shallowRef<EditorView>()
const onCodeReady = (payload: { view: any }) => {
  view.value = payload.view

  const newState = getCodemirrorStates()
  length.value = newState.length
  lines.value = newState.lines
  loc.value = newState.loc
}

const length = ref(0)
const lines = ref(0)
const loc = ref(0)

// Status is available at all times via Codemirror EditorView
const getCodemirrorStates = () => {
  if (!view.value) return { length: 0, lines: 0, loc: 0 }

  const state = view.value.state
  const ranges = state.selection.ranges
  const selected = ranges.reduce(
    (r: any, range: { to: any; from: number }) => r + range.to - range.from,
    0
  )
  const cursor = ranges[0].anchor
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
    length.value = newState.length
    lines.value = newState.lines
    loc.value = newState.loc
  })
}

onMounted(() => {
  setTimeout(getCodemirrorStates, 3000)
})
</script>
<template>
  <Box>
    <template #header>
      <span class="fira-code text-xs font-normal dark:text-primer-dark-gray-400"
        >{{ lines }} lines ({{ loc }} loc) · {{ length }} Bytes</span
      >
      <button>
        <Copy24 class="w-4 h-4 dark:fill-primer-dark-gray-400"></Copy24>
      </button>
    </template>
    <template #main>
      <codemirror
        v-model="code"
        placeholder="Code goes here..."
        :style="{ padding: '0.5rem' }"
        :autofocus="true"
        :indent-with-tab="true"
        :tab-size="2"
        :extensions="extensions"
        @ready="onCodeReady"
        @change="onCodeChange"
      />
    </template>
  </Box>
</template>

<style>
.cm-editor {
  @apply fira-code text-sm font-normal;
}
</style>
