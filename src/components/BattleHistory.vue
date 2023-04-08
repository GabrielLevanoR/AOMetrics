<template>
  <q-card>
    <q-card-section
      ><q-table
        v-if="battleHistory.length"
        style="max-width: 1200px; width: 100%"
        :rows="battleHistory"
        :columns="columns"
        :bordered="false"
        :filter="filterPlayers"
        :pagination="{ rowsPerPage: 20 }"
        row-key="name"
      >
        <template v-slot:top>
          <div class="title">BATTLE HISTORY</div>
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
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <div v-if="col.name === 'id'">
                <span
                  @click="redirectItem(col.value)"
                  style="color: #ff8a25; font-weight: bold; cursor: pointer"
                  >{{ col.value }}</span
                >
              </div>
              <div v-else-if="col.name === 'killerWeapon'" class="text-center">
                <ItemRender
                  :item-name="col.value.MainHand.Type"
                  :item-quality="col.value.MainHand.Quality"
                  :item-count="1"
                  v-if="col.value.MainHand"
                />
                <span v-else>-</span>
              </div>
              <div v-else-if="col.name === 'victimWeapon'" class="text-center">
                <ItemRender
                  :item-name="col.value.MainHand.Type"
                  :item-quality="col.value.MainHand.Quality"
                  :item-count="1"
                  v-if="col.value.MainHand"
                />
                <span v-else>-</span>
              </div>
              <div v-else>{{ col.value }}</div>
            </q-td>
          </q-tr>
        </template>
      </q-table></q-card-section
    ></q-card
  >
</template>

<script>
import ItemRender from "src/components/itemRender.vue";
import useFormatNumber from "../composables/useFormatNumber.js";
import useTimeConverters from "../composables/useTimeConverters.js";
import { ref } from "vue";
export default {
  components: {
    ItemRender,
  },
  props: {
    battleHistory: { required: true, type: Array, default: () => [] },
  },
  setup() {
    const { formatNumber } = useFormatNumber();
    const { toFormatDate } = useTimeConverters();
    const filterPlayers = ref("");
    const columns = ref([
      {
        name: "id",
        label: "ID",
        align: "left",
        field: "eventId",
        sortable: true,
      },
      {
        name: "killerWeapon",
        label: "Killer Weapon",
        align: "center",
        field: (val) => val.killer.equipment,
      },
      {
        name: "killerName",
        label: "Killer Name",
        align: "left",
        sortable: true,
        field: (val) => val.killer.name,
      },
      {
        name: "killerGuild",
        label: "Killer Guild",
        align: "left",
        sortable: true,
        field: (val) => val.killer.guildName,
      },
      {
        name: "victimWeapon",
        label: "Victim Weapon",
        align: "center",
        field: (val) => val.victim.equipment,
      },
      {
        name: "victimName",
        label: "Victim Name",
        align: "left",
        sortable: true,
        field: (val) => val.victim.name,
      },
      {
        name: "victiGuild",
        label: "Victim Guild",
        align: "left",
        sortable: true,
        field: (val) => val.victim.guildName,
      },
      {
        name: "fame",
        label: "Fame",
        align: "left",
        sortable: true,
        field: (val) => formatNumber(val.totalVictimFame),
      },
      {
        name: "time",
        label: "Time (UTC)",
        align: "left",
        sortable: true,
        field: (val) => toFormatDate(val.timeStamp).time,
      },
    ]);
    const redirectItem = (id) => {
      window.open(`https://albiononline.com/killboard/kill/${id}`, "_blank");
    };
    return {
      columns,
      filterPlayers,
      redirectItem,
    };
  },
};
</script>

<style lang="scss" scoped>
body.body--dark {
  .q-table__card--dark {
    background: $darkMode--bg2;
  }
  .first-row-style {
    background-color: rgba(136, 136, 136, 0.199);
  }
  .back-arrow-icon {
    .q-icon {
      color: orange !important;
    }
  }
}
.q-table__container {
  box-shadow: none;
}
.title {
  font-weight: bold;
}
</style>
