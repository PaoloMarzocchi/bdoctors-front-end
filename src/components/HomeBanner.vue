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
        <div class="row position-relative">
            <div class="banner_title">
                {{ banner.title }}
            </div>
            <div class="col-12">
                <img :src="banner.img" alt="" class="" />
                <div class="row">
                    <div class="col-6">{{ banner.text }}</div>
                    <div class="col-6"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.banner_title {
    font-weight: bold;
    font-size: 60px;
    color: palegoldenrod;
    position: absolute;
    text-align: center;
}

.col-12 {
    height: 600px;

    img {
        width: 100%;
        height: 100%;
    }
}
</style>
