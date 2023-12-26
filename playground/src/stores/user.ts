import { defineStore } from 'pinia'
import { UserInfo, login } from '@/apis'
import { showMessage } from '@/utils/message'
import { sleep } from '@/utils/utils'

export interface UserState {
  userInfo: Record<string, unknown>
  token?: string
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userInfo: {},
    token: undefined,
  }),
  actions: {
    async login(userInfo: UserInfo) {
      const { code, data } = await login(userInfo)
      if (code === 200) {
        this.$patch({
          userInfo: data.user,
          token: data.token as any,
        })
        await this.$router.replace('/')
      }
    },
    // TODO: 后端退出
    async logout(msg = '登出成功') {
      this.$patch({
        userInfo: {},
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
