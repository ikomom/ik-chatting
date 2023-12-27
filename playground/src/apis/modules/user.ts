import { UserInfo } from '@/stores/type'

export async function getAllUser() {
  const res = await request({
    url: '/user',
  })
  return res.data
}
export function deleteUser(id: string) {
  return request({
    method: 'delete',
    url: `/user/${id}`,
  })
}

export interface UserInfoReq {
  password: string
  username: string
}

export function register(userInfo: UserInfoReq) {
  return request({
    method: 'post',
    url: '/auth/register',
    data: userInfo,
  })
}

export interface LoginResponse {
  user: UserInfo
  token: string
}

export function login(userInfo: UserInfoReq) {
  return request<LoginResponse>({
    method: 'post',
    url: '/auth/login',
    data: userInfo,
  })
}
