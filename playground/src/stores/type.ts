export interface BasicType {
  createTime: number
  id: string
}

export interface Rooms extends BasicType {
  avatar: string
  roomName: string
  description: string
}

export interface UserInfo extends BasicType {
  avatar: string
  username: string
  status: string
  tag: string
}

export interface RoomMessages extends BasicType {
  userId: string
  roomId: string
  content: string
}
