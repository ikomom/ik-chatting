<script setup lang="ts">
import { RoomMessages } from '@/stores/type'

const props = defineProps<{
  messages: RoomMessages[]
  userId: string
}>()

function onScroll(evt: Event) {
  console.log(evt)
}
</script>

<template>
  <n-scrollbar @scroll="onScroll">
    <ChatItem
      v-for="msg in messages"
      :key="msg.id"
      :title="msg.userId"
      :description="msg.content"
      :avatar="msg.userId"
      :reverse="userId === msg.userId"
    />
  </n-scrollbar>
</template>

<style scoped lang="scss">

</style>
