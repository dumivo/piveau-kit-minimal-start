import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { piveauKitPlugin } from '@piveau/sdk-vue'

const app = createApp(App)

app.use(router)
app.use(piveauKitPlugin)

app.mount('#app')
