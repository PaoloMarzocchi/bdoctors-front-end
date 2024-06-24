<script>
import { state } from "../state.js";

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
            const vote = this.vote;
            console.log(vote);
        },
        getStarIcon(n) {
            return {
                icon: this.hoverRating >= n || this.rating >= n ? ['fas', 'star'] : ['far', 'star'],
                style: { color: '#FFD700 !important' }
            };
        },
        hoverStar(n) {
            this.hoverRating = n;
        },
        leaveStar() {
            this.hoverRating = 0;
        },
        setRating(n) {
            this.rating = n;
            this.vote = this.rating;
        },
    }
}
</script>

<template>
    <main>
        <div class="container my-5">
            <form @submit.prevent="sendVote()" action="">
                <div class="stars">
                    <span v-for="n in 5" :key="n" @mouseover="hoverStar(n)" @mouseleave="leaveStar"
                        @click="setRating(n)" class="vote_stars">
                        <font-awesome-icon :icon="getStarIcon(n).icon" size="lg" :style="getStarIcon(n).style" />
                    </span>
                </div>
                <button type="submit" class="btn btn-dark text-success" :disabled="loading">Send</button>
                <button @click="$router.back()" class="btn btn-dark text-warning">Cancel</button>
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