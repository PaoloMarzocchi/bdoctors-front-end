<script>
import { state } from "../state";
import axios from "axios";

export default {
    name: "VoteForm",
    props: {
        doc_id: Number,
        doc_name: String,
        doc_surname: String,
    },
    data() {
        return {
            state,
            vote: "",
            success: false,
            loading: false,
            rating: 0,
            hoverRating: 0,
        };
    },
    methods: {
        sendVote() {
            this.loading = true;

            const data = {
                vote_id: this.vote,
                doctor_profile_id: this.doc_id,
            };

            console.log(data);

            const url = `${this.state.base_url}/api/votes`;

            axios
                .post(url, data)
                .then((response) => {
                    console.log(response);

                    if (response.data.success) {
                        this.vote = "";
                        this.rating = 0;
                        this.hoverRating = 0;
                        this.success = response.data.message;
                        console.log(this.success);
                    } else {
                        console.error("Error:", response.data.errors || response.data.message);
                    }

                    this.loading = false;
                })
                .catch((err) => {
                    console.error(
                        "Error submitting form:",
                        err.response ? err.response.data : err.message
                    );
                    this.loading = false;
                });
        },
        getStarIcon(n) {
            return {
                icon:
                    this.hoverRating >= n || this.rating >= n ? ["fas", "star"] : ["far", "star"],
                style: { color: "#FFD700 !important" },
            };
        },
        hoverStar(n) {
            this.hoverRating = n;
            //console.log(this.hoverRating);
        },
        leaveStar() {
            this.hoverRating = 0;
            //console.log(this.hoverRating);
        },
        setRating(n) {
            this.rating = n;
            //console.log(this.rating);
            this.vote = this.rating;
            //console.log(this.vote);
        },
    },
};
</script>

<template>
    <div class="message_form position-relative my-5">
        <div class="shadow-lg rounded-4 p-4">
            <div class="d-flex align-items-center justify-content-center">
                <div class="my_form_title p-3">
                    <h3 class="fs-1">Leave a vote</h3>
                </div>
            </div>
            <div class="card-body bg-light rounded-4 p-3">
                <template v-if="success">
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        <strong>Thank you!</strong>
                        <br />
                        <span>Your vote has been sent!</span>
                    </div>
                </template>

                <div class="text-center mb-3">
                    <span class="">Dr. </span>
                    <span class="text_primary fs-3 fw-bold">{{ this.doc_name }} {{ this.doc_surname }}
                    </span>
                </div>

                <form @submit.prevent="sendVote()" action="" method="POST">
                    <div class="stars pb-4 justify-content-center">
                        <span v-for="n in 5" :key="n" @mouseover="hoverStar(n)" @mouseleave="leaveStar"
                            @click="setRating(n)" class="vote_stars">
                            <font-awesome-icon :icon="getStarIcon(n).icon" size="xl" :style="getStarIcon(n).style" />
                        </span>
                    </div>
                    <div class="d-flex justify-content-center align-items-center">
                        <button type="submit" class="btn btn_vote text-white" :disabled="loading">
                            {{ loading ? "Sending vote..." : "Vote" }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style>
.stars {
    display: flex;
}

.vote_stars {
    cursor: pointer;
    margin: 5px;
}

.btn_vote {
    position: relative;

    background-color: var(--primary);
    background-image: linear-gradient(to top, var(--primary) 0%, var(--tertiary) 100%);
    border: #04befe;
    transition: background-image 0.5s linear;
    z-index: 1;

    &::before {
        position: absolute;
        content: "";
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: var(--primary);
        background-image: linear-gradient(to left, var(--primary) 0%, var(--tertiary) 100%);
        border-color: #04befe;
        border-radius: inherit;
        z-index: -1;
        transition: opacity 0.3s linear;
        opacity: 0;
    }

    &:hover::before {
        opacity: 1;
    }
}

.my_form_title {
    font-size: 35px;
    color: var(--primary);
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;

    /* h2 {
        font-weight: bold;
        font-size: 3rem;
    } */
}

.my_form_title::before,
.my_form_title::after {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    border-radius: 50%;
    left: -10px;
    bottom: 44%;
    background-color: var(--primary);
}

.my_form_title::before {
    width: 20px;
    height: 20px;
    background-color: var(--primary);
}

.my_form_title::after {
    width: 20px;
    height: 20px;
    animation: pulse 1s linear infinite;
}

@keyframes pulse {
    from {
        transform: scale(1);
        opacity: 1;
    }

    to {
        transform: scale(2);
        opacity: 0;
    }
}
</style>
