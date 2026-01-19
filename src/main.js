import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/main.css'

const app = createApp(App)

app.use(router)
app.mount('#app')

// Import auth testing utilities dalam development
if (import.meta.env.DEV) {
  import('./utils/authTesting.js')
}

