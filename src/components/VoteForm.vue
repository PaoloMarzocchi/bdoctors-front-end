<script>
import { state } from '../state';
import axios from "axios";

export default {
    name: 'VoteForm',
    props: {
        doc_id: Number,
        doc_name: String,
        doc_surname: String,
    },
    data() {
        return {
            state,
            vote: '',
            loading: false,
            rating: 0,
            hoverRating: 0,
        }
    },
    methods:
    {
        sendVote() {
            this.loading = true;
            const data = {
                vote_id: this.vote,
                doctor_profile_id: this.doc_id,
            };
            console.log(data);

            const url = `${this.state.base_url}/api/votes`;
            axios.post(url, data).then(response => {
                console.log(response);
                if (response.data.success) {
                    this.vote = '';
                    this.rating = 0;
                    this.hoverRating = 0;
                    this.loading = false;
                } else {
                    console.error('Error:', response.data.errors || response.data.message);
                    this.loading = false;
                }
            }).catch(err => {
                console.error('Error submitting form:', err.response ? err.response.data : err.message);
                this.loading = false;
            });
        },
        getStarIcon(n) {
            return {
                icon: this.hoverRating >= n || this.rating >= n ? ['fas', 'star'] : ['far', 'star'],
                style: { color: '#FFD700 !important' }
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
        }
    }
}
</script>

<template>
    <div class="message_form position-relative my-5">
        <div class="shadow-lg rounded-4 p-4">
            <div class="">
                <div
                    class="vote_form_title rounded-4 position-relative d-flex justify-content-center align-items-center">
                    <h2>
                        Leave a vote
                    </h2>
                </div>
            </div>
            <div class="card-body">
                <form @submit.prevent="sendVote()" action="" method="POST">
                    <div class="text-center mb-3">
                        <span class="">Dr. </span>
                        <span class="text-warning fs-2 fw-bold">{{ this.doc_name }}{{ this.doc_surname }}
                        </span>
                    </div>
                    <div class="stars py-4 justify-content-center">
                        <span v-for="n in 5" :key="n" @mouseover="hoverStar(n)" @mouseleave="leaveStar"
                            @click="setRating(n)" class="vote_stars">
                            <font-awesome-icon :icon="getStarIcon(n).icon" size="xl" :style="getStarIcon(n).style" />
                        </span>
                    </div>
                    <div class="d-flex justify-content-center align-items-center">
                        <button type="submit" class="btn btn-primary btn_vote" :disabled="loading">Send</button>
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

    background-color: #f77b02;
    background-image: linear-gradient(to top, #f77b02 0%, #ffc107 100%);
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
        background-color: #f77b02;
        background-image: linear-gradient(to left, #f77b02 0%, #ffc107 100%);
        border-color: #04befe;
        border-radius: inherit;
        z-index: -1;
        transition: opacity 0.3s linear;
        opacity: 0;
    }

    &:hover::before {
        opacity: 1
    }
}

.vote_form_title {
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    width: 400px;
    height: 140px;
    background-color: #f77b02;
    background-image: linear-gradient(to top, #f77b02 0%, #ffc107 100%);

    h2 {
        font-weight: bold;
        color: #fff;
        font-size: 2rem;
    }
}
</style>