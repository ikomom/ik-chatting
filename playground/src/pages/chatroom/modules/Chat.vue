<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useChatStore } from '@/stores/chat'

const { activeRoomItem } = storeToRefs(useChatStore())
</script>

<template>
  <div flex="~ col" px-4 py-2>
    <div class="flex-1">
      <div v-if="activeRoomItem" mb-4>
        {{ activeRoomItem.roomName }}
      </div>
      <div>
        sss
      </div>
    </div>
    <n-input type="textarea" :resizable="false" style="--n-color: transparent;--n-color-focus: transparent;" />
  </div>
</template>

<style scoped lang="scss">

</style>
