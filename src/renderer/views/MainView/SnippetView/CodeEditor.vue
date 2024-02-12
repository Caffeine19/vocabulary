<script setup lang="ts">
import { ref, shallowRef, nextTick, watch, type Component } from 'vue'

import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { type ViewUpdate, EditorView } from '@codemirror/view'

import { useClipboard } from '@vueuse/core'

import Box from '@/components/Box.vue'
import Copy24 from '@/components/Icon/Copy24.vue'
import PaintBrush16 from '@renderer/components/Icon/PaintBrush16.vue'
import IconButton, {
  calRoundedFromButtonGroup,
  type IconButtonProps
} from '@renderer/components/IconButton.vue'

import GithubDark from '@/theme/GithubDark'
import Tooltip from '@renderer/components/Tooltip.vue'

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

const iconButtonOptions: (Partial<IconButtonProps> & {
  action: () => void
  icon: Component
  tooltip: string
})[] = [
  {
    type: 'secondary',
    icon: Copy24,
    action: onCopyButtonClick,
    tooltip: 'Copy'
  },
  {
    type: 'secondary',
    icon: PaintBrush16,
    action: onFormatButtonClick,
    tooltip: 'Format'
  }
]

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
  // nextTick(() => {
  //   const newState = getCodemirrorStates()
  //   console.log('🚀 ~ nextTick ~ newState:', newState)
  //   length.value = newState.length
  //   lines.value = newState.lines
  //   loc.value = newState.loc
  // })
}

watch(
  () => props.code,
  () => {
    nextTick(() => {
      const newState = getCodemirrorStates()
      console.log('🚀 ~ nextTick ~ newState:', newState)
      length.value = newState.length
      lines.value = newState.lines
      loc.value = newState.loc
    })
  }
)
</script>
<template>
  <Box>
    <template #header>
      <span class="fira-code dark:text-primer-dark-gray-400 text-xs font-normal"
        >{{ lines }} lines ({{ loc }} loc) · {{ length }} Bytes</span
      >
      <div class="flex">
        <Tooltip v-for="(bt, index) in iconButtonOptions" :key="index" :text="bt.tooltip">
          <template #trigger>
            <IconButton
              @click="bt.action"
              :type="bt.type"
              :size="bt.size"
              :rounded="calRoundedFromButtonGroup(index, iconButtonOptions)"
            >
              <template #icon="{ iconStyle }">
                <component :is="bt.icon" :class="iconStyle"></component>
              </template>
            </IconButton>
          </template>
        </Tooltip>
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
