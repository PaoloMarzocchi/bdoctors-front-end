import { createWebHistory, createRouter } from "vue-router";
import AppHome from './views/AppHome.vue';
import DoctorResults from './views/DoctorResults.vue';
import SingleDoctorProfile from "./views/SingleDoctorProfile.vue";

const router = createRouter({

    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome
        },
        {
            path: '/doctor-results/:name',
            name: 'DoctorResults',
            component: DoctorResults
        },
        {
            path: '/doctor-results',
            name: 'AdvancedResearch',
            component: DoctorResults
        },

        {
            path: '/doctor-profile/:slug',
            name: 'DoctorProfile',
            component: SingleDoctorProfile
        },
    ]

})

export default router;