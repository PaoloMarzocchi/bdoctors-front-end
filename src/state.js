import { reactive } from "vue";
import axios from "axios";

export const state = reactive({

    base_url: "http://127.0.0.1:8000",
    doctors_url: "/api/doctors",
    sponsored_url: "/api/sponsoredDoctors",
    send_review_url: "/api/sendReview",
    send_message_url: "/api/contacts",
    user: '',
    doctors: [],

    getDoctors(url) {
        axios.get(url)
            .then(response => {
                //console.log(response.data);
                console.log(response.data.doctors.data);
                this.doctors = response.data.doctors.data;
                // console.log();
            })//add errors and messages
    },
})