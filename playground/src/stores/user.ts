import { defineStore } from 'pinia'
import { UserInfoReq, login } from '@/apis'
import { showMessage } from '@/utils/message'
import { sleep } from '@/utils/utils'
import { UserInfo } from '@/stores/type'

export interface UserState {
  userInfo?: UserInfo
  token?: string
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userInfo: undefined,
    token: undefined,
  }),
  getters: {
    userId(state): string {
      return state.userInfo ? state.userInfo.id : ''
    },
  },
  actions: {
    async login(userInfo: UserInfoReq) {
      const { code, data } = await login(userInfo)
      if (code === 200) {
        this.$patch({
          userInfo: data.user || {},
          token: data.token as any,
        })
        await this.$router.replace('/')
      }
    },
    // TODO: 后端退出
    async logout(msg = '登出成功') {
      this.$patch({
        userInfo: undefined,
        token: undefined,
      })

      if (msg)
        showMessage({ content: msg })

      await sleep(300)
      await this.$router.replace('/login')
    },
  },
  persist: {
    enabled: true,
  },
})
