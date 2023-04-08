<template>
  <q-list class="q-mt-md" v-if="composition != null">
    <q-expansion-item
      v-for="(item, index) in composition"
      :key="index"
      expand-separator
      :default-opened="index == firstComposition"
    >
      <template v-slot:header>
        <q-item-section>
          <div class="flex justify-between">
            <div class="text-weight-bolder" style="margin-right: 2px">
              <span v-if="item.alliance"> [{{ item.alliance }}]</span>
              <span> {{ item.guildName }} </span>
            </div>
            <div>
              <span>{{ formatNumber(item.fame) }} TOTAL FAME</span>
            </div>
          </div>
        </q-item-section>
      </template>
      <div class="body-list-party" v-if="item.series.length">
        <div class="composition-selected">
          <div
            class="party-weapons"
            v-for="category in item.weapons"
            :key="category"
          >
            <div
              class="body-category q-mb-sm q-mt-sm"
              v-if="category.participants.length"
            >
              <div
                class="text-weight-bolder"
                style="font-size: 15px; margin-left: 3px"
              >
                {{ category.name }}
              </div>
              <div class="container-weapons">
                <div
                  class="player-weapon"
                  v-for="weapon in category.participants"
                  :key="weapon"
                >
                  <ItemRender
                    :item-name="weapon.name"
                    :item-quality="0"
                    :item-count="0"
                  />
                  <span>{{ weapon.count }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="graph-composition">
          <DonutChart
            :series="item.series"
            :labels="item.labels"
            :colors="item.colors"
          />
        </div>
      </div>
      <div
        style="min-height: 100px"
        class="flex justify-center items-center"
        v-else
      >
        <span class="text-weight-bold text-h6 text-overline">No Data</span>
      </div>
    </q-expansion-item>
  </q-list>
</template>

<script>
import useFormatNumber from "../composables/useFormatNumber";
import ItemRender from "src/components/itemRender.vue";
import { ref, onMounted, watch } from "vue";
import DonutChart from "./DonutChart.vue";
export default {
  components: {
    ItemRender,
    DonutChart,
  },
  props: {
    arrayItems: { required: true },
    indexes: { rquired: true },
    typeShow: { required: true },
  },
  setup(props) {
    const { formatNumber } = useFormatNumber();
    const guildCounts = ref({});
    const composition = ref();
    const firstComposition = ref();
    const compositionPartys = () => {
      guildCounts.value = {};
      let members = props.indexes;
      let typeDefine;
      //Format Guilds/Alliances
      for (const member of props.arrayItems) {
        if (!guildCounts.value[member.id]) {
          guildCounts.value[member.id] = {
            guildName: member.name,
            alliance: member.alliance,
            fame: member.killFame,
            weapons: {
              battlemount: { name: "Battle Mounts", participants: [] },
              tank: { name: "Tank", participants: [] },
              support: { name: "Supports", participants: [] },
              healer: { name: "Healers", participants: [] },
              flank: { name: "Flank", participants: [] },
              range: { name: "Ranges", participants: [] },
              melee: { name: "Melees", participants: [] },
            },
            series: [],
            labels: [],
            colors: [],
          };
        }
      }
      if (props.typeShow) {
        typeDefine = "guildId";
      } else {
        typeDefine = "allianceId";
      }
      for (const guildId in guildCounts.value) {
        for (const member of members.filter((m) => m[typeDefine] === guildId)) {
          //Verify Weapon
          if (member.equipment && member.role === "battlemount") {
            asignRole(member.equipment.mount, member.role, guildId);
          } else if (member.equipment && member.equipment.mainhand !== null) {
            asignRole(member.equipment.mainhand, member.role, guildId);
          }
        }
        dataDonut(guildId);
      }
      const sortKey = Object.keys(guildCounts.value).sort(
        (a, b) => guildCounts.value[b].fame - guildCounts.value[a].fame
      );
      const sortFame = {};
      sortKey.forEach((ky) => (sortFame[ky] = guildCounts.value[ky]));
      composition.value = sortFame;
      firstComposition.value = sortKey[0];
    };
    const dataDonut = (guildId) => {
      for (const comp in guildCounts.value[guildId]["weapons"]) {
        if (
          guildCounts.value[guildId]["weapons"][comp]["participants"].length > 0
        ) {
          let nameCat = guildCounts.value[guildId]["weapons"][comp]["name"];
          let total = guildCounts.value[guildId]["weapons"][comp][
            "participants"
          ].reduce((total, obj) => {
            return total + obj.count;
          }, 0);
          guildCounts.value[guildId].labels.push(nameCat);
          guildCounts.value[guildId].series.push(total);
          switch (comp) {
            case "battlemount":
              guildCounts.value[guildId]["colors"].push("#D46E07");
              break;
            case "tank":
              guildCounts.value[guildId]["colors"].push("#008FFB");
              break;
            case "support":
              guildCounts.value[guildId]["colors"].push("#FEB019");
              break;
            case "healer":
              guildCounts.value[guildId]["colors"].push("#05B50D");
              break;
            case "flank":
              guildCounts.value[guildId]["colors"].push("#775DD0");
              break;
            case "range":
              guildCounts.value[guildId]["colors"].push("#FF4560");
              break;
            case "melee":
              guildCounts.value[guildId]["colors"].push("#ADADAD");
              break;
            default:
              break;
          }
        }
      }
    };
    const asignRole = (item, typeWeapon, guildId) => {
      let playerRol = sliceItem(item, typeWeapon);
      const itemSearch = guildCounts.value[guildId]["weapons"][typeWeapon][
        "participants"
      ].findIndex((obj) => obj.name === playerRol);
      if (itemSearch !== -1) {
        guildCounts.value[guildId]["weapons"][typeWeapon]["participants"][
          itemSearch
        ].count += 1;
      } else {
        guildCounts.value[guildId]["weapons"][typeWeapon]["participants"].push({
          name: playerRol,
          count: 1,
        });
      }
    };
    const sliceItem = (item, rol) => {
      if (rol === "battlemount") {
        return item;
      }
      if (item[item.length - 2] === "@") {
        return `T8_${item.slice(3, -2)}@0`;
      }
      return `T8_${item.slice(3)}@0`;
    };
    onMounted(() => {
      compositionPartys();
    });
    watch(
      () => props.typeShow,
      (oldType, newType) => {
        compositionPartys();
      }
    );

    return { compositionPartys, formatNumber, composition, firstComposition };
  },
};
</script>

<style lang="scss" scoped>
:deep(.apexcharts-canvas) {
  svg {
    background: none !important;
  }
}
:deep(.vue-apexcharts) {
  width: 100%;
}
.q-item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12) !important;
}
.body-list-party {
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 310px;
  .composition-selected {
    width: 100%;
  }
  .graph-composition {
    display: flex;
    align-items: center;
    width: 600px;
  }
}
.container-weapons {
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fit, minmax(65px, 0));
  justify-content: flex-start;
  justify-items: center;
}
.player-weapon {
  display: flex;
  width: 65px;
  flex-direction: column;
  align-items: center;
}
@media screen and (max-width: 915px) {
  .body-list-party {
    flex-direction: column-reverse;
    .graph-composition {
      justify-content: center;
      align-items: center;
      width: 100%;
      max-height: 500px;
    }
  }
  :deep(.vue-apexcharts) {
    display: flex;
    justify-content: center;
  }
}
</style>
