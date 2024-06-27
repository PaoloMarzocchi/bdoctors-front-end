<script>
export default {
    name: "HomeBanner",
    props: { banner: Object }
};
</script>

<template>

    <div class="container bg_light banner py-5">

        <div :style="banner.text_style" class="row position-relative">

            <div :style="banner.text_style" :class="banner.padding"
                class="col-12 col-md-7 d-flex flex-column justify-content-center position-relative z-1">
                <h1 class="text_primary display-5 fw-bold">{{ banner.title }}</h1>
                <p class="fs-4">{{ banner.text }}</p>
            </div>

            <div class="col-12 col-md-5">
                <img class="img-fluid banner_img banner_img_1" :src="banner.img_1" />
                <img class="img-fluid banner_img banner_img_2" :src="banner.img_2" />
            </div>

        </div>

    </div>

</template>

<style scoped>
.banner {
    margin: 10rem auto;
    height: 450px;
}

.banner_img_1,
.banner_img_2 {
    position: absolute;
    min-width: 250px;
    max-width: 400px;
}

.banner_img_1 {
    top: -65%;
    left: 76%;
}

.banner_img_2 {
    top: 45%;
    left: 52%;
}

@media only screen and (max-width: 1200px) {
    .banner_title {
        white-space: wrap;
    }
}
</style>
