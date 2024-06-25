<script>

export default {
  name: 'DoctorReviews',
  props: {
    reviews: Array
  },
  data() {
    return {

    }
  },
  methods: {
    formattedDate(date) {

      // Create a dateObject
      let dateObject = new Date(date);

      // Mapping months
      const monthNames = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
        "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];

      // Change date format to DD-month-AAAA
      let day = String(dateObject.getUTCDate()).padStart(2, '0');
      let month = monthNames[dateObject.getUTCMonth()];
      let year = dateObject.getUTCFullYear();
      let formattedDate = `${day} ${month} ${year}`;

      // Get the result
      return formattedDate;
    }
  }
}

</script>

<template>
  <div class="doc_reviews">
    <div class="review p-3" v-for="review in reviews">

      <div class="mb-2">
        <span v-show="review.first_name" class="firstName">{{ review.first_name + ' ' }}</span>
        <span v-show="review.last_name" class="lastName">{{ review.last_name }}</span>
        <div v-show="review.email" class="email">{{ review.email }}</div>
      </div>

      <div>
        <div class="review_text">{{ review.review_text }}</div>
        <div class="date">{{ this.formattedDate(review.created_at) }}</div>
      </div>

    </div>
  </div>
</template>

<style>
.doc_reviews {
  overflow-y: auto;
  max-height: 400px;

  .review {
    border: 1px solid #efefef;

    .date {
      font-size: 0.7rem;
    }

    .firstName,
    .lastName {
      font-weight: bold;
    }

    .email {
      font-size: 0.9rem;
    }
  }
}
</style>