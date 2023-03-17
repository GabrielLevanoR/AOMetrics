<template>
  <q-page class="custom-page">
    <div class="container-most-fame q-pt-md q-pb-md">
      <div class="most-fame">
        <q-card class="card-section">
          <q-card-section class="custom-section">
            <span class="title">TOP FAME BATTLES</span>
            <q-select
              outlined
              v-model="selectedServer.top"
              :options="options"
              label="Server"
            />
          </q-card-section>
        </q-card>
        <BattleTable :battles="topFame" :applyStyle="true" />
      </div>
    </div>
    <div class="recent-battles q-pt-md q-pb-md">
      <q-card class="card-section">
        <q-card-section class="custom-section">
          <span class="title">RECENT BATTLES</span>
          <q-select
            outlined
            v-model="selectedServer.recent"
            :options="options"
            label="Server"
          />
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          <q-input
            outlined
            v-model="searchRecentBattle"
            label="Search player, guild or alliance"
          >
            <template v-slot:append>
              <q-btn round dense flat icon="search" @click="onClickSearch" />
            </template>
          </q-input>
        </q-card-section>
      </q-card>
      <BattleTable :battles="recentBattles" />
    </div>
  </q-page>
</template>
<script>
import { api } from "src/boot/axios";
import BattleTable from "src/components/BattleTable.vue";
import { defineComponent, onMounted, ref, watch, reactive } from "vue";
import useTimeConverters from "../composables/useTimeConverters.js";
export default defineComponent({
  setup() {
    const { toFormatDate } = useTimeConverters();
    const topFame = ref([]);
    const searchRecentBattle = ref("");
    const options = ref(["All", "West", "East"]);
    const selectedServer = reactive({ top: "All", recent: "All" });
    const recentBattles = ref([]);
    const onClickSearch = async () => {
      await getRecentBattles();
    };
    const getTopFameBattles = async () => {
      try {
        let server = selectedServer.top === "All" ? "" : selectedServer.top;
        server = server.toLocaleLowerCase();
        const response = await api.get(`/battles/top-fame?server=${server}`);
        topFame.value = response.data.docs;
        topFame.value[0].firstStyle = true;
        topFame.value.forEach((item, index) => {
          topFame.value[index] = {
            ...topFame.value[index],
            ...toFormatDate(topFame.value[index].startTime),
          };
        });
      } catch (error) {
        console.log(error);
      }
    };
    const getRecentBattles = async () => {
      try {
        let server =
          selectedServer.recent === "All" ? "" : selectedServer.recent;
        server = server.toLocaleLowerCase();
        const response = await api.get(
          `/battles?search=${searchRecentBattle.value}&server=${server}`
        );
        recentBattles.value = response.data.docs;
        recentBattles.value[0].firstStyle = true;

        recentBattles.value.forEach((item, index) => {
          recentBattles.value[index] = {
            ...recentBattles.value[index],
            ...toFormatDate(recentBattles.value[index].startTime),
          };
        });
      } catch (error) {
        console.log(error);
      }
    };

    watch(
      () => selectedServer.top,
      async (newServer, oldServer) => {
        if (oldServer != newServer) {
          await getTopFameBattles();
        }
      }
    );
    watch(
      () => selectedServer.recent,
      async (newServer, oldServer) => {
        if (oldServer != newServer) {
          await getRecentBattles();
        }
      }
    );
    onMounted(() => {
      getTopFameBattles();
      getRecentBattles();
    });
    return {
      topFame,
      options,
      selectedServer,
      searchRecentBattle,
      recentBattles,
      onClickSearch,
    };
  },
  components: { BattleTable },
});
</script>
<style lang="scss" scoped>
.custom-page {
  display: flex;
  flex-direction: column;
  background-color: rgba(252, 219, 179, 0.123);
}

.most-fame,
.recent-battles {
  margin: 10px 15px 20px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .card-section {
    width: 100%;
    max-width: 1200px;
    .title {
      font-size: 18px;
      font-weight: bold;
    }
    .custom-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .q-select {
        min-width: 150px;
      }
      .q-input {
        width: 100%;
      }
    }
  }
  @media screen and(max-width:470px) {
    .card-section {
      text-align: center;
      .title {
        margin: 10px 0;
      }
      .q-card__section {
        flex-direction: column;
        justify-content: center;
        .q-select {
          min-width: 100%;
        }
      }
    }
  }
}
</style>
