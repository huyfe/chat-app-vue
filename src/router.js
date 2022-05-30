import { createRouter, createWebHistory } from 'vue-router'

// import Home from '@/components/Home.vue'
import BoxChat from '@/components/BoxChat.vue';
import Main from '@/components/Main.vue';
import Error from '@/components/Error.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';

// Import check cookie
import { checkCookie } from './helpers/common';

const routes = [
    {
        name: "Main",
        path: '/',
        component: Main,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'Login',
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/rooms/:slug',
        component: BoxChat,
        meta: {
            requiresAuth: true
        }

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

router.beforeEach(async (to, from) => {
    // canUserAccess() returns `true` or `false`
    const canAccess = await checkCookie();
    console.log(canAccess);
    if (to.meta.requiresAuth && !canAccess) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        return {
            path: '/login',
            // save the location we were at to come back later
            query: { redirect: to.fullPath },
        }
    }

    if (to.name === 'Login' && canAccess) {
        return {
            path: '/',
            // save the location we were at to come back later
        }
    }
})

export default router
