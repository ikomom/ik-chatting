import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

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

// instance.interceptors.response.use(r => r, (error) => {})

export function request<T>(config: AxiosRequestConfig) {
  return new Promise<Response<T>>((resolve, reject) => {
    instance.request<Response<T>>(config).then((response: AxiosResponse<Response<T>>) => {
      console.log(response.data)
      const { data } = response
      resolve(data)
    }).catch((error: any) => {
      // 请求失败的处理
      reject(error)
    })
  })
}
