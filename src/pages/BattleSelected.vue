<template>
  <q-page class="custom-page flex justify-center" v-if="!battle">
    <div class="loading">
      <q-circular-progress
        indeterminate
        size="65px"
        :thickness="0.22"
        rounded
        color="orange"
        track-color="grey-3"
        class="q-ma-md"
      />
    </div>
  </q-page>
  <q-page class="custom-page" v-else>
    <div class="battle-desc q-pa-md">
      <q-card>
        <q-card-section class="custom-section">
          <span class="title">BATTLE REPORT</span>
          <OnClickTooltip :textToDisplay="battle.id" />
        </q-card-section>
      </q-card>
      <div
        class="battle-desc-body"
        style="
          width: 100%;
          display: flex;
          justify-content: center;
          margin: 10px 0;
        "
      >
        <div class="battle-stats q-pt-md q-pb-md">
          <q-card class="head-card">
            <q-card-section class="flex justify-between">
              <div class="title q-mb-sm">BATTLE INFO</div>
              <div class="details">
                <div class="flex justify-between">
                  <span>Start date:</span> <span>{{ battle.date }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Time:</span> <span>{{ battle.time }} UTC</span>
                </div>
                <div class="flex justify-between">
                  <span>Duration:</span> <span>{{ battle.duration }}</span>
                </div>
                <hr />
                <div class="flex justify-between">
                  <span>Total fame:</span
                  ><span>{{ formatNumber(battle.totalFame) }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Total kills</span>
                  <span>{{ battle.totalKills }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Total players</span>
                  <span>{{ battle.players.list.length }}</span>
                </div>
              </div>
            </q-card-section>
          </q-card>
          <q-card class="head-card">
            <q-card-section>
              <span class="title">HIGHEST AVERAGE IP</span>
              <div v-if="chartsToShow[4]">
                <BarChart
                  class="battle-chart"
                  :series="chartsToShow[4].series"
                  :chartOptions="chartsToShow[4].options"
                  :color="'#C8059B'"
                  :format="'ip'"
                />
              </div>
            </q-card-section>
          </q-card>
          <q-card class="head-card">
            <q-card-section>
              <span class="title">MOST KILLS</span>
              <div v-if="chartsToShow[1]">
                <BarChart
                  class="battle-chart"
                  :series="chartsToShow[1].series"
                  :chartOptions="chartsToShow[1].options"
                  :color="'#FF4359'"
                />
              </div>
            </q-card-section>
          </q-card>
          <q-card class="head-card">
            <q-card-section>
              <span class="title">MOST PLAYERS</span>
              <div v-if="chartsToShow[2]">
                <BarChart
                  class="battle-chart"
                  :series="chartsToShow[2].series"
                  :chartOptions="chartsToShow[2].options"
                  :color="'#DFCA16'"
                />
              </div>
            </q-card-section>
          </q-card>
          <q-card class="bottom-card">
            <q-card-section>
              <span class="title">MOST FAME</span>
              <div v-if="chartsToShow[0]">
                <BarChart
                  class="battle-chart"
                  :series="chartsToShow[0].series"
                  :chartOptions="chartsToShow[0].options"
                />
              </div>
            </q-card-section>
          </q-card>
          <q-card class="bottom-card">
            <q-card-section>
              <span class="title">MOST DEATHS</span>
              <div v-if="chartsToShow[3]">
                <BarChart
                  class="battle-chart"
                  :series="chartsToShow[3].series"
                  :chartOptions="chartsToShow[3].options"
                  :color="'#A6A6A6'"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="battle-high-stats">
          <div class="stats-card">
            <q-card style="height: 100%">
              <q-card-section>
                <div class="title q-mb-sm">HIGHEST DROP FAME</div>
                <div class="q-mb-sm">
                  <div class="flex justify-between">
                    <span>Total fame:</span>
                    <span class="text-weight-bolder">{{
                      formatNumber(battle.mostExpensiveDeath.player.DeathFame)
                    }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Guild:</span>
                    <span class="text-weight-bolder">{{
                      battle.mostExpensiveDeath.player.GuildName
                    }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Name:</span>
                    <span class="text-weight-bolder">{{
                      battle.mostExpensiveDeath.player.Name
                    }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>IP:</span>
                    <span class="text-weight-bolder">{{
                      Math.round(
                        battle.mostExpensiveDeath.player.AverageItemPower
                      )
                    }}</span>
                  </div>
                </div>
                <div class="title">EQUIPMENT</div>
                <div class="equipment-player q-mb-sm q-mt-sm">
                  <ItemRender
                    v-for="item in orderEquipment(
                      battle.mostExpensiveDeath.player.Equipment
                    )"
                    :key="item"
                    :item-name="item.Type"
                    :item-quality="item.Quality"
                    :item-count="item.Count"
                  />
                </div>
                <div
                  v-if="
                    deleteNulls(battle.mostExpensiveDeath.player.Inventory)
                      .length
                  "
                >
                  <div class="title q-mb-sm">INVENTORY</div>
                  <div class="iventory-player q-mb-sm q-mt-sm">
                    <ItemRender
                      v-for="item in deleteNulls(
                        battle.mostExpensiveDeath.player.Inventory
                      )"
                      :key="item"
                      :item-name="item.Type"
                      :item-quality="item.Quality"
                      :item-count="item.Count"
                    />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="stats-card">
            <q-card class="q-mb-sm">
              <q-card-section>
                <div class="flex justify-between">
                  <div class="title">HIGHEST ASSISTS</div>
                  <WrongData />
                </div>
                <div
                  class="high-player"
                  v-if="battle.highestAssists.players[0].totalKillContribution"
                >
                  <div class="description q-mr-sm">
                    <div class="flex justify-between">
                      <span>Name:</span>
                      <span class="text-weight-bolder">{{
                        battle.highestAssists.players[0].name
                      }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>Guild:</span>
                      <span class="text-weight-bolder">{{
                        battle.highestAssists.players[0].guildName
                      }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>Total Assists:</span>
                      <span class="text-weight-bolder">{{
                        battle.highestAssists.players[0].totalKillContribution
                      }}</span>
                    </div>
                  </div>
                  <ItemRender
                    :item-name="
                      battle.highestAssists.players[0].equipment.mainhand
                    "
                    :item-quality="0"
                    :item-count="1"
                  />
                </div>
              </q-card-section>
            </q-card>
            <q-card
              class="q-mb-sm"
              v-if="battle.highestDamagePlayer.players[0].totalDamage"
            >
              <q-card-section>
                <div class="flex justify-between">
                  <div class="title">HIGHEST DAMAGE</div>
                  <WrongData />
                </div>
                <div class="high-player">
                  <div class="description q-mr-sm">
                    <div class="flex justify-between">
                      <span>Name:</span>
                      <span class="text-weight-bolder">{{
                        battle.highestDamagePlayer.players[0].name
                      }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>Guild:</span>
                      <span class="text-weight-bolder">{{
                        battle.highestDamagePlayer.players[0].guildName
                      }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>Total Damage:</span>
                      <span class="text-weight-bolder">{{
                        formatNumber(
                          battle.highestDamagePlayer.players[0].totalDamage
                        )
                      }}</span>
                    </div>
                  </div>
                  <ItemRender
                    :item-name="
                      battle.highestDamagePlayer.players[0].equipment.mainhand
                    "
                    :item-quality="0"
                    :item-count="1"
                  />
                </div>
              </q-card-section>
            </q-card>
            <q-card
              class="q-mb-sm"
              v-if="battle.highestHealingPlayer.players[0].totalHealing"
            >
              <q-card-section>
                <div class="flex justify-between">
                  <div class="title">HIGHEST HEALING</div>
                  <WrongData />
                </div>
                <div class="high-player">
                  <div class="description q-mr-sm">
                    <div class="flex justify-between">
                      <span>Name:</span>
                      <span class="text-weight-bolder">{{
                        battle.highestHealingPlayer.players[0].name
                      }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>Guild:</span>
                      <span class="text-weight-bolder">{{
                        battle.highestHealingPlayer.players[0].guildName
                      }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>Total Damage:</span>
                      <span class="text-weight-bolder">{{
                        formatNumber(
                          battle.highestHealingPlayer.players[0].totalHealing
                        )
                      }}</span>
                    </div>
                  </div>
                  <ItemRender
                    :item-name="
                      battle.highestHealingPlayer.players[0].equipment.mainhand
                    "
                    :item-quality="0"
                    :item-count="1"
                  />
                </div>
              </q-card-section>
            </q-card>
            <q-card>
              <q-card-section>
                <div class="flex justify-between">
                  <div class="title">HIGHEST KILLS</div>
                  <WrongData />
                </div>
                <div class="high-player">
                  <div class="description q-mr-sm">
                    <div class="flex justify-between">
                      <span>Name:</span>
                      <span class="text-weight-bolder">{{
                        battle.highestKillsPlayer.players[0].name
                      }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>Guild:</span>
                      <span class="text-weight-bolder">{{
                        battle.highestKillsPlayer.players[0].guildName
                      }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>Total Kills:</span>
                      <span class="text-weight-bolder">{{
                        formatNumber(battle.highestKillsPlayer.players[0].kills)
                      }}</span>
                    </div>
                  </div>
                  <ItemRender
                    :item-name="
                      battle.highestKillsPlayer.players[0].equipment.mainhand
                    "
                    :item-quality="0"
                    :item-count="1"
                  />
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div class="battle-participations q-mt-sm">
          <q-card>
            <q-card-section style="width: 100%; max-width: 1200px">
              <q-table
                :rows="lowParticipationAlliances()"
                :columns="columns"
                :bordered="false"
                :filter="filter"
                row-key="name"
              >
                <template v-slot:top>
                  <div class="title">ALLIANCES PARTICIPATION</div>
                  <q-space></q-space>
                  <q-toggle
                    v-if="battle.totalFame >= 250000"
                    class="q-mr-md text-weight-bolder"
                    v-model="showLessAlliances"
                    label="LOW PARTICIPATION"
                    left-label
                    color="orange"
                  />
                  <q-input
                    dense
                    color="orange"
                    debounce="300"
                    v-model="filter"
                    placeholder="Search"
                  >
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </template>
                <template v-slot:body="props">
                  <q-tr :props="props">
                    <q-td
                      v-for="col in props.cols"
                      :key="col.name"
                      :props="props"
                      :class="{
                        'first-row-style': props.row.firstStyle,
                      }"
                    >
                      {{ col.value }}
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </q-card-section>
          </q-card>
        </div>
        <div class="battle-history-guilds q-mt-sm">
          <q-card>
            <q-card-section>
              <q-table
                style="max-width: 1200px; width: 100%"
                :rows="lowParticipationGuilds()"
                :columns="columnsGuilds"
                :bordered="false"
                :filter="filterGuilds"
                row-key="name"
              >
                <template v-slot:top>
                  <div class="title">GUILDS PARTICIPATION</div>
                  <q-space></q-space>
                  <q-toggle
                    v-if="battle.totalFame >= 250000"
                    class="q-mr-md text-weight-bolder"
                    v-model="showLessGuilds"
                    label="LOW PARTICIPATION"
                    left-label
                    color="orange"
                  />
                  <q-input
                    dense
                    color="orange"
                    debounce="300"
                    v-model="filterGuilds"
                    placeholder="Search"
                  >
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </template>
                <template v-slot:body="props">
                  <q-tr :props="props">
                    <q-td
                      v-for="col in props.cols"
                      :key="col.name"
                      :props="props"
                      :class="{
                        'first-row-style': props.row.firstStyle,
                      }"
                    >
                      {{ col.value }}
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </q-card-section>
          </q-card>
        </div>
        <div class="party-composition q-mt-sm">
          <q-card>
            <q-card-section>
              <div class="flex justify-between q-mt-md q-ml-sm">
                <div class="title flex items-center">PARTY COMPOSITION</div>
                <q-btn-toggle
                  v-model="compositionOptions"
                  spread
                  no-caps
                  toggle-color="orange"
                  color="white"
                  text-color="black"
                  :options="[
                    { label: 'GUILD', value: true },
                    { label: 'ALLIANCE', value: false },
                  ]"
                />
              </div>
              <div>
                <CompositionPaty
                  :arrayItems="changeCompositionParty()"
                  :indexes="battle.players.players"
                  :typeShow="compositionOptions"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="battle-players q-mt-sm">
          <q-card>
            <q-card-section>
              <q-table
                style="max-width: 1200px; width: 100%"
                :rows="battle.players.players"
                :columns="columnsPlayers"
                :bordered="false"
                :filter="filterPlayers"
                :pagination="{ rowsPerPage: 10 }"
                row-key="name"
              >
                <template v-slot:top>
                  <div class="title">PLAYERS PARTICIPATION</div>
                  <q-space></q-space>
                  <q-input
                    dense
                    color="orange"
                    debounce="300"
                    v-model="filterPlayers"
                    placeholder="Search"
                  >
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </template>
              </q-table>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { api } from "src/boot/axios";
import OnClickTooltip from "src/components/OnClickTooltip.vue";
import { ref, onMounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import useTimeConverters from "../composables/useTimeConverters.js";
import useFormatNumber from "../composables/useFormatNumber.js";
import BarChart from "../components/BarChart.vue";
import ItemRender from "src/components/itemRender.vue";
import WrongData from "src/components/wrongData.vue";
import CompositionPaty from "src/components/compositionPaty.vue";

export default {
  components: {
    OnClickTooltip,
    BarChart,
    ItemRender,
    WrongData,
    CompositionPaty,
  },
  setup() {
    const { formatNumber } = useFormatNumber();
    const { toFormatDate, timeBetweenDates } = useTimeConverters();
    const route = useRoute();
    const battle = ref();
    const chartsToShow = ref([]);
    const filter = ref("");
    const filterGuilds = ref("");
    const filterPlayers = ref("");
    const columns = ref([
      {
        name: "name",
        label: "Name",
        align: "left",
        field: "name",
      },
      {
        name: "fame",
        label: "Fame",
        align: "left",
        sortable: true,
        field: "killFame",
        format: (val) => formatNumber(val),
      },
      {
        name: "players",
        label: "Players",
        align: "left",
        sortable: true,
        field: "totalPlayers",
      },
      {
        name: "kills",
        label: "Kills",
        align: "left",
        sortable: true,
        field: "kills",
      },
      {
        name: "deaths",
        label: "Deaths",
        align: "left",
        sortable: true,
        field: "deaths",
      },
      {
        name: "ip",
        label: "IP",
        align: "left",
        sortable: true,
        field: "averageIp",
      },
    ]);
    const columnsGuilds = ref([
      {
        name: "name",
        label: "Name",
        align: "left",
        field: "name",
      },
      {
        name: "alliance",
        label: "Alliance",
        align: "left",
        field: "alliance",
      },
      {
        name: "fame",
        label: "Fame",
        align: "left",
        sortable: true,
        field: "killFame",
        format: (val) => formatNumber(val),
      },
      {
        name: "players",
        label: "Players",
        align: "left",
        sortable: true,
        field: "totalPlayers",
      },
      {
        name: "kills",
        label: "Kills",
        align: "left",
        sortable: true,
        field: "kills",
      },
      {
        name: "deaths",
        label: "Deaths",
        align: "left",
        sortable: true,
        field: "deaths",
      },
      {
        name: "ip",
        label: "IP",
        align: "left",
        sortable: true,
        field: "averageIp",
      },
    ]);
    const columnsPlayers = ref([
      {
        name: "name",
        label: "Name",
        align: "left",
        field: "name",
      },
      {
        name: "alliance",
        label: "Alliance",
        align: "left",
        field: "allianceName",
      },
      {
        name: "guild",
        label: "Guild",
        align: "left",
        field: "guildName",
      },
      {
        name: "fame",
        label: "Fame",
        align: "left",
        sortable: true,
        field: "killFame",
        format: (val) => formatNumber(val),
      },
      {
        name: "kills",
        label: "Kills",
        align: "left",
        sortable: true,
        field: "kills",
      },
      {
        name: "deaths",
        label: "Deaths",
        align: "left",
        sortable: true,
        field: "deaths",
      },
      {
        name: "damage",
        label: "Damage",
        align: "left",
        sortable: true,
        field: (val) => (val.totalDamage ? val.totalDamage : ""),
        format: (val) => formatNumber(val),
      },
      {
        name: "heal",
        label: "Heal",
        align: "left",
        sortable: true,
        field: (val) => (val.totalHealing ? val.totalHealing : ""),
        format: (val) => formatNumber(val),
      },
      {
        name: "ip",
        label: "IP",
        align: "left",
        sortable: true,
        field: (val) => (val.ip ? val.ip : ""),
      },
    ]);
    const showLessAlliances = ref(true);
    const showLessGuilds = ref(true);
    const composition = ref();
    const compositionOptions = ref(true);
    const getBattle = async () => {
      try {
        const response = await api.get(`battles/battle/${route.params.id}`);
        battle.value = {
          ...response.data,
          ...toFormatDate(response.data.startTime),
        };
        battle.value = {
          ...battle.value,
          duration: timeBetweenDates(
            new Date(response.data.endTime),
            new Date(response.data.startTime)
          ),
        };
        if (battle.value.alliances.alliances.length) {
          battle.value.alliances.alliances[0].firstStyle = true;
        }
        battle.value.guilds.guilds[0].firstStyle = true;
        nextTick(() => {
          buildCharts();
        });
      } catch (error) {
        console.log(error);
      }
    };
    const buildCharts = () => {
      let toShowChart;
      if (battle.value.alliances.alliances.length) {
        toShowChart = battle.value.alliances.alliances.slice(0, 4);
      } else {
        toShowChart = battle.value.guilds.guilds.slice(0, 4);
      }
      let customCategories = toShowChart.map((el) => {
        return el.name;
      });
      let killsCategories = toShowChart.map((el) => {
        return el.kills;
      });
      let fameCategories = toShowChart.map((el) => {
        return el.killFame;
      });
      let playersCategories = toShowChart.map((el) => {
        return el.totalPlayers;
      });
      let deathsCategories = toShowChart.map((el) => {
        return el.deaths;
      });
      let ipCategories = toShowChart.map((el) => {
        return el.averageIp;
      });

      chartsToShow.value.push(
        formatData(customCategories, fameCategories, "FameChart")
      );
      chartsToShow.value.push(
        formatData(customCategories, killsCategories, "killFameChart")
      );
      chartsToShow.value.push(
        formatData(customCategories, playersCategories, "playersChart")
      );
      chartsToShow.value.push(
        formatData(customCategories, deathsCategories, "deathsChart")
      );
      chartsToShow.value.push(
        formatData(customCategories, ipCategories, "ipChart")
      );
    };
    const formatData = (tags, valueTag, nameSeries) => {
      for (let i = 0; i < valueTag.length; i++) {
        if (valueTag[i] === 0) {
          valueTag[i] = 0.1;
        }
      }
      const combinedData = tags.map((value, index) => ({
        data: cutText(value),
        option: valueTag[index],
      }));
      combinedData.sort((a, b) => b.option - a.option);
      return {
        series: [
          {
            name: nameSeries,
            data: combinedData.map((value) => value.option),
          },
        ],
        options: combinedData.map((value) => value.data),
      };
    };
    const cutText = (texto) => {
      if (texto.length > 5) {
        return texto.substring(0, 5) + "...";
      } else {
        return texto;
      }
    };
    const orderEquipment = (obj) => {
      const orderedKeys = [
        "MainHand",
        "OffHand",
        "Head",
        "Armor",
        "Shoes",
        "Cape",
        "Bag",
        "Mount",
        "Food",
        "Potion",
      ];
      let orderedObj = [];
      orderedKeys.forEach((key) => {
        if (obj[key]) {
          orderedObj.push(obj[key]);
        }
      });
      return orderedObj;
    };
    const deleteNulls = (obj) => {
      let orderedObj = [];
      obj.forEach((item) => {
        if (item) {
          orderedObj.push(item);
        }
      });
      return orderedObj;
    };
    const lowParticipationAlliances = () => {
      if (!showLessAlliances.value) {
        return battle.value.alliances.alliances.filter(
          (item) => item.totalPlayers >= 30 || item.killFame >= 500000
        );
      } else {
        return battle.value.alliances.alliances;
      }
    };
    const lowParticipationGuilds = () => {
      if (!showLessGuilds.value) {
        return battle.value.guilds.guilds.filter(
          (item) => item.totalPlayers >= 30 || item.killFame >= 500000
        );
      } else {
        return battle.value.guilds.guilds;
      }
    };
    const changeCompositionParty = () => {
      if (compositionOptions.value) {
        return battle.value.guilds.guilds;
      } else {
        return battle.value.alliances.alliances;
      }
    };
    onMounted(() => {
      getBattle();
    });
    return {
      orderEquipment,
      deleteNulls,
      battle,
      formatNumber,
      chartsToShow,
      columns,
      filter,
      filterGuilds,
      showLessAlliances,
      showLessGuilds,
      lowParticipationAlliances,
      lowParticipationGuilds,
      composition,
      compositionOptions,
      changeCompositionParty,
      columnsPlayers,
      columnsGuilds,
      filterPlayers,
    };
  },
};
</script>

<style lang="scss" scoped>
.battle-desc {
  width: 100%;
}
.custom-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.battle-desc {
  height: 100%;
  max-width: 1200px;
  .custom-section {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    font-size: 16px;
  }
}
.battle-desc-body {
  display: flex;
  flex-direction: column;
  .bottom-card,
  .head-card,
  .stats-card,
  .battle-participations,
  .battle-history-guilds,
  .battle-players,
  .party-composition {
    .title {
      font-weight: bold;
    }
  }
  .battle-stats {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    .head-card {
      width: calc(25% - 0.54em);
      .q-card__section {
        display: flex;
        flex-direction: column;
        .details {
          display: flex;
          flex-direction: column;
          line-height: 19px;
          hr {
            width: 100%;
            border-top: 1px solid rgba(230, 230, 230, 0.596);
          }
        }
      }
    }
    .bottom-card {
      width: calc(50% - 0.36em);
    }
    @media screen and (max-width: 950px) {
      .head-card {
        width: calc(50% - 0.36em);
      }
    }
    @media screen and (max-width: 610px) {
      .head-card {
        width: 100%;
      }
      .bottom-card {
        width: 100%;
      }
    }
  }
  .battle-high-stats {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    .stats-card {
      width: calc(50% - 0.36em);
      .high-player {
        display: flex;
        justify-content: center;
        align-items: center;
        .description {
          width: 100%;
        }
      }
    }
    @media screen and (max-width: 610px) {
      .stats-card {
        width: 100%;
      }
    }
  }
  .battle-participations,
  .battle-history-guilds,
  .battle-players {
    .q-table__container {
      box-shadow: none;
    }
  }
  .first-row-style {
    background-color: rgba(241, 241, 241, 0.507);
    font-weight: bold;
    animation: colorRotate 7.5s linear 0s infinite;

    @keyframes colorRotate {
      from {
        color: #ff8a25;
      }
      25% {
        color: #009fc7;
      }
      50% {
        color: #ff4359;
      }
      75% {
        color: #7a33ff;
      }
      100% {
        color: #ff8a25;
      }
    }
  }
}
</style>