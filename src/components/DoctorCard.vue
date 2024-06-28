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
  <div class="doctor_card d-flex flex-column" :class="{ sponsored: doc.sponsorships.length > 0 }">
    <div class="profile_image">
      <template v-if="doc.photo == null">
        <img src="/img/DoctorAvatar.png" class="img-fluid" alt="Foto del dottore" />
      </template>

      <template v-else>
        <img :src="`${state.base_url}/storage/${doc.photo}`" class="img-fluid" alt="Foto del dottore"
          style="object-fit: cover" />
      </template>
    </div>

    <div class="mt-3 mt-xl-4 flex-grow-1 flex-md-grow-0 mb-md-3">
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

      <div class="small">
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

    <div class="doctor_info small flex-grow-1 d-flex flex-column justify-content-center">
      <div>
        <i class="fa-solid fa-file-pen"></i>
        Number of reviwes:
        {{ doc.reviews.length }}
      </div>
    </div>

    <div class="d-grid">
      <button class="doctor_card_button btn mt-3">

        <router-link :to="{ name: 'DoctorProfile', params: { slug: doc.slug } }">
          Visit doctor profile
        </router-link>
      </button>
    </div>

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

.flex-fill {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.d-grid {
  flex: 0 0 auto;
  padding: 5% 5%;
}

.doctor_card {
  aspect-ratio: 3 / 4;
  width: 100%;
  max-width: 300px;
  min-height: 400px;
  position: relative;
  background-color: #fff;
  border-radius: 20px;
  filter: drop-shadow(0 0 0.75rem rgba(0, 0, 0, 0.1));
  text-align: center;
  padding: 20px 15px;

  .doctor_name {
    font-size: clamp(1rem, 3vw, 1.2rem);
    font-weight: bold;
    word-break: break-word;

    &+i {
      color: var(--secondary);
    }
  }

  .doctor_info {
    flex: 0 0 auto;
    padding: 10px 0;
  }

  .profile_image {
    flex: 0 0 auto;


    img {
      width: 70%;
      aspect-ratio: 1 / 1;
      max-width: 100%;
      object-fit: cover;
      border-radius: 50%;
      margin-top: -50px;
      border: 5px solid var(--primary);
    }
  }

  h2 {
    font-size: 1.5em;
    margin: 10px 0 5px;
  }

  .doctor_card_button {
    border: none;
    width: 100%;
    padding: 0.5em 0.5em;
    font-size: clamp(0.7rem, 1.5vw, 1rem);
    letter-spacing: 0.05rem;
    font-weight: 700;
    border-radius: 500px;
    background-color: var(--primary);
    transition: all ease-in-out .3s;

    a {
      text-decoration: none;
      color: var(--light-1);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
    }
  }

  .doctor_card_button:hover {
    background-color: var(--primary-hover);
  }

  .doctor_card_button:active {
    background-color: var(--primary-active);
  }

  .doctor_info {
    font-size: 0.85rem;
    word-break: break-word;
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

/* #region :::: MEDIA QUERIES :::: */

@media (min-width: 1200px) {

  .doctor_info {
    flex: 1 1 auto;
    padding: 10px 0;
  }

  .profile_image {
    flex: 0 0 auto;
    padding-bottom: 30%;
    position: relative;

    img {
      position: absolute;
      top: -50%;
      left: 50%;
      transform: translateX(-50%);
      width: 70%;
      aspect-ratio: 1 / 1;
      max-width: 100%;
      object-fit: cover;
      border-radius: 50%;
      margin-top: -50px;
      border: 5px solid var(--primary);
    }
  }
}

@media (min-width: 768px) and (max-width: 1199px) {
  .doctor_card {
    padding: 15px 10px;
  }

  .d-grid {
    padding: 3% 3%;
  }

  .doctor_card_button {
    font-size: clamp(0.6rem, 1.2vw, 0.9rem);
    padding: 0.4em 0.4em;
  }

  .doctor_card_button a {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

@media (max-width: 576px) {

  .doctor_card {
    min-height: 350px;
  }

  .doctor_card_button {
    font-size: clamp(0.7rem, 2vw, 0.9rem);
  }
}

/* #endregion :::: MEDIA QUERIES :::: */
</style>
