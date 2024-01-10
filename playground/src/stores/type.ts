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
  content: string
  avatar: string
  username: string
  userId: string
}
// 消息类型
export enum MessageType {
  text = 'text',
  image = 'image',
  file = 'file',
  video = 'video',
}
export interface ChatMessage {
  type: 'friend' | 'group'
  message: string | File
  width?: number
  height?: number
  messageType: MessageType
  size?: number // 附件大小
}
