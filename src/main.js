import { createApp } from 'vue'
import App from './App.vue'
import './index.scss'
import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'

import Notifications from '@kyvg/vue3-notification'

import { getCookie } from './helpers/common';

import VueSocketIO from 'vue-3-socket.io'
import SocketIO from 'socket.io-client'


const app = createApp(App)

// Set base URL
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL || 'no-process-env';

// Attach Authorization header for all axios requests 
const token = getCookie("token");
axios.defaults.headers.common['auth-token'] = token;

app.use(store)
app.use(router)
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)  // provide 'axios'
app.use(Notifications)

app.use(new VueSocketIO({
    debug: true,
    connection: SocketIO('http://localhost:3000'),
    vuex: {
        store,
        actionPrefix: "SOCKET_",
        mutationPrefix: "SOCKET_"
    }
})
);

app.mount('#app')