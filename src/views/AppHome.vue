<script>
import { state } from "../state.js";
import axios from "axios";
import DoctorCard from "../components/DoctorCard.vue";

export default {
    name: "AppHome",
    components: {
        DoctorCard
    },
    data() {
        return {
            state,
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
            selectedSpec: null,
            sponsoredDocs: [],
            url: state.base_url + state.sponsored_url,
        };
    },
    methods: {
        goToIndex() {
            console.log(this.selectedSpec);
            this.$router.push({ name: "DoctorResults", params: { name: this.selectedSpec } });
        },
        sponsoredAPI(url) {
            axios
                .get(url)
                .then((response) => {
                    this.sponsoredDocs = response.data.sponsoredDoctors;
                    console.log(this.sponsoredDocs);
                })
                .catch((err) => {
                    console.error(err);
                });
        },
    },
    mounted() {
        const url = this.state.base_url + this.state.sponsored_url;

        this.sponsoredAPI(url);
    },
};
</script>

<template>
    <section class="spec-search p-5 mb-4 bg-secondary border-bottom border-warning">
        <div class="container py-5 d-flex flex-column align-items-center rounded-5">
            <h2 class="text-warning mb-3">Search your doctor by specializations</h2>
            <div class="col-md-8 fs-4 text-center">
                <div class="mb-3">
                    <select class="form-select form-select-lg border border-warning" name="specializations"
                        id="specializations" v-model="selectedSpec">
                        <option selected disabled>Select one</option>
                        <option v-for="(specialization, id) in specializations">
                            {{ specialization.name }}
                        </option>
                    </select>
                </div>
                <button class="btn btn-dark text-warning" @click="goToIndex()">Search</button>
            </div>
        </div>
    </section>

    <section class="sponsored pb-4 text-center">
        <h3 class="text-warning mb-4">Our sponsored doctors</h3>
        <div class="container py-5">
            <div class="row row-cols-auto gap-5 justify-content-center">
                <div class="col" v-for="doc in sponsoredDocs">

                    <DoctorCard :doc="doc"></DoctorCard>

                </div>
            </div>
        </div>
    </section>
</template>

<style></style>
