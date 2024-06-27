<script>
export default {
    name: "HomeBanner",
    props: { banner: Object },
    data() {
        return {};
    },
    methods: {},
};
</script>

<template>
    <div class="container-fluid m-0 p-0">
        <div class="row">
            <div class="col-12 h-100 align-self-center py-5" :style="banner.bg">
                <div class="row justify-content-evenly text-center p-5">
                    <div :style="banner.text_style"
                        class="col-6 col-lg-4 my_text align-self-center d-flex flex-column gap-3">
                        <div class="banner_title">
                            {{ banner.title }}
                        </div>
                        <div class="div">
                            {{ banner.text }}
                        </div>
                    </div>
                    <div class="col-6 col-lg-4 my_img">
                        <a :href="banner.link" target="_blank" rel="noopener noreferrer">
                            <img class="shadow-lg" :src="banner.img" alt="" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.banner_title {
    font-weight: bold;
    font-size: 60px;
    color: var(--secondary);
    text-align: center;
    white-space: nowrap;
}

.col-12 {
    height: 600px;
    background-repeat: no-repeat;
    background-size: cover;

    .my_text {
        font-weight: bold;
        font-size: large;
        color: var(--warning);
    }

    .my_img {
        img {
            width: 300px;
            border-radius: 50%;
        }
    }
}

@media only screen and (max-width: 1200px) {
    .banner_title {
        white-space: wrap;
    }
}
</style>
