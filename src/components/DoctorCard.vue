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

    <div class="flip-card">
        <div class="flip-card-inner">
            <div class="flip-card-front">

                <!-- Doctor photo -->
                <div class="photo bg-transparent p-3">
                    <template v-if="doc.photo == null">
                        <img src="/img/DoctorAvatar.png" class="bg-transparent img-fluid" alt="Foto del dottore" />
                    </template>

                    <template v-else>
                        <img :src="`${state.base_url}/storage/${doc.photo}`" class="img-fluid" alt="Foto del dottore"
                            style="height: 250px; width: 280px; object-fit: cover" />
                    </template>
                </div>


                <!-- Doctor info front -->
                <div class="info_front bg-transparent p-3">
                    <!-- Doctor name -->
                    <h5 class="text-center bg-transparent">
                        Dr. {{ doc.surname }} {{ doc.user.name }}
                    </h5>

                    <!-- Doctor specialization -->
                    <span class="bg-transparent">
                        <i class="color_primary bg-transparent fa-solid fa-stethoscope"></i>
                        {{ doc.services }}
                    </span>

                    <!-- Doctor address-->
                    <div class="doctor_info_front bg-transparent">

                        <span class="bg-transparent">
                            <i class="color_primary bg-transparent fa-solid fa-location-dot"></i>
                            {{ doc.address }}
                        </span>

                    </div>
                </div>

            </div>

            <div class="flip-card-back">
                <!-- Doctor info back-->
                <div class="doctor_info_back bg-transparent">

                    <div class="bg-transparent">
                        <i class="color_primary bg-transparent fa-solid fa-phone"></i>
                        {{ doc.telephone }}
                    </div>

                    <div class="bg-transparent">
                        <i class="color_primary bg-transparent fa-solid fa-at"></i>
                        {{ doc.user.email }}
                    </div>

                    <router-link :to="{ name: 'DoctorProfile', params: { slug: doc.slug } }"
                        class="btn btn-dark text-warning mt-3">
                        Visit doctor profile
                    </router-link>
                </div>


            </div>
        </div>
    </div>

    <!--     <div class="card h-100 shadow-lg rounded-4">
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
    <span><strong>Telephone:</strong> {{ doc.telephone }}</span>
    <span><strong>Services:</strong> {{ doc.services }}</span>
    <span><strong>Email:</strong> {{ doc.user.email }}</span>

    <router-link :to="{ name: 'DoctorProfile', params: { slug: doc.slug } }" class="btn btn-dark text-warning mt-3">
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
</div> -->
</template>



<style scoped>
.color_primary {
    color: #f77b02;
}

.flip-card {
    background-color: transparent;
    width: 304px;
    height: 400px;
    perspective: 1000px;
    font-family: sans-serif;

    &:hover {
        cursor: pointer;

        .flip-card-inner {
            transform: rotateY(180deg);
        }
    }
}

.flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
}

.flip-card-front,
.flip-card-back {
    box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.2);
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border: 1px solid #f77b02;
    border-radius: 1rem;
}

.flip-card-front {
    .photo {
        height: 350px;
    }

    background: linear-gradient(120deg, bisque 60%, rgb(255, 231, 222) 88%,
        rgb(255, 211, 195) 40%, coral 48%);
    color: coral;
}

.flip-card-back {
    background: linear-gradient(120deg, rgb(255, 174, 145) 30%, coral 88%,
            bisque 40%, rgb(255, 185, 160) 78%);
    color: white;
    transform: rotateY(180deg);
}
</style>