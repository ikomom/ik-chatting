import { Rooms } from '@/stores/type'

export function getAllRooms() {
  return request<Rooms[]>({
    url: '/rooms',
  }).then(res => res.data)
}

export function deleteRoom(id: string) {
  return request({
    method: 'delete',
    url: `/rooms/${id}`,
  })
}
