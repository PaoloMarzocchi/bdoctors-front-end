<script>
import { state } from "../state";

export default {
  name: "DoctorAvgVote",
  props: {
    doc: Object,
  },
  data() {
    return {
      state,
      sum: null,
      avgVote: null,
    };
  },

  methods: {
    getAverageVote() {
      for (let i = 0; i < this.doc.votes.length; i++) {
        this.sum += this.doc.votes[i].vote;
      }

      this.avgVote = this.sum / this.doc.votes.length;

      // console.log(this.sum, this.avgVote);
    },
  },
  mounted() {
    this.getAverageVote();
  },
};
</script>

<template>
  <span class="text-warning">
    <template v-for="i in 5" :key="i">
      <i v-if="i <= this.avgVote" class="fa-solid fa-star" style="color: #ffd43b"></i>
      <i v-else class="fa-regular fa-star" style="color: #ffd43b"></i>
    </template>
  </span>
</template>

<style></style>
