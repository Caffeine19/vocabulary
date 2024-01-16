<script setup lang="ts">
type DividerType = 'vertical' | 'horizontal'

defineOptions({ name: 'VDivider' })

withDefaults(defineProps<{ type?: DividerType }>(), { type: 'horizontal' })

const verticalClass = 'w-[1px] border-l'
const horizontalClass = 'h-[1px] border-t'
</script>
<template>
  <div
    :class="
      (type === 'vertical' ? verticalClass : horizontalClass) +
      ' ' +
      'dark:border-primer-dark-gray-600'
    "
  ></div>
</template>
