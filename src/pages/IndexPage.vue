<template>
  <q-page class="flex column">
    <div class="back-gradient row justify-center">
      <div class="content-gradient justify-center">
        <div class="text-gradient column">
          <h1>More accessible tools</h1>
          <span
            >Find a wide variety of graphics in the different activities of
            Albion Online, such as the price of items in the market, battle
            reports, among many others.</span
          >
        </div>
        <div class="img-gradient row justify-center">
          <img
            class="logo-cy"
            alt="Quasar logo"
            src="~assets/images/albionMetricsHd.png"
            style="width: 100%; max-width: 500px; min-width: 400px"
          />
        </div>
      </div>
    </div>
    <div class="about">
      <h4>About Albion Metrics</h4>
      <div>
        We seek to implement a wide variety of useful and reliable tools for
        Albion Online users on a single website, to make it easier to access and
        greatly assist in tasks that can be very complicated.
      </div>
      <div class="text-weight-bold q-mt-lg q-mb-lg">
        <h4>Important</h4>
        Albion Metric is currently under development, so you can only access the
        battle report and some Albion Online news, we hope to have more tools in
        the future.
      </div>
    </div>
    <div class="offers-cy" v-if="false">
      <OfferCy color="#FF8A25">
        <template #icon>
          <CalcOffer />
        </template>
        <template #heading>Calculators</template>

        Find the best prices in the markets
      </OfferCy>
      <OfferCy color="#FFD75F">
        <template #icon>
          <GraphOffer />
        </template>
        <template #heading>Graphics</template>

        Discover the most appropriate way to generate profit
      </OfferCy>
      <OfferCy color="#FF4359">
        <template #icon>
          <ReportOffer />
        </template>
        <template #heading>Battle Report</template>

        Quick publication of the last battles
      </OfferCy>
    </div>
    <div class="dowload-albion">
      <div class="container">
        <img
          src="~assets/images/albion-wallpaper.jpeg"
          alt="Albion Image"
          style="max-width: 100%; max-height: 300px"
        />
        <div class="body-container">
          <h4>Download Albion Online</h4>
          <div class="description">
            Albion Online is a fantasy sandbox MMORPG featuring a player-driven
            economy, classless combat system, and intense PvP battles. Explore a
            vast open world full of danger and opportunity.
          </div>
          <div class="avalible-on">
            <span>Avalible on:</span>
            <div class="icons-av">
              <div
                class="icon-bordered"
                @click="openRedirect(`https://albiononline.com/download`)"
              >
                <q-icon name="fa-solid fa-laptop" size="20px" />
              </div>
              <div
                class="icon-bordered"
                @click="
                  openRedirect(`https://apps.apple.com/us/app/id1202788573`)
                "
              >
                <q-icon name="fa-brands fa-apple" size="20px" />
              </div>
              <div
                class="icon-bordered"
                @click="
                  openRedirect(
                    `https://play.google.com/store/apps/details?id=com.albiononline&pli=1`
                  )
                "
              >
                <q-icon name="fa-brands fa-android" size="20px" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="news-cy">
      <h4>Albion News</h4>
      <div class="gray-title">Developer</div>
      <CarouselNews :cards="cardsDev" />
      <div class="gray-title">Community</div>
      <CarouselNews :cards="cardsComm" />
    </div>
  </q-page>
</template>

