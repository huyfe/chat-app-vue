import { createRouter, createWebHistory } from 'vue-router'

// import Home from '@/components/Home.vue'
import Messenger from '@/components/Messenger.vue';
import Main from '@/components/Main.vue';
import Error from '@/components/Error.vue';

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/messenger/:name',
        component: Messenger
    },
    {
        path: '/:catchAll(.*)',
        component: Error
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router
