<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useChatStore } from '@/stores/chat'
import Messages from '@/pages/chatroom/modules/Messages.vue'
import RoomHeader from '@/pages/chatroom/modules/RoomHeader.vue'
import MessageEditor from '@/pages/chatroom/modules/MessageEditor.vue'

const { activeRoomItem, roomMessageMap } = storeToRefs(useChatStore())
/* const messages = computed(() => {
  return activeRoomItem.value ? (roomMessageMap.value[activeRoomItem.value.id] || []) : []
}) */
</script>

<template>
  <div v-if="activeRoomItem" flex="~ col gap-2" px-4 py-2>
    <RoomHeader :title="activeRoomItem.roomName" />
    <Messages b-1 />
    <MessageEditor b-1 />
  </div>
</template>

<style scoped lang="scss">

</style>
