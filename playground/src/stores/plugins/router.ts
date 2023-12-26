import { PiniaPluginContext } from 'pinia'
import type { Router } from 'vue-router'
import { router } from '@/router'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    $router: Router
  }
}

function PiniaRouterPlugin({ store }: PiniaPluginContext) {
  store.$router = markRaw(router)
}

export default PiniaRouterPlugin
