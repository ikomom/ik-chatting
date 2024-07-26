import { defineStore } from 'pinia'
import { Socket, io } from 'socket.io-client'
import { useUserStore } from '@/stores/user'
import { ChatMessage, RoomMessages, Rooms } from '@/stores/type'
import { getAllRooms } from '@/apis/modules/room'
import { RoomMessageData, getRoomMessage } from '@/apis/modules/message'

export interface ChatState {
  socket?: Socket
  rooms: Rooms[]
  roomMessageMap: Record<string, RoomMessages[]>
  activeRoom?: string
}

export const useChatStore = defineStore('chat', {
  state(): ChatState {
    return {
      socket: undefined,
      activeRoom: undefined,
      roomMessageMap: {},
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
      if (data.length) {
        const activeRoomId = data[0].id
        this.$patch({
          rooms: data,
          activeRoom: activeRoomId,
        })
        // await this.getRoomMessage({
        //   roomId: activeRoomId,
        //   pageSize: 10,
        //   page: 1,
        // })
      }
    },
    async getRoomMessage(msgData: Omit<RoomMessageData, 'userId'>) {
      const { data } = await getRoomMessage({ ...msgData })
      // this.roomMessageMap[msgData.roomId] = data.list
      return data
    },
    connectSocket() {
      if (this.socket)
        this.socket.disconnect()

      const { userInfo, token, logout } = useUserStore()

      if (userInfo) {
        const { VITE_APP_WS_API_URL } = getEnv()
        const socket = io(VITE_APP_WS_API_URL, {
          reconnection: true,
          query: {
            token,
            userId: userInfo.id,
          },
        })
        socket.onAny((event, ...args) => {
          console.warn('onAny', event, args)
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
      }
    },
    sendMessage(msg: ChatMessage) {
      if (this.socket) {
        this.socket.emit('message', {

        })
      }
    },
  },

})
