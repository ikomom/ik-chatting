import { createPinia } from 'pinia'
import PiniaPluginPersist from '@/stores/plugins/persist'
import PiniaRouterPlugin from '@/stores/plugins/router'

export const pinia = createPinia()

pinia
  .use(PiniaPluginPersist)
  .use(PiniaRouterPlugin)
