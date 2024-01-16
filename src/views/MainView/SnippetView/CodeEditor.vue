<script setup lang="ts">
import { ref, shallowRef } from 'vue'

import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import GithubDark from '@/theme/GithubDark'

const code = ref(`console.log('Hello, world!')`)
const extensions = [javascript(), GithubDark]

// Codemirror EditorView instance ref
const view = shallowRef()
const handleReady = (payload: { view: any }) => {
  view.value = payload.view
}

// Status is available at all times via Codemirror EditorView
const getCodemirrorStates = () => {
  const state = view.value.state
  const ranges = state.selection.ranges
  const selected = ranges.reduce(
    (r: any, range: { to: any; from: number }) => r + range.to - range.from,
    0
  )
  const cursor = ranges[0].anchor
  const length = state.doc.length
  const lines = state.doc.lines
  // more state info ...
  // return ...
}
</script>
<template>
  <div></div>

  <codemirror
    v-model="code"
    placeholder="Code goes here..."
    :style="{ padding: '0.5rem' }"
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="2"
    :extensions="extensions"
    @ready="handleReady"
  />
</template>

<style>
.cm-editor {
  @apply fira-code text-sm font-normal;
}
</style>
