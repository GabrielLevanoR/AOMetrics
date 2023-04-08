<template>
  <div class="container-top-guilds">
    <div class="top-guilds">
      <div class="title-section flex justify-between">
        <div>
          <div class="title">HIGHEST GUILD FAME OF THE WEEK</div>
          <span class="extra-title">Every Monday the top restarts</span>
        </div>
        <q-select
          outlined
          v-model="selectedServer"
          :options="options"
          label="Server"
        />
      </div>
      <div class="q-mb-md text-center text-weight-thin text-italic">
        <span style="font-size: 13px; font-weight: bold">
          The top only counts battles that have a total fame of 200k or higher,
          considering that the guild has more than 15 players in that
          battle.</span
        >
        <div>The top is updated for each registered battle</div>
      </div>
      <div class="three-first-guilds" v-if="sliceGuildsTop.length">
        <q-card
          class="top-guild"
          v-for="(guild, index) in sliceGuildsTop"
          :key="guild"
        >
          <q-dialog v-model="moreInfoGuild">
            <q-card>
              <q-card-section>
                <div class="text-h6">{{ dialogInfo.name }}</div>
              </q-card-section>
              <q-separator class="q-mt-sm q-mb-sm" />
              <q-card-section>
                <span class="text-weight-bold">{{ dialogInfo.name }}</span>
                has achieved position
                <span class="text-weight-bold">{{ dialogInfo.position }}</span>
                this week with a total of
                {{ dialogInfo.battles.length }} battles:
                <div class="stats-guild">
                  <div class="guild-position flex justify-between">
                    <div class="text-center">
                      <span class="text-weight-bold">New Position: </span>
                      <div>{{ dialogInfo.newPosition + 1 }}</div>
                    </div>
                    <div class="text-center">
                      <span class="text-weight-bold">Old Position: </span>
                      <div>{{ dialogInfo.oldPosition + 1 }}</div>
                    </div>
                  </div>
                  <div class="battles-log text-center">
                    <span class="text-weight-bold"
                      >The battles considered were</span
                    >
                    <q-scroll-area style="height: 100px">
                      <div v-for="battle in dialogInfo.battles" :key="battle">
                        <div
                          class="battle-link"
                          @click="redirectBattle(battle)"
                        >
                          {{ battle }}
                        </div>
                      </div>
                    </q-scroll-area>
                  </div>
                  <div class="info-battles q-mt-md">
                    Some battles may no longer be available on this site
                  </div>
                  <div class="last-update text-weight-bold">
                    Last update: {{ toFormatDate(dialogInfo.updatedAt).time }}
                    {{ toFormatDate(dialogInfo.updatedAt).date }}
                  </div>
                </div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn flat label="OK" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <q-card-section>
            <div class="header-card">
              <div class="server-card">
                {{ guild.server }}
              </div>
              <IconPosition :position="guild.position" />
            </div>
            <div class="container-top">
              <div class="svg-place">
                <i>
                  <FirstPlace style="width: 80px" v-if="index === 0" />
                  <SecPlace style="width: 80px" v-if="index === 1" />
                  <ThirPlace style="width: 80px" v-if="index === 2" />
                </i>
              </div>
              <div class="guild-data text-weight-bold">
                <div class="guild-name">{{ guild.name }}</div>
                <div class="guild-fame">
                  {{ formatNumber(guild.totalFame) }} earned fame
                </div>
              </div>
            </div>
            <div class="icon-battles" @click="setInfoDialog(guild, index)">
              <q-icon
                name="fa-solid fa-arrow-up-right-from-square"
                color="orange"
                size="1.2rem"
              />
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="extra-info">
              <div class="first-row">
                <div class="guild-info">
                  <span>Kills:</span>
                  <div>{{ guild.totalKills }}</div>
                </div>
                <div class="guild-info">
                  <span>Deaths:</span>
                  <div>{{ guild.totalDeaths }}</div>
                </div>
                <div class="guild-info">
                  <span>Battles:</span>
                  <div>{{ guild.battles.length }}</div>
                </div>
              </div>
            </div></q-card-section
          >
        </q-card>
      </div>
      <div class="table-guilds q-mt-md" v-if="topGuilds.length">
        <TableTopGuilds :battles="topGuilds" />
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "src/boot/axios";
import useFormatNumber from "src/composables/useFormatNumber";
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import FirstPlace from "../assets/svg/FirstPlace.vue";
import SecPlace from "../assets/svg/SecPlace.vue";
import ThirPlace from "../assets/svg/ThirPlace.vue";
import IconPosition from "./IconPosition.vue";
import TableTopGuilds from "./TableTopGuilds.vue";
import useTimeConverters from "src/composables/useTimeConverters";

