<script setup lang="ts">
import StatusTab, { type StatusTabProps } from './StatusTab.vue'
import Inbox24 from './Icon/Inbox24.vue'
import Trash24 from './Icon/Trash24.vue'
import Archive24 from './Icon/Archive24.vue'
import Heart24 from './Icon/Heart24.vue'

const StatusTabOptions: StatusTabProps[] = [
  {
    icon: Inbox24,
    label: 'Inbox',
    num: 12
  },
  {
    icon: Archive24,
    label: 'All',
    num: 38
  },
  {
    icon: Heart24,
    label: 'Favorite',
    num: 33
  },
  {
    icon: Trash24,
    label: 'Deleted',
    num: 9
  }
]
</script>
<template>
  <ul>
    <StatusTab
      v-for="(tab, index) in StatusTabOptions"
      :key="index"
      :label="tab.label"
      :num="tab.num"
    >
      <template #icon>
        <component :is="tab.icon" class="dark:fill-primer-dark-gray-400"></component>
      </template>
    </StatusTab>
  </ul>
</template>
