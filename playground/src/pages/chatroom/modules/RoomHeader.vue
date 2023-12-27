<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
  }>(), {
    title: '',
  },
)
</script>

<template>
  <div>{{ title }}</div>
</template>

<style scoped lang="scss">

</style>
