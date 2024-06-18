import { createRouter, createWebHistory } from 'vue-router';

import AppHome from './views/AppHome.vue';
import Test from './views/Test.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome
        },
        /* {
            path: '/:name',
            name: 'test',
            component: Test
        }, */
    ]
});
export { router };