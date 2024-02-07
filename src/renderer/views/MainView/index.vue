<script setup lang="ts">
import { RouterView } from 'vue-router'

import Divider from '@/components/Divider.vue'

import Nav from './Nav.vue'

defineOptions({ name: 'MainView' })
</script>

<template>
  <Nav class="shrink-0 w-64 overflow-x-hidden"></Nav>
  <Divider type="vertical"></Divider>
  <RouterView></RouterView>
</template>
