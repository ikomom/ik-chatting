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

export interface UserInfo {
  password: string
  username: string
}

export function register(userInfo: UserInfo) {
  return request({
    method: 'post',
    url: '/auth/register',
    data: userInfo,
  })
}

export interface LoginResponse {
  user: any
  token: string
}

export function login(userInfo: UserInfo) {
  return request<LoginResponse>({
    method: 'post',
    url: '/auth/login',
    data: userInfo,
  })
}
