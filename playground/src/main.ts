import '@unocss/reset/tailwind.css'
import 'uno.css'
import 'uno:icons.css'

import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'

// tailwind 样式冲突
const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

createApp(App).use(router).mount('#app')
