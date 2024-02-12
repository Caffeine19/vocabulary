<script setup lang="ts">
defineOptions({ name: 'VButtonGroup' })
</script>
<template>
  <div class="v-button-group">
    <slot></slot>
  </div>
</template>

<style>
.v-button-group .v-icon-button {
  @apply rounded-none;
}

/*
the button will probably be wrapped
by other element like Tooltip or SelectMenu
*/
.v-button-group > :first-child .v-icon-button {
  @apply rounded-l-md;
}

.v-button-group .v-icon-button:first-child {
  @apply rounded-l-md;
}

.v-button-group > :last-child .v-icon-button {
  @apply rounded-r-md;
}

.v-button-group .v-icon-button:last-child {
  @apply rounded-r-md;
}
</style>
