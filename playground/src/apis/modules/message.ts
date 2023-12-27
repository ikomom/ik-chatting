import { RoomMessages } from '@/stores/type'

export interface RoomMessageData extends API.Offset {
  roomId: string
  userId: string
}

export function getRoomMessage(data: RoomMessageData) {
  return request<RoomMessages[]>({
    method: 'post',
    url: '/message/roomMessage',
    data,
  })
}
