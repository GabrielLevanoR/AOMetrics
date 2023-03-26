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
          <div class="options-header">
            <q-btn
              color="primary"
              text-color="white"
              label="Show multiple battle"
              class="q-mr-md"
              v-if="multiBattle"
              v-on:click="getIdsRequest"
            />
            <q-select
              outlined
              v-model="selectedServer.recent"
              :options="options"
              label="Server"
            />
          </div>
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          <div class="custom-section">
            <div>Searching for new battles in: {{ countdown }}</div>
            <div class="more-options">
              <q-toggle
                v-model="largeBattle"
                label="Only big battles"
                left-label
              />
              <q-toggle
                v-model="multiBattle"
                label="Multiple battles"
                left-label
              />
            </div>
          </div>
          <q-input
            outlined
            v-model="searchRecentBattle"
            label="Search player, guild or alliance"
            @keyup.enter="getRecentBattles()"
          >
            <template v-slot:append>
              <q-btn round dense flat icon="search" @click="onClickSearch" />
            </template>
          </q-input>
        </q-card-section>
      </q-card>
      <BattleTableServerSide
        :battles="recentBattles"
        @serverSide="requestBattles"
        :multiBattle="multiBattle"
        ref="child"
      />
    </div>
  </q-page>
</template>
<script>
import { api } from "src/boot/axios";
import BattleTable from "src/components/BattleTable.vue";
import BattleTableServerSide from "src/components/BattleTableServerSide.vue";
import { defineComponent, onMounted, ref, watch, reactive } from "vue";
import useTimeConverters from "../composables/useTimeConverters.js";
import { useMeta } from "quasar";

export default defineComponent({
  setup() {
    useMeta(() => {
      return {
        title: "Albion Metrics | Battle reports & Search battle",
        meta: {
          description: {
            name: "description",
            content:
              "Get a report of the most recent and big battles in Albion Online, search by player name, guild, alliance and server to get a better search result",
          },
          keywords: {
            name: "keywords",
            content:
              "Albion Online, Battles, Battle report, killboard, east server, west server",
          },
        },
      };
    });
    const { toFormatDate } = useTimeConverters();
    const topFame = ref([]);
    const offset = ref(0);
    const countdown = ref(60);
    const largeBattle = ref(true);
    const multiBattle = ref(false);
    const child = ref(null);
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
        const response = await api.get(
          `/battles/top-fame?server=${server}&offset=${0}`
        );
        topFame.value = response.data;
        topFame.value = stylingRows(topFame.value);
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
          `/battles?search=${searchRecentBattle.value}&server=${server}&offset=${offset.value}&largeOnly=${largeBattle.value}`
        );
        recentBattles.value = response.data;
        recentBattles.value = stylingRows(recentBattles.value);
      } catch (error) {
        console.log(error);
      }
    };
    const stylingRows = (battleResp) => {
      battleResp.docs[0].firstStyle = true;
      battleResp.docs.forEach((item, index) => {
        battleResp.docs[index] = {
          ...battleResp.docs[index],
          ...toFormatDate(battleResp.docs[index].startTime),
        };
      });
      return battleResp;
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
    watch(
      () => largeBattle.value,
      async () => {
        await getRecentBattles();
      }
    );
    const requestBattles = async (propert) => {
      offset.value = propert.pagination.page * 20 - 20;
      await getRecentBattles();
    };
    const getIdsRequest = () => {
      child.value.filterIds();
    };
    setInterval(async () => {
      countdown.value--;
      if (countdown.value === 0) {
        await getRecentBattles();
        countdown.value = 60;
      }
    }, 1000);
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
      requestBattles,
      largeBattle,
      getRecentBattles,
      countdown,
      multiBattle,
      getIdsRequest,
      child,
    };
  },
  components: { BattleTable, BattleTableServerSide },
});
</script>
<style lang="scss" scoped>
body.body--dark {
  .custom-page {
    background: $darkMode;
  }
  .title {
    color: $primary !important;
  }
}
.custom-page {
  display: flex;
  flex-direction: column;
  background: rgb(248, 248, 248);
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
      .more-options {
        display: flex;
        flex-direction: row;
      }
      .options-header {
        display: flex;
      }
      .q-select {
        min-width: 150px;
      }
      .q-input {
        width: 100%;
      }
    }
  }
  @media screen and(max-width:610px) {
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
    :deep(.custom-section) {
      flex-direction: column;
      justify-content: center !important;
      align-items: center !important;
      .options-header {
        width: 100%;
        flex-direction: column;

        .q-btn {
          margin: 0 0 10px 0;
          width: 100%;
        }
      }
    }
  }
}
</style>
