<script setup lang="tsx">
import type { MenuOption } from 'naive-ui'
import type { RouteRecordRaw } from 'vue-router'
import { RouterLink, useRoute } from 'vue-router'
import { backStageRoute } from '@/router/routes'
import { toggleDark } from '@/utils/utils'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const { logout } = useUserStore()
const selectedKey = ref()

watchEffect(() => {
  selectedKey.value = route.name
})

function toMenuOptions(routes: RouteRecordRaw[], source: MenuOption[]) {
  routes.forEach((route) => {
    if (route.meta) {
      const _item: MenuOption = {
        label: () => <RouterLink to={{ name: route.name }}>{route.meta!.title}</RouterLink>,
        key: route.name as string,
      }
      if (route.children?.length) {
        _item.label = route.meta!.title
        _item.children = []
        toMenuOptions(route.children, _item.children)
        // if (!selectedKey.value)
        //   selectedKey.value = _item.children[0].key
      }
      source.push(_item)
    }
  })
}

const menuOptions: MenuOption[] = []
toMenuOptions(backStageRoute, menuOptions)
</script>

<template>
  <n-layout h-full content-style="display: flex;flex-direction: column">
    <n-layout-header p-4>
      <div class="layout-panel" flex items-center justify-between px-4 py-3>
        BackstageLayout
        <div flex gap-4 text-xl>
          <RouterLink to="/chatroom" i-carbon-chat-bot icon-btn />
          <a
            i-carbon-logo-github icon-btn
            rel="noreferrer"
            href="https://github.com/ikomom/ik-chatting"
            target="_blank"
            title="GitHub"
          />
          <button icon-btn @click="toggleDark()">
            <div dark:i-carbon-moon i-carbon-sun />
          </button>
          <n-popconfirm :show-icon="false" @positive-click="logout()">
            <template #trigger>
              <a i-carbon-close-filled icon-btn hover:color-red />
            </template>
            确认登出?
          </n-popconfirm>
        </div>
      </div>
    </n-layout-header>
    <n-layout has-sider>
      <n-layout-sider content-style="padding: 15px;padding-top: 0">
        <div class="layout-panel">
          <n-menu
            v-model:value="selectedKey"
            :options="menuOptions"
          />
        </div>
      </n-layout-sider>
      <n-layout-content content-style="padding: 0px 15px 15px 0;">
        <router-view class="layout-panel" p-2 />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style scoped lang="scss">
//.n-layout-header,
//.n-layout-footer {
//  background: rgba(128, 128, 128, 0.2);
//  padding: 24px;
//}
.n-layout,
.n-layout-header,
.n-layout-sider {
  //background: rgba(128, 128, 128, 0.1);
  @apply bg-#f1f4fa dark:bg-dark
}

.layout-panel {
  @apply bg-white dark:bg-#121212 rd-1 h-full dark:b-1 shadow-sm overflow-auto
}
</style>
