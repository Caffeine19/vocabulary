<script setup lang="ts">
import type { Component } from 'vue'
import IconButton, { type IconButtonOption } from './IconButton.vue'

defineProps<{ options: IconButtonOption & { action: () => void; icon: Component }[] }>()
</script>

<template>
  <IconButton
    v-for="(bt, index) in options"
    :key="index"
    v-bind="bt"
    @click="bt.action"
    class="first:!rounded-l-md last:!rounded-r-md !rounded-none"
  >
    <template #icon="{ iconStyle }">
      <component :is="bt.icon" :class="iconStyle"></component>
    </template>
  </IconButton>
</template>
