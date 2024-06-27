<script>
import { state } from "../state";

export default {
  name: "DoctorCard",
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
    // console.log(this.doc.reviews);
    this.getAverageVote();
  },
};
</script>

<template>
  <div class="doctor_card d-flex flex-column gap-3" :class="{ sponsored: doc.sponsorships.length > 0 }">
    <div class="profile_image">
      <template v-if="doc.photo == null">
        <img src="/img/DoctorAvatar.png" class="img-fluid" alt="Foto del dottore" />
      </template>

      <template v-else>
        <img :src="`${state.base_url}/storage/${doc.photo}`" class="img-fluid" alt="Foto del dottore"
          style="object-fit: cover" />
      </template>
    </div>

    <div>
      <span>
        <template v-for="i in 5" :key="i">
          <i v-if="i <= this.avgVote" class="fa-solid fa-star"></i>
          <i v-else class="fa-regular fa-star"></i>
        </template>
      </span>

      <div class="d-flex justify-content-center align-items-center">
        <span class="doctor_name"> Dr. {{ doc.surname }} {{ doc.user.name }}</span>

        <i v-if="doc.sponsorships.length > 0" class="ms-2 fa-solid fa-crown fa-lg"></i>
      </div>

      <div>
        <i class="color_primary fa-solid fa-stethoscope me-2"></i>
        <span class="doc_specialist" v-for="(spec, id) in doc.specializations">
          {{
            id != doc.specializations.length - 1
              ? spec.specialist + "," + " "
              : spec.specialist
          }}
        </span>
      </div>
    </div>

    <div class="doctor_info flex-fill">
      <div>
        <i class="color_primary fa-solid fa-location-dot me-2"></i>
        {{ doc.address }}
      </div>

      <div>
        <i class="color_primary fa-solid fa-phone me-2"></i>
        {{ doc.telephone }}
      </div>

      <div>
        <i class="color_primary fa-solid fa-at me-2"></i>
        {{ doc.user.email }}
      </div>

      <div>
        <i class="color_primary fa-solid fa-pen"></i>
        {{ doc.reviews.length }} reviews
      </div>
    </div>

    <button class="doctor_card_button btn mt-3">

      <router-link :to="{ name: 'DoctorProfile', params: { slug: doc.slug } }">
        Visit doctor profile
      </router-link>
    </button>

  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

i {
  color: var(--primary);
}

.doctor_card {
  position: relative;
  background-color: #fff;
  border-radius: 20px;
  width: 350px;
  height: 460px;
  filter: drop-shadow(0 0 0.75rem rgba(0, 0, 0, 0.1));
  text-align: center;
  padding: 20px;

  .doctor_name {
    font-size: 1.3rem;
    font-weight: bold;

    &+i {
      color: var(--secondary);
    }
  }

  .profile_image img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-top: -50px;
    border: 5px solid var(--primary);
  }

  h2 {
    font-size: 1.5em;
    margin: 10px 0 5px;
  }

  .doctor_card_button {
    cursor: pointer;
    border: none;
    padding: 0.9rem 2rem;
    letter-spacing: 0.05rem;
    font-weight: 700;
    font-size: 17px;
    border-radius: 500px;
    background-color: var(--primary);
    transition: all ease-in-out .3s;

    a {
      text-decoration: none;
      color: var(--light-1);
    }
  }

  .doctor_card_button:hover {
    background-color: var(--primary-hover);
  }

  .doctor_card_button:active {
    background-color: var(--primary-active);
  }

  .doctor_info {
    font-size: 0.9rem;
  }
}

.sponsored {
  i {
    color: var(--secondary);
  }

  .doctor_card_button {
    background-color: var(--secondary);
  }

  .doctor_card_button:hover {
    background-color: var(--secondary-hover);
  }

  .doctor_card_button:active {
    background-color: var(--secondary-active);
  }

  .profile_image img {
    border: 5px solid var(--secondary);
  }
}
</style>
