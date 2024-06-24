<script>
import { state } from "../state.js";

export default {
    name: "VoteDoctor",
    data() {
        return {
            state,
            vote: null,
            loading: false,
        }
    },
    methods:
    {
        sendVote() {
            this.loading = true;
            /* this.vote = ; */
        }
    }
}
</script>

<template>
    <main>
        <div class="container my-5">
            <form @submit.prevent="sendVote()" action="">
                <span v-for="n in 5" class="vote_stars">
                    <font-awesome-icon icon="fa-regular fa-star" size="lg" style="color: #FFD43B;" />
                </span>
                <button type="submit" class="btn btn-dark text-success" :disabled="loading">Send</button>
                <button @click="$router.back()" class="btn btn-dark text-warning">Cancel</button>
            </form>
        </div>
    </main>
</template>

<style>

.vote_stars {
    color: gold;

}

.vote_stars:hover { }
</style>