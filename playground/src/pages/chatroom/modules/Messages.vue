<script setup lang="ts">
import { RoomMessages } from '@/stores/type'
import { useSearchScroll } from '@/hooks/useSearchScroll'

const props = defineProps<{
  messages: RoomMessages[]
  userId: string
}>()
const scrollbar = ref()
const scrollbarComputed = computed(() => {
  console.log('sss', scrollbar.value)
  return scrollbar.value ? scrollbar.value : null
})
const { isScrolling } = useScroll(scrollbarComputed)

const { x, y } = useSearchScroll('#message-content .n-scrollbar-content')

function onScroll(evt: Event) {
  // console.log(evt.target!)
}
</script>

<template>
  <!--  {{ x }} {{ y }} -->
  <n-scrollbar id="message-content" @scroll="onScroll">
    <ChatItem
      v-for="msg in messages"
      :key="msg.id"
      :title="msg.username"
      :description="msg.content"
      :avatar="msg.avatar"
      :reverse="userId === msg.userId"
    />
  </n-scrollbar>
</template>

<style scoped lang="scss">

</style>
