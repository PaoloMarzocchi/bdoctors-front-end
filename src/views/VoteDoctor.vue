<script>
import { state } from "../state.js";
import axios from "axios";

export default {
    name: "VoteDoctor",
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
            const data =
            {
                customer_vote: this.vote,
            };
            console.log(data);

            const url = `${this.state.base_url}/api/votes`;
            axios.post(url, data).then(response => {
                console.log(response);
                if (response.data.success) {

                }
            }
            )
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
        },
    }
}
</script>

<template>
    <main>
        <div class="container my-5">
            <h2 class="fw-bold fs-1">
                Hello visitor ! <br>
                Do you want to leave a vote for the Doctor ?
            </h2>
            <form @submit.prevent="sendVote()" action="" method="post">
                <div class="stars py-5">
                    <span v-for="n in 5" :key="n" @mouseover="hoverStar(n)" @mouseleave="leaveStar"
                        @click="setRating(n)" class="vote_stars">
                        <font-awesome-icon :icon="getStarIcon(n).icon" size="xl" :style="getStarIcon(n).style" />
                    </span>
                </div>
                <button type="submit" class="btn btn-dark text-success" :disabled="loading">Send</button>
                <button @click="$router.back()" class="btn btn-dark text-warning mx-3">Cancel</button>
            </form>
        </div>
    </main>
</template>

<style>
.stars {
    display: flex;
}

.vote_stars {
    cursor: pointer;
    margin: 5px;
}
</style>