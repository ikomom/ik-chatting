<script setup lang="ts">
import { darkTheme, lightTheme } from 'naive-ui'

const theme = computed(() => isDark.value ? darkTheme : lightTheme)
</script>

<template>
  <n-config-provider h-full :theme="theme">
    <n-message-provider>
      <router-view />
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
