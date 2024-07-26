<script setup lang="ts">
import { io } from 'socket.io-client'
import { cloneDeep } from 'lodash-es'

const msg = ref('')
const totalUser = ref(0)
const ff = ref({ a: 'b', b: { c: 'd' } })
console.log('cloneDeep', cloneDeep(ff.value), ff.value)
const socket = io('ws://localhost:3888')

socket.on('welcome', (msg) => {
  console.log('hi', msg)
  totalUser.value = msg
})

socket.on('server-res', (...msg) => {
  console.log('server-res', msg)
})

function sendMsg() {
  console.log('msg', msg.value)
  socket.emit('chat-message', msg.value, (...response: any) => {
    console.log(response) // ok
  })
  msg.value = ''
}
</script>

<template>
  <div p-4>
    <div>总人数： {{ totalUser }}</div>

    <n-input-group>
      <n-input v-model:value="msg" />
      <n-button type="primary" @click="sendMsg">
        send
      </n-button>
    </n-input-group>
  </div>
</template>
