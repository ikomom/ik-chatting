import { RoomMessages } from '@/stores/type'

export interface RoomMessageData extends API.Offset {
  roomId: string
}

export function getRoomMessage(data: RoomMessageData) {
  return request<API.List<RoomMessages>>({
    method: 'post',
    url: '/message/roomMessage',
    data,
  })
}
