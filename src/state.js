import { reactive } from "vue";
import axios from "axios";

export const state = reactive({

    base_url: "http://127.0.0.1:8000",
    doctors_url: "/api/doctors",
    sponsored_url: "/api/sponsoredDoctors",
    send_review_url: "/api/sendReview",
    user: '',
    doctors: [],
    specializations: [
        {
            name: "Allergology",
            description:
                "The branch that deals with the effects of seasonal, contact, and medication allergies",
        },
        {
            name: "Cardiology",
            description:
                "The branch that deals with the heart and everything related to it",
        },
        {
            name: "Dermatology",
            description: "The branch that takes care of people's skin",
        },
        {
            name: "Surgery",
            description:
                "This is the most famous field of medical science, where everything converges on the practical level to save lives",
        },
        {
            name: "Gastroenterology",
            description: "Those doctors to turn to when gastrointestinal problems arise",
        },
        {
            name: "Occupational Medicine",
            description:
                "It is the branch of medicine that deals with the prevention, diagnosis, and treatment of diseases caused by work activities.",
        },
        {
            name: "Urology",
            description:
                "The medical and surgical specialty that deals with diseases of the male and female urinary tract and the male external genital organs.",
        },
    ],


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