<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useChatStore } from '@/stores/chat'
import { useUserStore } from '@/stores/user'

const chatStore = useChatStore()
const { userId } = storeToRefs(useUserStore())
const scroll = ref()

function getData(page: API.Offset) {
  console.log('getData', page, chatStore.activeRoom)
  if (chatStore.activeRoom)
    return chatStore.getRoomMessage({ ...page, roomId: chatStore.activeRoom })
}
watch(() => chatStore.activeRoom, (val) => {
  nextTick(() => {
    val && scroll.value.refresh()
  })
}, {
  immediate: true,
})
</script>

<template>
  <VisualScroll ref="scroll" :api="getData">
    <!--    <template #header> -->
    <!--      <div bg-yellow p-1> -->
    <!--        公告 -->
    <!--      </div> -->
    <!--    </template> -->
    <template #item="{ item: msg }">
      <ChatItem
        :key="msg.id"
        :title="msg.username"
        :description="msg.content"
        :avatar="msg.avatar"
        :reverse="userId === msg.userId"
      />
    </template>
  </VisualScroll>
</template>

<style scoped lang="scss">

</style>
