<script setup lang="ts">
import type { ActionItem } from '@renderer/hooks/useActiveMenu'

import ChevronRight16 from './Icon/ChevronRight16.vue'
import Button from './Button.vue'

defineProps<ActionItem>()
</script>
<template>
  <li class="group relative">
    <div
      class="flex items-center py-1.5 px-2 rounded-md bg-transparent transition-colors dark:hover:bg-primer-dark-gray-200/[0.12] cursor-pointer justify-between space-x-2"
    >
      <Button :label="name">
        <template #leftIcon="{ iconStyle }">
          <component :is="icon" class="dark:fill-primer-dark-gray-300 w-4 h-4"></component>
        </template>
        <template #rightIcon="{ iconStyle }">
          <ChevronRight16
            v-if="children"
            class="dark:fill-primer-dark-gray-300 w-4 h-4"
          ></ChevronRight16
        ></template>
      </Button>
    </div>
    <ul
      v-if="children"
      class="rounded-xl dark:bg-primer-dark-gray-800 min-w-48 left-full group-hover:block absolute top-0 z-20 hidden p-2"
      style="box-shadow: 0px 8px 24px 0px #010409"
    >
      <ActionMenuItem v-for="(childItem, index) in children" :key="index" v-bind="childItem">
      </ActionMenuItem>
    </ul>
  </li>
</template>
