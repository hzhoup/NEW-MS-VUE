import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router/index.js'
import dayjs from 'dayjs'
import { useVxeTable } from '@/utils/useVxeTable.js'

import './styles/common.scss'
import 'dayjs/locale/zh-cn'
import 'nprogress/nprogress.css'

dayjs.locale('zh-cn')

const app = createApp(App)

app.use(createPinia()).use(router).use(useVxeTable)

app.mount('#app')
