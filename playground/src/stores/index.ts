import { createPinia } from 'pinia'
import { router } from '@/router'

export const pinia = createPinia()
pinia.use(({ store }) => {
  store.$router = markRaw(router)
})
