import { createWebHistory, createRouter } from "vue-router";
import AppHome from './views/AppHome.vue';
import SingleDoctorProfile from "./views/SingleDoctorProfile.vue";
import ContactMe from "./views/ContactMe.vue";




const router = createRouter({

    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome
        },
        { path: '/doctor-profile/:slug', name: 'DoctorProfile', component: SingleDoctorProfile },
        { path: '/contact-me/:slug', name: 'contact-me', component: ContactMe },


    ]

})


export default router;

