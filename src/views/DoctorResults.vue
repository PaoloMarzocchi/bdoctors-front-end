<script>
import { state } from '../state.js';
import axios from 'axios';

export default {
    name: 'DoctorResults',
    data() {
        return {
            state,
            doctorsBySpec: [],
            isLoading: false, // variabile per l'indicatore di caricamento
            error: null, // variabile per il messaggio di errore
        };
    },
    methods: {
        getDoctorsBySpec(specialization) {
            this.isLoading = true; // Avvia il caricamento
            this.error = null;
            const url = `${this.state.base_url}/api/research/${specialization}`;
            console.log(url);
            axios
                .get(url)
                .then(response => {
                    console.log(response.data.searchResults);
                    this.doctorsBySpec = response.data.searchResults;
                })
                .catch(err => {
                    console.error('Errore nel recupero dei dottori per la specializzazione:', err);
                    this.error = 'Si è verificato un errore durante il recupero dei dati. Riprova più tardi.';
                })
                .finally(() => {
                    this.isLoading = false; // Fine del caricamento
                });
        }
    },
    mounted() {
        this.getDoctorsBySpec(this.$route.params.name);
    }
};
</script>

<template>
    <div class="container my-5">
        <div class="my-4">
            <h2 class="text-warning mb-3">Specialization search results: {{ $route.params.name }}</h2>
        </div>
        <div v-if="isLoading" class="d-flex justify-content-center my-5">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div v-else-if="error" class="alert alert-danger" role="alert">
            {{ error }}
        </div>
        <div v-else class="row gap-5">
            <div class="col-12 col-md-6 col-lg-3" v-for="doctor in doctorsBySpec" :key="doctor.id">
                <div class="card h-100 d-flex flex-column shadow-lg">

                    <img :src="doctor.photo ? `${state.base_url}/storage/${doctor.photo}` : '/img/logo.png'"
                        class="card-img-top img-fluid" alt="Foto del dottore" style="height: 200px; object-fit: cover;">
                    <div class="card-body flex-fill d-flex flex-column">
                        <h5 class="card-title">
                            Dr. {{ doctor.surname }} {{ doctor.user.name }}
                        </h5>
                        <p class="card-text">
                            <strong>Address:</strong> {{ doctor.address }}<br>
                            <strong>Servises:</strong> {{ doctor.services }}<br>
                            <strong>Telephone:</strong> {{ doctor.telephone }}<br>
                            <strong>Email:</strong> {{ doctor.user.email }}
                        </p>
                        <router-link :to="{ name: 'DoctorProfile', params: { slug: doctor.slug } }"
                            class="btn btn-primary mt-auto">
                            Go to the doctor's profile
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>
