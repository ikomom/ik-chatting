import { defineStore } from 'pinia'
import { UserInfo, login } from '@/apis'
import { showMessage } from '@/utils/message'

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
        this.$router.replace('/')
      }
    },
    // TODO: 后端退出
    async logout(msg?: string) {
      this.$patch({
        userInfo: {},
        token: undefined,
      })

      if (msg)
        showMessage({ content: msg })

      this.$router.replace('/login')
    },
  },
})
