import { defineStore } from 'pinia'
import { UserInfo, login } from '@/apis'

export const useUserStore = defineStore('user', {
  state: () => ({
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
        this.$router.push('/')
      }
    },
  },
})
