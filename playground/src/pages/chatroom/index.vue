<script setup lang="ts">
import Rooms from '@/pages/chatroom/modules/Rooms.vue'
</script>

<template>
  <div
    h-full
    flex items-center justify-center
  >
    <div
      flex shadow-lg lg:(max-h-800px min-h-470px w-180)
    >
      <Rooms w-40 />
      <div flex-1>
        1
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
