<script setup lang="ts">
import Rooms from '@/pages/chatroom/modules/Rooms.vue'
import Chat from '@/pages/chatroom/modules/Chat.vue'
import { useChatStore } from '@/stores/chat'

const chart = useChatStore()
chart.init()
</script>

<template>
  <div
    h-full
    flex items-center justify-center
    class="chat-room"
    text="#fff"
  >
    <div
      rounded="2"
      h-470px flex shadow-lg lg:(w-240)
      class="grass"
    >
      <Rooms w-60 b="r-1" />
      <Chat flex-1 />
    </div>
  </div>
</template>

<style scoped lang="scss">
.chat-room {
  --un-default-border-color: rgba(255, 255, 255, 0.3);
  background: url("https://pic.downk.cc/item/5fc744e1394ac5237897a560.jpg") no-repeat #493A41;
  background-size: cover;
}
.grass {
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(5px);
}
</style>
