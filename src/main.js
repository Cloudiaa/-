import { createApp } from 'vue'
import App from './App.vue'

import './assets/css/bootstrap.css'
import './index.css'

import axios from 'axios'
// 这个createApp(App)？单页面应用程序的实例（没理解）
const app = createApp(App)
    // 为axios进行全局性配置？没看懂。全局挂载
axios.defaults.baseURL = "https://www.escook.cn"
app.config.globalProperties.$http = axios

// 这个mount是什么
app.mount('#app')