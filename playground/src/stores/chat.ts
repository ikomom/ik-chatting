import { defineStore } from 'pinia'
import { Socket, io } from 'socket.io-client'
import { useUserStore } from '@/stores/user'
import { Rooms } from '@/stores/type'

export interface ChatState {
  socket?: Socket
  rooms: Rooms[]
  activeRoom: string
}

export const useChatStore = defineStore('chat', {
  state(): ChatState {
    return {
      socket: undefined,
      activeRoom: '1',
      rooms: [
        {
          id: '1',
          roomName: '22xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          avatar: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
          description: '什么都没有',
        },
        {
          id: '2',
          roomName: '22211xx消息',
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
          description: 'ik: 什么都没有',
        },
      ],
    }
  },
  getters: {
    activeRoomItem: (state) => {
      return state.rooms.find(item => item.id === state.activeRoom)
    },
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
