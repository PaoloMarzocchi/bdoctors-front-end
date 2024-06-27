<script>
import { state } from "../state.js";
import axios from "axios";
import DoctorCard from "../components/DoctorCard.vue";
import HomeBanner from "../components/HomeBanner.vue";

export default {
    name: "AppHome",
    components: {
        DoctorCard,
        HomeBanner,
    },
    data() {
        return {
            state,
            selectedSpec: null,
            sponsoredDocs: [],
            url: state.base_url + state.sponsored_url,
            banners: [
                {
                    title: "Download our app",
                    bg:
                        "background: url(/img/bg_banners.jpg); background-repeat: no-repeat; background-size: cover;",
                    text: "Try BDoctor on your mobile device , or download our App !",
                    img: "/img/downloadApp.jpg",
                    link: "https://www.apple.com/us/search/Bdoctor?src=serp",
                },
                {
                    title: "Our sponsor !",
                    bg:
                        "background: url(/img/bg_banners.jpg); background-repeat: no-repeat; background-size: cover; transform: scaleX(-1);",
                    text:
                        "Thanks to our sponsor , we can make your experience always better every day .",
                    text_style: "transform: scaleX(-1);",
                    img: "/img/sponsor1.png",
                    link: "https://boolean.careers/",
                },
                {
                    title: "Meet our team",
                    bg:
                        "background: url(/img/bg_banners.jpg); background-repeat: no-repeat; background-size: cover;",
                    text: "Let's take a look at our DEV team !",
                    img: "/img/devs.jpg",
                    link: "",
                },
            ],
        };
    },
    methods: {
        goToIndex() {
            this.$router.push({ name: "DoctorResults", params: { name: this.selectedSpec } });
        },
        sponsoredAPI(url) {
            axios
                .get(url)
                .then((response) => {
                    this.sponsoredDocs = response.data.sponsoredDoctors;
                    // console.log(this.sponsoredDocs);
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
    <section class="spec-search p-5 pb-5 bg-secondary">
        <div class="container py-5 d-flex flex-column align-items-center rounded-5">
            <h2 class="my-3">Search your doctor by specialization</h2>
            <div class="col-md-8 fs-4 text-center">
                <div class="mb-3">
                    <select class="form-select form-select-lg" name="specializations" id="specializations"
                        v-model="selectedSpec">
                        <option selected disabled>Select one</option>
                        <option v-for="(specialization, id) in state.specializations">
                            {{ specialization.name }}
                        </option>
                    </select>
                </div>
            </div>
        </div>
    </section>

    <div class="actions d-flex justify-content-center gap-3 my-3">
        <button v-if="selectedSpec" class="btn btn-dark" @click="goToIndex()">Search</button>

        <button v-if="!selectedSpec" class="btn btn-dark my-3">
            <RouterLink class="nav-link nav_element" :to="{ name: 'AdvancedResearch' }" href="#" aria-current="page">
                Go to Research
            </RouterLink>
        </button>
    </div>

    <section class="sponsored py-4 text-center">
        <h3 class="mb-4">Our sponsored doctors</h3>
        <div class="container py-5">
            <div class="row row-cols-auto gap-5 justify-content-center">
                <div class="col" v-for="doc in sponsoredDocs">
                    <DoctorCard :doc="doc"></DoctorCard>
                </div>
            </div>
        </div>
    </section>

    <section>
        <HomeBanner v-for="banner in banners" :banner />
    </section>
</template>

<style>
.spec-search {
    background-image: url("/img/bg_doctors.png");
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: cover;
    border-bottom-left-radius: 20% 20%;
    border-bottom-right-radius: 20% 20%;

    & h2 {
        color: var(--secondary);
    }

    & select {
        border: 3px solid var(--secondary);
        border-radius: 30px;
    }

    & button {
        color: var(--secondary);
        /* background-color: var(--dark); */
    }
}

.sponsored {
    /* background-color: rgba(0, 0, 255, 0.171); */

    & h3 {
        color: var(--warning);
    }
}
</style>
