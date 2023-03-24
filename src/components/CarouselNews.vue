<template>
  <div class="carousel">
    <div class="carousel-container">
      <div
        class="carousel-card"
        :class="{ 'card-reged': reged }"
        v-for="(card, index) in sortedCards"
        :key="index"
      >
        <div class="q-pa-md carousel-content">
          <div
            class="my-card"
            v-if="cards.length"
            @click="openAlbionNew(card.redirection)"
          >
            <img
              alt="Quotes"
              src="~assets/images/quotes.png"
              style="width: 40px; height: 40px"
            />
            <div class="card-title">{{ card.title }}</div>
            <hr />
            <div class="card-body">
              <img
                class="new-image"
                alt="New image"
                :src="`https:${card.imageUrl}`"
                style="width: 100%"
              />
              <span class="description"> {{ card.description }}</span>
              <div class="time">
                {{ card.date }}
              </div>
            </div>
          </div>
          <div v-else class="loading-card">
            <div class="loading-title">
              <q-skeleton type="text" height="150px" />
              <q-skeleton type="text" class="text-subtitle1" />
              <q-skeleton type="text" width="50%" class="text-subtitle1" />
              <q-skeleton type="text" class="text-caption" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="progress-carousel" v-if="cards.length">
      <div class="limiter">
        <q-linear-progress
          :value="progressCarousel"
          size="1200"
          :animation-speed="1000"
          :class="{ 'proress-reged': reged }"
        />
      </div>
    </div>
    <div class="buttons-carousel" v-if="cards.length">
      <div
        class="custom-button"
        :class="{ 'buttons-reged': reged }"
        @click="prevCard"
      >
        <q-icon name="west" size="20px" />
      </div>
      <div
        class="custom-button"
        :class="{ 'buttons-reged': reged }"
        @click="nextCard"
      >
        <q-icon name="east" size="20px" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent, computed, onMounted } from "vue";
export default defineComponent({
  props: {
    cards: Array,
    reged: { Boolean, default: false },
  },
  setup(props) {
    const sizeCarousel = () => {
      if (window.innerWidth > 980) {
        return 3;
      } else if (window.innerWidth > 660) {
        return 2;
      } else {
        return 1;
      }
    };
    const activeIndex = ref(0);
    const cardsPerPage = ref(sizeCarousel());
    const progressCarousel = computed(() => {
      return activeIndex.value / (props.cards.length - 1);
    });
    const openAlbionNew = (url) => {
      window.open("https://albiononline.com" + url, "_blank");
    };
    const sortedCards = computed(() => {
      const nextIndex =
        activeIndex.value + 1 > props.cards.length - 1
          ? props.cards.length - (activeIndex.value + 1)
          : activeIndex.value + 1;
      const nextSecuenceIndex =
        activeIndex.value + 2 > props.cards.length - 1
          ? props.cards.length - activeIndex.value
          : activeIndex.value + 2;
      if (cardsPerPage.value === 3) {
        return [
          props.cards[activeIndex.value],
          props.cards[nextIndex],
          props.cards[nextSecuenceIndex],
        ];
      } else if (cardsPerPage.value === 2) {
        return [props.cards[activeIndex.value], props.cards[nextIndex]];
      } else {
        return [props.cards[activeIndex.value]];
      }
    });

    const nextCard = () => {
      activeIndex.value =
        activeIndex.value + 1 > props.cards.length - 1
          ? 0
          : activeIndex.value + 1;
    };

    const prevCard = () => {
      activeIndex.value =
        activeIndex.value - 1 < 0
          ? props.cards.length - 1
          : activeIndex.value - 1;
    };
    onMounted(() => {
      window.addEventListener("resize", () => {
        cardsPerPage.value = sizeCarousel();
      });
    });
    return {
      activeIndex,
      sortedCards,
      nextCard,
      prevCard,
      openAlbionNew,
      progressCarousel,
    };
  },
});
</script>

<style scoped lang="scss">
body.body--dark {
  .carousel {
    .carousel-container {
      .carousel-card {
        background-color: $darkMode--bg2;
        border-color: $divider-dark;
      }
      .carousel-content {
        .my-card {
          hr {
            border-color: $divider-dark;
          }
        }
      }
    }
  }
}
.carousel {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;

  .carousel-container {
    display: flex;
    justify-content: center;
    gap: 1px;

    width: 100%;
    .carousel-card {
      width: 100%;
      display: flex;
      max-width: 300px;
      flex-direction: column;
      border: 2px solid #ccc;
      background-color: white;
      border-radius: 10px;
      margin: 0 10px;
    }
    .card-reged {
      border: 1px solid white !important;
    }
    .carousel-content {
      padding: 0;
      overflow: hidden;
      cursor: pointer;

      .my-card {
        display: flex;
        flex-direction: column;
        text-align: left;
        height: 100%;
        padding: 15px;
        .card-title {
          margin: 8px 0px;
          font-size: 20px;
          line-height: 23px;
          font-weight: 500;
          min-height: 70px;
        }
        hr {
          margin: 5px 0 20px;
          width: 100%;
          border-top: 2px solid #cfcfcf;
        }
        .card-body {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          .new-image {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
          }
          span {
            font-size: 15px;
            padding: 10px 0 5px;
            min-height: 100px;
          }
          .time {
            padding: 5px 0 0 5px;
            text-align: right;
          }
        }
      }
    }
    .loading-card {
      width: 100%;
      padding: 0;
      max-width: 500px;
      .loading-title {
        margin: 5px 10px 30px;
      }
    }
  }
  .progress-carousel {
    width: 100%;
    padding: 15px 50px;
    .limiter {
      display: flex;
      justify-content: center;
      .q-linear-progress {
        max-width: 920px;
        color: #ff8a25;
      }
      .proress-reged {
        color: white !important;
      }
    }
  }
}
.buttons-carousel {
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 10px;
  padding-bottom: 10px;
  .custom-button {
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
    border: 4px solid #ff8a25;
    i {
      color: #ff8a25;
      font-weight: 900;
    }
  }
  .buttons-reged {
    border: 4px solid white;
    i {
      color: white !important;
    }
  }
}
</style>
