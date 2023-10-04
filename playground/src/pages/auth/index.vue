<script setup lang="ts">
import { FormInst } from 'naive-ui'
import { useUserStore } from '@/stores/user'
import { register } from '@/apis'
import { showMessage } from '@/utils/message'

const activeTab = ref('login')
const formRef = ref<FormInst | null>(null)
const formValue = ref({
  username: 'john',
  password: '123456',
})
const rules = {
  username: {
    required: true,
    message: '请输入姓名',
    trigger: ['input'],
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: ['input'],
  },
}

const user = useUserStore()

const tabs = [
  { label: '登录', name: 'login' },
  { label: '注册', name: 'register' },
]

const activeItem = computed(() => {
  return tabs.find(item => item.name === activeTab.value)
})

function handleValidateClick(e: MouseEvent) {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      if (activeTab.value === 'register') {
        register(formValue.value).then((res) => {
          if (res.code === 200) {
            showMessage({ content: '注册成功，请重新登录' })
            activeTab.value = 'login'
          }
        })
        //
      }
      else {
        user.login(formValue.value).then(() => {
          showMessage({ content: '登录成功', duration: 500 })
        })
      }
    }
  })
}
</script>

<template>
  <div class="login-page" w-full h-full flex="~ col" items-center justify-center>
    <div w-350px bg-white p="x-6 y-3" rounded="3" shadow-lg>
      <n-tabs v-model:value="activeTab" justify-content="space-evenly" mb-4>
        <n-tab-pane v-for="item in tabs" :key="item.name" :name="item.name" :tab="item.label" />
      </n-tabs>
      <n-form
        ref="formRef"
        :label-width="80"
        :model="formValue"
        :rules="rules"
      >
        <n-form-item label="姓名" path="username">
          <n-input v-model:value="formValue.username" placeholder="输入姓名" />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input v-model:value="formValue.password" type="password" placeholder="输入密码" />
        </n-form-item>
        <n-form-item>
          <n-button type="primary" block attr-type="button" @click="handleValidateClick">
            {{ activeItem?.label }}
          </n-button>
        </n-form-item>
      </n-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-page {
  background: url('@/assets/images/bg.png') no-repeat;
  background-size: cover;
}
</style>