<script>
import CalcOffer from "src/assets/svg/CalcOffer.vue";
import GraphOffer from "src/assets/svg/GraphOffer.vue";
import ReportOffer from "src/assets/svg/ReportOffer.vue";
import { api } from "src/boot/axios";
import CarouselNews from "src/components/CarouselNews.vue";
import OfferCy from "src/components/OfferCy.vue";
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "IndexPage",
  components: { OfferCy, CalcOffer, GraphOffer, ReportOffer, CarouselNews },
  setup() {
    const cardsComm = ref([]);
    const cardsDev = ref([]);
    const getDevNews = async () => {
      try {
        const { data } = await api.get("/developerNews");
        cardsDev.value = data;
      } catch (error) {
        console.log(error);
      }
    };
    const getCommNews = async () => {
      try {
        const { data } = await api.get("/communityNews");
        cardsComm.value = data;
      } catch (error) {
        console.log(error);
      }
    };
    const openRedirect = (url) => {
      window.open(url, "_blank");
    };
    onMounted(() => {
      getDevNews();
      getCommNews();
    });
    return {
      cardsDev,
      cardsComm,
      openRedirect,
    };
  },
});
</script>
<style scoped lang="scss">
.back-gradient {
  min-height: 600px;
  background: rgb(255, 126, 0);
  background: linear-gradient(
    -45deg,
    rgba(255, 126, 0, 0.24833683473389356) 0%,
    rgba(254, 254, 0, 0.15029761904761907) 50%,
    rgba(176, 254, 217, 0.22032563025210083) 100%
  );
}
.content-gradient {
  display: flex;
  flex-direction: row;
  margin: 50px 5%;
  max-width: 1500px;
  .text-gradient {
    justify-content: center;
    align-items: flex-start;
    h1,
    span {
      padding: 0px 28px;
    }
    h1 {
      font-size: 50px;
      text-align: left;
      font-weight: 700;
      line-height: 1;
      letter-spacing: -0.005em;
      margin: 0;
      margin-bottom: 18px;
    }
    span {
      font-size: 20px;
      line-height: 1.1;
    }
  }
  .img-gradient {
    align-items: center;
  }
}
.about {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  h4 {
    font-size: 28px;
    margin-bottom: 25px;
    font-weight: bolder;
  }
  div {
    font-size: 16px;
  }
  h4,
  div {
    padding: 0 50px;
    max-width: 800px;
  }
}
.offers-cy {
  margin: 40px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 20px 0 0;
  gap: 20px;
  .card-cy {
    max-width: 220px;
  }
}
.dowload-albion {
  background: rgb(255, 0, 0);
  background: linear-gradient(
    132deg,
    rgba(255, 0, 0, 0.6348914565826331) 0%,
    rgba(255, 215, 95, 1) 100%
  );
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 60px 20px;
  .container {
    display: flex;
    max-width: 900px;
    img {
      border-radius: 15px;
      border: 8px solid white;
    }
    .body-container {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      margin-left: 10px;
      height: 100%;
      h4 {
        font-weight: 600;
        font-size: 28px;
        background: white;
        border-radius: 15px;
        padding: 15px;
        margin: 0 0 10px;
      }
      .description {
        background: white;
        border-radius: 15px;
        padding: 15px;
        font-size: 16px;
      }
      .avalible-on {
        display: flex;
        margin-top: 10px;
        gap: 10px;
        .icons-av {
          display: flex;
          gap: 10px;
        }
        span,
        .icon-bordered {
          cursor: pointer;
          background-color: white;
          padding: 15px;
          border-radius: 15px;
        }
        span {
          font-size: 16px;
        }
      }
    }
  }
}
.news-cy {
  text-align: center;
  h4 {
    margin: 25px 0 5px;
    font-weight: 600;
  }
  .gray-title {
    font-size: 29px;
    margin: 0 0 10px;
    font-weight: 500;
    color: gray;
  }
}
@media screen and (max-width: 1050px) {
  .content-gradient {
    flex-direction: column-reverse;
    .text-gradient {
      align-items: center;
      h1,
      span {
        text-align: center;
      }
      h1 {
        margin-top: 20px;
      }
    }
    .img-gradient {
      img {
        margin: 0;
        height: auto;
        max-width: 350px !important;
        width: 100%;
        min-width: auto !important;
      }
    }
  }
  .dowload-albion {
    .container {
      flex-direction: column;
      align-items: center;
      .body-container {
        width: 100% !important;
        margin-top: 10px;
        margin-left: 0;
        max-width: 500px;
      }
    }
  }
}
@media screen and (max-width: 780px) {
  .content-gradient {
    .text-gradient {
      h1 {
        font-size: 35px;
      }
      span {
        font-size: 17px;
      }
    }
  }
  .offers-cy {
    flex-direction: column;
    .card-cy {
      max-width: 100%;
      padding: 0px 10px;
    }
  }
}
@media screen and (max-width: 350px) {
  .avalible-on {
    flex-direction: column;
    .icons-av {
      justify-content: center;
    }
    .icon-bordered {
      max-width: 50px;
    }
  }
}
</style>
