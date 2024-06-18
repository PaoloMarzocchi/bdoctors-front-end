import { createWebHistory, createRouter } from "vue-router";
import AppHome from './views/AppHome.vue';
import SingleDoctorProfile from "./views/SingleDoctorProfile.vue";



const router = createRouter({

    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome
        },
        { path: '/doctor-profile/:id', name: 'DoctorProfile', component: SingleDoctorProfile },

    ]

})


export default router;

