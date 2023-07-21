import { createApp } from 'vue'
import './style.less'
import App from './App.vue'
import router from './router'
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import { createPinia, Pinia } from 'pinia'
const pinia: Pinia = createPinia()

createApp(App)
  .use(ViewUIPlus)
  .use(pinia)
  .use(router)
  .mount('#app')
