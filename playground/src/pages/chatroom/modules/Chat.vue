<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useChatStore } from '@/stores/chat'

const { activeRoomItem } = storeToRefs(useChatStore())
</script>

<template>
  <div flex="~ col" px-4 py-2>
    <div class="flex-1">
      <div mb-4>
        {{ activeRoomItem.title }}
      </div>
      <div>
        sss
      </div>
    </div>
    <div rounded="2" contenteditable h-20 b-1 p-2>
      <n-scrollbar>1</n-scrollbar>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
