import { createWebHistory, createRouter } from "vue-router";
import SingleDoctorProfile from "./views/SingleDoctorProfile.vue";



const router = createRouter({

    history: createWebHistory(),
    routes: [

        { path: '/doctor-profile/:id', name: 'DoctorProfile', component: SingleDoctorProfile },

    ]

})


export default router;