import { defineStore } from 'pinia'
import { Socket, io } from 'socket.io-client'
import { useUserStore } from '@/stores/user'
import { Rooms } from '@/stores/type'
import { getAllRooms } from '@/apis/modules/room'

export interface ChatState {
  socket?: Socket
  rooms: Rooms[]
  activeRoom?: string
}

export const useChatStore = defineStore('chat', {
  state(): ChatState {
    return {
      socket: undefined,
      activeRoom: undefined,
      rooms: [],
    }
  },
  getters: {
    activeRoomItem: (state): ChatState['rooms'][number] => {
      return state.rooms.find(item => item.id === state.activeRoom) || state.rooms[0]
    },
  },
  actions: {
    async init() {
      const data = await getAllRooms()
      this.$patch({
        rooms: data,
        activeRoom: data[0]?.id,
      })
    },
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
