<script>
import { state } from '../state';

export default {
    name: 'DoctorCard',
    props: {
        doc: Object,
    },
    data() {
        return {
            state
        }
    }
}
</script>

<template>
    <div class="card h-100 shadow-lg rounded-4">
        <div class="card-header">
            <h5 class="card-title text-center bg-transparent">
                Dr. {{ doc.surname }} {{ doc.user.name }}
            </h5>
            <template v-if="doc.photo == null">
                <img src="/img/DoctorAvatar.png"
                    class="bg-transparent card-img-top img-fluid rounded-3 align-self-center mt-3"
                    alt="Foto del dottore" style="height: 250px; width: 280px; object-fit: cover" />
            </template>
            <template v-else>
                <img :src="`${state.base_url}/storage/${doc.photo}`"
                    class="card-img-top img-fluid rounded-3 align-self-center mt-3" alt="Foto del dottore"
                    style="height: 250px; width: 280px; object-fit: cover" />
            </template>
        </div>

        <div class="card-body d-flex flex-column text-center bg-transparent">
            <span><strong>Address:</strong> {{ doc.address }}</span>
            <!-- <span><strong>Telephone:</strong> {{ doc.telephone }}</span> -->
            <!-- <span><strong>Services:</strong> {{ doc.services }}</span> -->
            <span><strong>Email:</strong> {{ doc.user.email }}</span>

            <router-link :to="{ name: 'DoctorProfile', params: { slug: doc.slug } }"
                class="btn btn-dark text-warning mt-3">
                Visit doctor profile
            </router-link>
        </div>

        <div class="card-footer d-flex flex-column align-items-center">
            <strong>Specializations</strong>

            <template v-if="doc.specializations">
                <p class="text-center">
                    <span v-for="spec in doc.specializations" class="badge bg-warning text-dark m-1">{{
                    spec.name }}</span>
                </p>
            </template>
        </div>
    </div>
</template>



<style lang="scss" scoped></style>