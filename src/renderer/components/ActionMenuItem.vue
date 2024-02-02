<script setup lang="ts">
import type { ActionItem } from '@renderer/hooks/useActiveMenu'

import ChevronRight16 from './Icon/ChevronRight16.vue'
import Button from './Button.vue'

defineProps<ActionItem>()
</script>
<template>
  <li class="group relative">
    <Button :label="name" type="invisible" class="w-full">
      <template #leftIcon>
        <component :is="icon" class="dark:fill-primer-dark-gray-300 w-4 h-4"></component>
      </template>
      <template #rightIcon>
        <div class="grow flex items-center justify-end">
          <ChevronRight16
            v-if="children"
            class="dark:fill-primer-dark-gray-300 place-self-end w-4 h-4"
          ></ChevronRight16>
        </div>
      </template>
    </Button>

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
