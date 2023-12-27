<script setup lang="ts">
import { useChatStore } from '@/stores/chat'
import ChatItem from '@/components/ChatItem.vue'

const chatStore = useChatStore()

function onChangeRoom(roomId: string) {
  chatStore.activeRoom = roomId
  chatStore.getRoomMessage({
    roomId,
    page: 1,
    pageSize: 10,
  })
}
</script>

<template>
  <div px-2 py-3>
    <n-scrollbar>
      <ChatItem
        v-for="item in chatStore.rooms"
        :key="item.id"
        :class="[item.id === chatStore.activeRoom ? 'bg-pink' : '']"
        m="b-3"
        cursor-pointer
        select-none
        rounded="2"
        hover="op-80"
        :title="item.roomName"
        :avatar="item.avatar"
        :description="item.description"
        @click="onChangeRoom(item.id)"
      />
    </n-scrollbar>
  </div>
</template>

<style scoped lang="scss">

</style>