export default {
  components: {
    FirstPlace,
    SecPlace,
    ThirPlace,
    IconPosition,
    TableTopGuilds,
  },
  setup() {
    const { toFormatDate } = useTimeConverters();
    const { formatNumber } = useFormatNumber();
    const topGuilds = ref([]);
    const sliceGuildsTop = ref([]);
    const router = useRouter();
    const selectedServer = ref("All");
    const options = ref(["All", "West", "East"]);
    const moreInfoGuild = ref(false);
    const getTopGuilds = async () => {
      try {
        topGuilds.value = [];
        let toServer =
          selectedServer.value === "All" ? "" : selectedServer.value;
        toServer = toServer.toLocaleLowerCase();

        const response = await api.get(`/topGuilds?server=${toServer}`);
        sliceGuildsTop.value = response.data.slice(0, 3);
        topGuilds.value = response.data.slice(3);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    const dialogInfo = ref({});
    const setInfoDialog = (guild, index) => {
      moreInfoGuild.value = true;
      dialogInfo.value = { ...guild, position: index + 1 };
    };
    const redirectBattle = (idBattle) => {
      router.push({ name: "BattleSelected", params: { id: idBattle } });
    };
    onMounted(() => {
      getTopGuilds();
    });
    watch(
      () => selectedServer.value,
      async (newServer, oldServer) => {
        if (oldServer != newServer) {
          await getTopGuilds();
        }
      }
    );
    return {
      sliceGuildsTop,
      formatNumber,
      dialogInfo,
      setInfoDialog,
      moreInfoGuild,
      redirectBattle,
      toFormatDate,
      topGuilds,
      options,
      selectedServer,
    };
  },
};
</script>

<style lang="scss" scoped>
body.body--dark {
  :global(.battle-link:hover) {
    background-color: rgb(63, 63, 63) !important;
  }
  .q-icon {
    color: #ff9800 !important;
  }
  .container-top-guilds {
    background-color: rgb(20, 20, 20);
  }
  .three-first-guilds {
    .q-card {
      background-color: $darkMode--bg2 !important;
    }
  }
  .top-guilds {
    .title-section {
      .extra-title {
        color: rgb(175, 175, 175);
      }
    }
  }
}
.container-top-guilds {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 15px 25px;
  background-color: rgb(240, 240, 240);

  .top-guilds {
    padding: 10px 0px;
    max-width: 1200px;
    width: 100%;
    .title-section {
      padding: 15px 0px;
      .q-select {
        width: 140px;
      }
      .title {
        font-size: 15px;
        font-weight: bold;
      }
      .extra-title {
        color: rgb(88, 88, 88);
      }
    }
    .three-first-guilds {
      min-width: 100%;
      display: flex;
      gap: 10px;
      .top-guild {
        width: 100%;
        background-color: white;
        .header-card {
          display: flex;
          justify-content: space-between;
          min-height: 42px;
          .server-card {
            font-weight: bold;
            text-transform: uppercase;
            font-size: 12px;
          }
        }
        .container-top {
          text-align: center;
          .svg-place {
            margin: 0;
            padding: 0;
          }
          .guild-name {
            font-size: 17px;
          }
          .guild-fame {
            font-weight: 300;
          }
        }
        .icon-battles {
          width: 100%;
          display: flex;
          justify-content: flex-end;
          cursor: pointer;
        }
        .extra-info {
          .first-row {
            display: flex;
            justify-content: space-between;
            text-align: center;
            .guild-info {
              width: 100%;
              span {
                font-weight: bold;
              }
            }
          }
        }
        :global(.battle-link) {
          cursor: pointer;
        }
        :global(.battle-link:hover) {
          background-color: rgb(223, 223, 223);
        }
      }
    }
    @media screen and (max-width: 850px) {
      .three-first-guilds {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
    @media screen and (max-width: 640px) {
      .title-section {
        flex-direction: column;
        text-align: center;
        .q-select {
          margin-top: 10px;
          width: 100%;
        }
      }
    }
  }
}
</style>
