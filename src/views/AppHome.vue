<script>
import { state } from "../state.js";
import axios from "axios";
import DoctorCard from "../components/DoctorCard.vue";
import LinkBanner from "../components/LinkBanner.vue";
import HomeBanner from "../components/HomeBanner.vue";

export default {
    name: "AppHome",
    components: {
        DoctorCard,
        LinkBanner,
        HomeBanner
    },
    data() {
        return {
            state,
            selectedSpec: null,
            sponsoredDocs: [],
            url: state.base_url + state.sponsored_url,
            banners: [
                {
                    title: "Search doctors everywhere",
                    text: "Search doctors by specializations everywhere in your country, or try our advanced search!",
                    img_1: "/img/search.png",
                    img_2: "/img/doc_2.png"
                },
                {
                    title: "Easily contact your doctor",
                    text: "After finding your docotr, you can easily send them a message directly from your profile page. And after your visit you can send a rating and a review!",
                    text_style: "transform: scaleX(-1);",
                    padding: "ps-5",
                    img_1: "/img/doc_computer.png",
                    img_2: "/img/vote.png"
                },
                {
                    title: "Be part of our community",
                    text: "Join our community of patients and doctors all around the world!",
                    img_1: "/img/doctor_patient_3.png",
                    img_2: "/img/doctor_patient_2.png"
                }
            ],
            linkBanners: [
                /* {
                    title: "Download our app",
                    bg:
                        "background: url(/img/bg_banners.jpg); background-repeat: no-repeat; background-size: cover;",
                    text: "Try BDoctor on your mobile device , or download our App !",
                    img: "/img/downloadApp.jpg",
                    link: "https://www.apple.com/us/search/Bdoctor?src=serp",
                }, */
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
    <section class="spec-search p-3 p-md-5 pb-5 bg_primary">

        <img class="search_bg img-fluid" src="/img/doctors_2.png" alt="Doctors with patiens illustration">

        <div class="search_container">

            <!-- Title -->
            <h2 class="mb-3 text-white fw-bold display-5">Find your specialist
                <br> Bdoctor
            </h2>

            <!-- Search bar -->
            <div class="search_bar bg_primary_hover mb-3">
                <div class="search shadow-lg">
                    <select class="form-select form-select-lg me-3" name="specializations" id="specializations"
                        v-model="selectedSpec">
                        <option selected disabled>Select specialization</option>
                        <option v-for="(specialization, id) in state.specializations">
                            {{ specialization.name }}
                        </option>
                    </select>

                    <svg @click="goToIndex()" viewBox="0 0 24 24" class="search__icon">
                        <g>
                            <path
                                d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z">
                            </path>
                        </g>
                    </svg>

                </div>
            </div>

            <!-- Advanced search button -->
            <button v-if="!selectedSpec" class="advanced_search_button my_button_light">
                <RouterLink :to="{ name: 'AdvancedResearch' }" href="#" aria-current="page">
                    Advanced research
                    <i class="ms-2 fa-solid fa-arrow-right fa-lg text_primary"></i>
                </RouterLink>
            </button>
        </div>


        <!--             <div class="col-md-8 fs-4 text-center">
                <div class="mb-3">
                    <select class="form-select form-select-lg" name="specializations" id="specializations"
                        v-model="selectedSpec">
                        <option selected disabled>Select one</option>
                        <option v-for="(specialization, id) in state.specializations">
                            {{ specialization.name }}
                        </option>
                    </select>
                </div>
            </div> -->
        <!--             <div class="actions d-flex justify-content-center gap-3">
                <button v-if="selectedSpec" class="btn btn-dark" @click="goToIndex()">Search</button>

                <button v-if="!selectedSpec" class="btn btn-dark">
                    <RouterLink class="nav-link nav_element" :to="{ name: 'AdvancedResearch' }" href="#"
                        aria-current="page">
                        Go to Research
                    </RouterLink>
                </button>
            </div> -->


    </section>


    <section class="sponsored_doctors py-4 text-center">
        <h3 class="text_primary display-5 fw-bold px-3">Our sponsored Bdoctors</h3>
        <div class="container py-3 py-md-5">
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 g-md-3 g-sm-5 justify-content-center">
                <div class="col" v-for="doc in sponsoredDocs">
                    <DoctorCard :doc="doc"></DoctorCard>
                </div>
            </div>
        </div>
    </section>

    <section>
        <HomeBanner v-for="banner in banners" :banner />
    </section>

    <!--     <section>
        <LinkBanner v-for="linkBanner in linkBanners" :linkBanner />
    </section> -->

</template>

<style scoped>
.spec-search {
    position: relative;
    min-height: 700px;
    border-bottom-left-radius: 60% 10%;
    border-bottom-right-radius: 60% 10%;
    overflow: hidden;

    .search_bg {
        max-width: 750px;
        position: absolute;
        top: -10%;
        left: 50%;
    }

    & h2 {
        color: var(--secondary);
    }

    & select {
        /* border: 3px solid var(--secondary); */
        border-radius: 30px;
    }

    & button {
        color: var(--secondary);
        /* background-color: var(--dark); */
    }
}

.sponsored_doctors {
    h3 {
        margin: 5rem auto;
    }
}

/* #region :::: NEW SEARCH BAR :::: */
.search_container {
    position: relative;
    z-index: 1;
    top: 30%;
    left: 17%;
    max-width: 700px;

    .search_bar {
        max-width: 500px;
        border-radius: 1000px;
        padding: 10px;
        display: grid;

        .search {
            position: relative;
            width: 100%;
            border-radius: 50px;
            background: linear-gradient(135deg, rgb(247, 218, 218) 0%, rgb(247, 214, 214) 100%);
            padding: 8px;
            display: flex;
            align-items: center;

            &::after,
            &::before {
                content: "";
                width: 100%;
                height: 100%;
                border-radius: inherit;
                position: absolute;
            }

            &::before {
                top: -1px;
                left: -1px;
                background: linear-gradient(0deg, rgb(247, 218, 218) 0%,
                        rgb(247, 214, 214) 100%);
                z-index: -1;
            }

            &::after {
                bottom: -1px;
                right: -1px;
                background: linear-gradient(0deg, rgb(247, 218, 218) 0%,
                        rgb(247, 214, 214) 100%);
                box-shadow: rgb(247, 218, 218) 0%,
                    rgba(247, 214, 214, 0.7) 100% 3px 3px 5px 0px, rgb(247, 218, 218, 0.7) 0%,
                    rgb(247, 214, 214, 0.7) 100% 5px 5px 20px 0px;
                z-index: -2;
            }

            .search_input {
                padding: 10px;
                width: 100%;
                background: linear-gradient(135deg, rgb(218, 232, 247) 0%, rgb(214, 229, 247) 100%);
                border: none;
                color: #9EBCD9;
                font-size: 20px;
                border-radius: 50px;
            }

            .search__icon {
                width: 50px;
                aspect-ratio: 1;
                border-left: 2px solid white;
                border-top: 3px solid transparent;
                border-bottom: 3px solid transparent;
                border-radius: 50%;
                padding-left: 12px;
                margin-right: 10px;
                transition: all ease-in-out 0.2s;

                &:hover {
                    transform: scale(1.1);
                    border-left-color: lightcoral;
                    cursor: pointer;
                    /* border-left: 3px solid lightcoral; */

                    path {
                        fill: lightcoral;
                    }
                }
            }

            .search__icon path {
                transition: all ease-in-out 0.2s;
                fill: white;
            }
        }

    }

}

/* #endregion :::: NEW SEARCH BAR :::: */

/* #region :::: MEDIA QUERIES :::: */

@media (max-width: 1200px) {
    .spec-search {
        height: auto;
        padding-bottom: 100px !important;
    }

    .search_container {
        left: 10%;
        max-width: 80%;
    }

    .search_bg {
        max-width: 60%;
    }
}

@media (max-width: 768px) {
    .spec-search {
        height: auto;
        padding-bottom: 50px !important;
    }

    .search_container {
        left: 5%;
        max-width: 90%;
        top: 20%;
    }

    .search_bg {
        max-width: 80%;
        top: 0;
        left: 10%;
    }

    .sponsored_doctors h3 {
        margin: 2rem auto;
    }
}

@media (max-width: 576px) {
    .search_container h2 {
        font-size: 2rem;
    }

    .search_bar {
        max-width: 100%;
    }

    .search__icon {
        width: 40px;
    }

    .doctor_card {
        width: 100%;
    }

    .row {
        gap: 5rem;
    }
}

/* #endregion :::: MEDIA QUERIES :::: */
</style>
