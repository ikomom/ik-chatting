import nProgress from 'nprogress'

import 'nprogress/nprogress.css' // progress bar style
import { createRouter, createWebHistory } from 'vue-router'
import { ALL_ROUTES } from './routes'
import { useUserStore } from '@/stores/user'

nProgress.configure({ showSpinner: false, trickleSpeed: 200 })

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: ALL_ROUTES,
})
/**
 * 权限控制
 */
// router.beforeResolve(async (to, from) => {
//   // console.log('beforeResolve', to)
//   if (to.meta.forbidden) {
//     const timeout = 1000
//     await new Promise<void>((resolve) => {
//       setTimeout(resolve, timeout)
//     })
//     return false
//   }
//
//   return true
// })

router.beforeEach(async (to, from) => {
  nProgress.start()
  const { token } = useUserStore()
  console.log('beforeEach', { to, from, token })

  if (!token && to.name !== 'Auth')
    return { name: 'Auth' }
})

router.afterEach((to, from, failure) => {
  // console.log('afterEach', { to, from, failure })
  nProgress.done()
})
