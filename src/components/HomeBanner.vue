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
                class="col-12 col-lg-7 d-flex flex-column justify-content-center position-relative z-1 mb-4 mb-lg-0">
                <h1 class="text_primary display-5 fw-bold">{{ banner.title }}</h1>
                <p class="fs-4">{{ banner.text }}</p>
            </div>

            <div class="col-12 col-lg-5 position-relative banner_images">
                <img class="img-fluid banner_img banner_img_1" :src="banner.img_1" alt="Banner image 1" />
                <img class="img-fluid banner_img banner_img_2" :src="banner.img_2" alt="Banner image 2" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.banner {
    margin: 5rem auto;
    min-height: 450px;
}

.banner_images {
    height: 450px;
}

.banner_img_1,
.banner_img_2 {
    position: absolute;
    max-width: 100%;
    height: auto;
}

.banner_img_1 {
    top: -30%;
    right: 0;
    max-width: 80%;
    z-index: 2;
}

.banner_img_2 {
    bottom: 0;
    left: 0;
    max-width: 70%;
    z-index: 1;
}

/* #region :::: MEDIA QUERIES :::: */
@media (max-width: 1200px) {
    .banner {
        margin: 6rem auto;
    }

    .banner_images {
        height: 400px;
    }
}

@media (max-width: 992px) {
    .banner {
        margin: 6rem auto;
    }

    .banner_images {
        height: 350px;
    }

    .banner_img_1 {
        top: -20%;
    }
}

@media (max-width: 768px) {
    .banner {
        margin: 6rem auto;
    }

    .banner_images {
        height: 300px;
    }

    h1 {
        font-size: 2rem;
    }

    p {
        font-size: 1rem !important;
    }
}

@media (max-width: 576px) {
    .banner_images {
        height: 250px;
    }

    .banner_img_1 {
        top: -10%;
    }
}

/* #endregion :::: MEDIA QUERIES :::: */
</style>