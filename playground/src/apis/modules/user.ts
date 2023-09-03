export function getAllUser() {
  return request({
    url: '/user',
  }).then(res => res.data)
}
export function deleteUser(id: string) {
  return request({
    method: 'delete',
    url: `/user/${id}`,
  })
}
