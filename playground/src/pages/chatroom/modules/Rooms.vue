<script setup lang="ts">
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()
</script>

<template>
  <div px-2 py-3>
    <n-scrollbar>
      <div
        v-for="item in chatStore.rooms"
        :key="item.id"
        flex="~ gap-3"
        :class="[item.id === chatStore.activeRoom ? 'bg-pink' : '']"
        m="b-3"
        cursor-pointer
        select-none
        px-2
        py-1
        rounded="2"
        hover="op-80"
        @click="chatStore.activeRoom = item.id"
      >
        <n-avatar size="large" flex-shrink-0 :src="item.avatar" />
        <div class="flex-1" truncate>
          <div truncate>
            {{ item.roomName }}
          </div>
          <div truncate op50>
            {{ item.description }}
          </div>
        </div>
      </div>
    </n-scrollbar>
  </div>
</template>

<style scoped lang="scss">

</style>
