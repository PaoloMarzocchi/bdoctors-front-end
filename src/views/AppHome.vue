<script>
import { state } from '../state.js';
import axios from 'axios';

export default {
    name: 'AppHome',
    data() {
        return {
            state,
            specializations: [
                {
                    'name': 'Allergology',
                    'description': 'The branch that deals with the effects of seasonal, contact, and medication allergies'
                },
                {
                    'name': 'Cardiology',
                    'description': 'The branch that deals with the heart and everything related to it'
                },
                {
                    'name': 'Dermatology',
                    'description': "The branch that takes care of people's skin"
                },
                {
                    'name': 'Surgery',
                    'description': 'This is the most famous field of medical science, where everything converges on the practical level to save lives'
                },
                {
                    'name': 'Gastroenterology',
                    'description': 'Those doctors to turn to when gastrointestinal problems arise'
                },
                {
                    'name': 'Occupational Medicine',
                    'description': 'It is the branch of medicine that deals with the prevention, diagnosis, and treatment of diseases caused by work activities.'
                },
                {
                    'name': 'Urology',
                    'description': 'The medical and surgical specialty that deals with diseases of the male and female urinary tract and the male external genital organs.'
                }
            ],
            selectedSpec: null,
            sponsoredDocs: [],
            url: state.base_url + state.sponsored_url,
        }
    },
    methods: {
        goToIndex() {
            //console.log(this.selectedSpec);
            this.$router.push({ name: 'DoctorResults', params: { name: this.selectedSpec } });
        },
        sponsoredAPI(url) {

            axios
                .get(url)
                .then(response => {

                    this.sponsoredDocs = response.data.sponsoredDoctors;
                    //console.log(this.sponsoredDocs);
                })
                .catch(err => {
                    console.error(err);
                })
        }
    },
    mounted() {
        const url = this.state.base_url + this.state.sponsored_url;

        this.sponsoredAPI(url);

    }

}
</script>

<template>


    <section class="p-5 mb-4 bg-secondary rounded-3">
        <div class="container py-5 d-flex flex-column align-items-center">
            <h2 class="text-warning mb-3">Search your doctor by specializations</h2>
            <div class="col-md-8 fs-4 text-center">
                <div class="mb-3">
                    <select class="form-select form-select-lg" name="specializations" id="specializations"
                        v-model="selectedSpec">
                        <option selected disabled>Select one</option>
                        <option v-for="(specialization, id) in specializations">{{
                            specialization.name }}
                        </option>
                    </select>
                </div>
                <button class="btn btn-dark text-warning" @click="goToIndex()">Search</button>
            </div>
        </div>
    </section>

    <section class="sponsored pb-4 text-center">
        <h3 class="text-warning pb-4">Our Doctors</h3>
        <div class="container">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gy-4">
                <div class="col" v-for="doc in sponsoredDocs">
                    <div class="card">

                        <img class="card-img-top" :src="state.base_url + '/storage/' + doc.photo" alt="">
                        <div>
                            {{ doc.photo }}
                        </div>
                        <div class="card-body d-flex flex-column align-items-center ">
                            <h4>{{ doc.user.name }} {{ doc.surname }}</h4>
                            <strong>Specializations : </strong>
                            <template v-if="doc.specializations">
                                <span class="badge bg-dark my_primary mt-4" v-for="spec in doc.specializations">
                                    {{ spec.name }}
                                </span>
                            </template>
                            <strong>Telephone : </strong>
                            <template v-if="doc.telephone">
                                {{ doc.telephone }}
                            </template>
                            <strong>Address : </strong>
                            <template v-if="doc.address">
                                {{ doc.address }}
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>



<style></style>