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

    <div class="doctor_card d-flex flex-column gap-3" :class="{ sponsored: doc.sponsorships.length > 0 }">

        <div class="profile_image">
            <template v-if="doc.photo == null">
                <img src="/img/DoctorAvatar.png" class="img-fluid" alt="Foto del dottore" />
            </template>

            <template v-else>
                <img :src="`${state.base_url}/storage/${doc.photo}`" class="img-fluid" alt="Foto del dottore"
                    style="object-fit: cover" />
            </template>
        </div>


        <div class="d-flex justify-content-center align-items-center">
            <span class="doctor_name"> Dr. {{ doc.surname }} {{ doc.user.name }}</span>

            <i v-if="doc.sponsorships.length > 0" class="ms-2 fa-solid fa-crown fa-lg"></i>

        </div>

        <div class="doctor_info">

            <div>
                <i class="color_primary fa-solid fa-location-dot"></i>
                {{ doc.address }}
            </div>

            <div>
                <i class="color_primary fa-solid fa-phone"></i>
                {{ doc.telephone }}
            </div>

            <div>
                <i class="color_primary fa-solid fa-at"></i>
                {{ doc.user.email }}
            </div>

            <div>
                <i class="color_primary fa-solid fa-stethoscope"></i>
                {{ doc.services }}
            </div>

        </div>

        <router-link :to="{ name: 'DoctorProfile', params: { slug: doc.slug } }" class="doctor_profile_button btn mt-3">
            Visit doctor profile
        </router-link>



    </div>




</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.color_primary {
    color: #f77b02;
}

.doctor_card {
    position: relative;
    background-color: #fff;
    border-radius: 20px;
    min-width: 300px;
    max-width: 350px;
    /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
    filter: drop-shadow(0 0 0.75rem rgba(0, 0, 0, 0.1));
    text-align: center;
    padding: 20px;


    /*     &::after {
        content: '';
        position: absolute;
        bottom: 0px;
        transform: translate(-50%, 0%);
        left: 50%;
        right: 0;
        width: 102%;
        height: 40px;
        background-color: #26235C;
        clip-path: polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%, 98% 0%, 98% 55%, 95% 80%, 5% 80%, 2% 55%, 2% 0%);
        border-radius: 6px 6px 20px 20px;
    } */


    .doctor_name {
        font-size: 1.3rem;
        font-weight: bold;

        &+i {
            color: goldenrod;
        }
    }

    .profile_image img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin-top: -50px;
        border: 5px solid #E1D9F7;

    }


    h2 {
        font-size: 1.5em;
        margin: 10px 0 5px;
    }

    .doctor_profile_button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #2C3E50;
        color: #fff;
        border-radius: 10px;
        text-decoration: none;
        margin-bottom: 20px;
    }

}

.sponsored {
    .doctor_profile_button {
        background-color: goldenrod;
    }

    .profile_image img {
        border: 5px solid goldenrod;
    }
}
</style>