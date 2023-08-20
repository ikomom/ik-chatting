<script setup lang="ts">
import { lightTheme } from 'naive-ui'

const msg = ref('')
</script>

<template>
  <n-config-provider :theme="lightTheme">
    <div p-4>
      <n-input-group>
        <n-input v-model="msg" />
        <n-button type="primary">
          send
        </n-button>
      </n-input-group>
    </div>
  </n-config-provider>
</template>
