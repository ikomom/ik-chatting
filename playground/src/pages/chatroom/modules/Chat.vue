<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useChatStore } from '@/stores/chat'
import Messages from '@/pages/chatroom/modules/Messages.vue'
import RoomHeader from '@/pages/chatroom/modules/RoomHeader.vue'
import MessageEditor from '@/pages/chatroom/modules/MessageEditor.vue'
import { useUserStore } from '@/stores/user'

const { activeRoomItem, roomMessageMap } = storeToRefs(useChatStore())
const { userId } = storeToRefs(useUserStore())
const messages = computed(() => {
  return activeRoomItem.value ? (roomMessageMap.value[activeRoomItem.value.id] || []) : []
})
</script>

<template>
  <div flex="~ col gap-2" px-4 py-2>
    <RoomHeader v-if="activeRoomItem" :title="activeRoomItem.roomName" />
    <Messages b-1 :messages="messages" :user-id="userId" />
    <MessageEditor b-1 />
  </div>
</template>

<style scoped lang="scss">

</style>
