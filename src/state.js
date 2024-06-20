import { reactive } from "vue";
import axios from "axios";

export const state = reactive({

    base_url: "http://127.0.0.1:8000",
    doctors_url: "/api/doctors",
    sponsored_url: "/api/sponsoredDoctors",
    user: '',

    doctors: [],


    getDoctors(url) {
        axios.get(url)
            .then(response => {
                //console.log(response.data);
                //console.log(response.data.doctors.data);
                this.doctors = response.data.doctors.data;
                // console.log();
            })//add errors and messages
    },
})