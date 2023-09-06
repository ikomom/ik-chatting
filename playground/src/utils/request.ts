import axios, { AxiosRequestConfig } from 'axios'
import { showMessage } from '@/utils/message'

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
  if (error.response.data?.message)
    showMessage({ content: () => error.response.data?.message.map((m: string) => h('div', m)), type: 'error' })

  return Promise.reject(error)
})

export function request<T>(config: AxiosRequestConfig) {
  return new Promise<Response<T>>((resolve, reject) => {
    instance.request<Response<T>>(config).then((response: any) => resolve(response)).catch(reject)
  })
}
