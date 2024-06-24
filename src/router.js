import { createWebHistory, createRouter } from "vue-router";
import AppHome from './views/AppHome.vue';
import DoctorResults from './views/DoctorResults.vue';
import SingleDoctorProfile from "./views/SingleDoctorProfile.vue";
import VoteDoctor from './views/VoteDoctor.vue';

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
            path: '/doctor-profile/:slug',
            name: 'DoctorProfile',
            component: SingleDoctorProfile
        },
        {
            path: '/vote-doctor/:slug',
            name: 'vote-doctor',
            component: VoteDoctor
        },
    ]

})

export default router;