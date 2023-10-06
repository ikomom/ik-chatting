import axios, { AxiosRequestConfig } from 'axios'
import { showMessage } from '@/utils/message'
import { useUserStore } from '@/stores/user'

const instance = axios.create({
  baseURL: '/api',
  timeout: 30 * 1000,
})

interface Response<T = any> {
  msg?: string
  t: number
  code: number
  data: T
}

instance.interceptors.request.use((request) => {
  const { token } = useUserStore()
  if (token)
    request.headers.Authorization = token

  return request
})

instance.interceptors.response.use((response) => {
  const { data } = response
  if (data.code === 200) {
    return data
  }
  else {
    showMessage({ content: data.msg || '', type: 'error' })
    throw new Error(data.msg)
  }
}, (error) => {
  // console.log('error', error)
  const { data } = error.response
  if (data?.errors)
    showMessage({ content: () => data?.errors.map((msg: string) => h('div', msg)), type: 'error', duration: 1000 })
  else
    showMessage({ content: data.msg || '服务器异常', type: 'error', duration: 1000 })

  return Promise.reject(error)
})

export function request<T>(config: AxiosRequestConfig) {
  return new Promise<Response<T>>((resolve, reject) => {
    instance.request<Response<T>>(config).then((response: any) => resolve(response)).catch(reject)
  })
}
