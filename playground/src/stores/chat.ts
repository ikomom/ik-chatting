import { defineStore } from 'pinia'
import { Socket, io } from 'socket.io-client'
import { useUserStore } from '@/stores/user'

export interface ChatState {
  socket?: Socket
}

export const useChatStore = defineStore('user', {
  state(): ChatState {
    return {
      socket: undefined,
    }
  },
  actions: {
    connectSocket() {
      if (this.socket)
        this.socket.disconnect()

      const { userInfo, token, logout } = useUserStore()
      const { VITE_APP_WS_API_URL } = getEnv()
      const socket = io(VITE_APP_WS_API_URL, {
        reconnection: true,
        query: {
          token,
          userId: userInfo.id,
        },
      })
      socket.on('unauthorized', (msg: string) => {
        logout(msg)
      })
      socket.on('connect', async () => {
        console.log('连接成功')
        // 获取聊天室所需所有信息
        socket.emit('chatData', token)
        // 先保存好socket对象
        this.$patch({ socket })
      })
    },
  },
})
