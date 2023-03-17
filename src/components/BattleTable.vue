<template>
  <div
    style="width: 100%; display: flex; justify-content: center; margin: 10px 0"
  >
    <q-table
      style="max-width: 1200px; width: 100%"
      :rows="battles"
      :columns="columns"
      row-key="time"
    >
      <template v-slot:body="props">
        <q-tr
          :props="props"
          @click="redirectBattle(props.row)"
          :class="{ 'first-row-style': props.row.firstStyle && applyStyle }"
        >
          <q-td :props="props" key="time">
            <div class="row-column">
              <span>{{ props.row.date }}</span>
              <span>{{ props.row.time }}</span>
            </div>
          </q-td>
          <q-td :props="props" key="guilds">
            <div class="row-column">
              <span
                v-for="guild in props.row.guilds.list.slice(0, 4)"
                :key="guild"
              >
                {{ guild }}
              </span>
              <span class="text-italic" v-if="props.row.guilds.list.length > 4"
                >... and others</span
              >
            </div>
          </q-td>
          <q-td :props="props" key="players">
            {{ props.row.players.list.length }}
          </q-td>
          <q-td :props="props" key="totalKills">
            {{ formatNumber(props.row.totalKills) }}
          </q-td>
          <q-td :props="props" key="totalFame">
            {{ formatNumber(props.row.totalFame) }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import useFormatNumber from "../composables/useFormatNumber.js";

export default {
  props: {
    applyStyle: {
      type: Boolean,
      default: false,
    },
    battles: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const { formatNumber } = useFormatNumber();
    const route = useRouter();
    const columns = ref([
      {
        name: "time",
        align: "left",
        label: "TIME (UTC)",
        field: "startTime",
      },
      {
        name: "guilds",
        align: "left",
        label: "GUILDS",
        field: "guilds",
      },
      {
        name: "players",
        align: "left",
        label: "TOTAL PLAYERS",
        field: "players",
      },
      {
        name: "totalKills",
        align: "left",
        label: "TOTAL KILLS",
        field: "totalKills",
      },
      {
        name: "totalFame",
        align: "left",
        label: "TOTAL FAME",
        field: "totalFame",
      },
    ]);

    const redirectBattle = (row) => {
      route.push({ name: "BattleSelected", params: { id: row.id } });
    };
    const filteredRows = computed(() => {
      if (!searchQuery.value) {
        return rows;
      }

      const normalizedSearchQuery = searchQuery.value.trim().toLowerCase();

      return rows.filter((row) =>
        Object.values(row)
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearchQuery)
      );
    });

    const shouldApplyCustomStyle = (rowIndex, row) => {
      return (
        rowIndex === 0 && !filteredRows.value.includes(row) // Si la primera fila no está incluida en los resultados de búsqueda
      );
    };
    return {
      columns,
      formatNumber,
      redirectBattle,
      shouldApplyCustomStyle,
    };
  },
};
</script>
<style lang="scss" scoped>
.row-column {
  display: flex;
  flex-direction: column;
}
tr {
  cursor: pointer;
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
</style>
