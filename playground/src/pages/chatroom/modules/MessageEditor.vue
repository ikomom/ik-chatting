<script setup lang="ts">
import { showMessage } from '@/utils/message'
import { useChatStore } from '@/stores/chat'
import { MessageType } from '@/stores/type'

const sendText = ref('')

const { sendMessage } = useChatStore()

async function onSendText() {
  const text = sendText.value.trim()
  if (!text) {
    showMessage({ content: '不能发送空消息!', type: 'error' })
    return
  }
  if (text.length > 300) {
    showMessage({ content: '消息太长!', type: 'error' })
    return
  }
  showMessage({ content: '不能发送空消息!', type: 'error' })
  sendText.value = ''

  sendMessage({
    type: 'friend',
    message: text,
    messageType: MessageType.text,
  })
}
</script>

<template>
  <div relative>
    <n-input v-model="sendText" type="textarea" show-count :resizable="false" style="--n-text-color:#fff;--n-color: transparent;--n-color-focus: transparent;--n-border:none;--n-border-radius: 0" />
    <n-button
      type="primary"
      size="small"
      class="bottom-2 right-2 absolute! w-20!"
      @click="onSendText"
    >
      发送
    </n-button>
  </div>
</template>

<style scoped lang="scss">
</style>
