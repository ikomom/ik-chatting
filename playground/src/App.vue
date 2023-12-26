<script setup lang="ts">
import { darkTheme, lightTheme, zhCN } from 'naive-ui'
import { MessageRegister } from '@/utils/message'

const theme = computed(() => isDark.value ? darkTheme : lightTheme)
</script>

<template>
  <n-config-provider h-full :theme="theme" :locale="zhCN">
    <n-message-provider>
      <router-view />
      <MessageRegister />
    </n-message-provider>
  </n-config-provider>
</template>

<style>
#app {
  height: 100vh;
}
html.dark {
  background: #121212;
  color: #ffffff;
}

input {
  @apply dark:bg-transparent;
}
</style>
