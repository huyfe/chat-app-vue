import { createApp } from 'vue'
import App from './App.vue'
import './index.scss'
import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App)

// Set base URL
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL || 'no-process-env';

app.use(router)
app.use(store)
app.use(VueAxios, axios)

app.mount('#app')