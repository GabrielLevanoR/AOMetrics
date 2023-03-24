<template>
  <div
    style="width: 100%; display: flex; justify-content: center; margin: 10px 0"
    ref="serverTable"
  >
    <q-table
      style="max-width: 1200px; width: 100%"
      :rows="battles.docs"
      :rows-per-page-options="[20]"
      v-model:pagination="pagination"
      :columns="columns"
      row-key="time"
      :loading="!battles.docs"
      @request="onRequest"
    >
      <template v-slot:loading>
        <q-inner-loading showing color="orange" />
      </template>
      <template v-slot:pagination="scope">
        <q-btn
          v-if="scope.pagesNumber > 2"
          icon="first_page"
          color="grey-8"
          round
          dense
          flat
          :disable="scope.isFirstPage"
          @click="
            () => {
              scope.firstPage();
              scrollToTable();
            }
          "
        />

        <q-btn
          icon="chevron_left"
          color="grey-8"
          round
          dense
          flat
          :disable="scope.isFirstPage"
          @click="
            () => {
              scope.prevPage();
              scrollToTable();
            }
          "
        />

        <q-btn
          icon="chevron_right"
          color="grey-8"
          round
          dense
          flat
          :disable="scope.isLastPage"
          @click="
            () => {
              scope.nextPage();
              scrollToTable();
            }
          "
        />

        <q-btn
          v-if="scope.pagesNumber > 2"
          icon="last_page"
          color="grey-8"
          round
          dense
          flat
          :disable="scope.isLastPage"
          @click="
            () => {
              scope.lastPage();
              scrollToTable();
            }
          "
        />
      </template>
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
            <div class="row-row">
              <span
                v-for="guild in props.row.guilds.list.slice(0, 2)"
                :key="guild"
              >
                <span class="spacing"
                  >{{ guild }}<span class="text-weight-bold">,</span>
                </span>
              </span>
              <span
                class="text-italic spacing"
                v-if="props.row.guilds.list.length > 2"
              >
                ... and others</span
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
import { ref, computed, onUpdated } from "vue";
import { useRouter } from "vue-router";
import useFormatNumber from "../composables/useFormatNumber.js";

export default {
  props: {
    applyStyle: {
      type: Boolean,
      default: false,
    },
    battles: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const pagination = ref({
      page: 1,
      rowsPerPage: 20,
      rowsNumber: 5,
    });
    const serverTable = ref(null);
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
    const scrollToTable = () => {
      const table = serverTable.value;
      const tablePos =
        table.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({
        top: tablePos,
        behavior: "smooth",
      });
    };
    const onRequest = (propert) => {
      emit("serverSide", propert);
    };
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
      return rowIndex === 0 && !filteredRows.value.includes(row);
    };
    onUpdated(() => {
      pagination.value.rowsNumber = props.battles.totalDocs;
      pagination.value.rowsPerPage = props.battles.limit;
      pagination.value.page = props.battles.page ? props.battles.page : 0;
    });
    return {
      columns,
      formatNumber,
      redirectBattle,
      shouldApplyCustomStyle,
      onRequest,
      pagination,
      serverTable,
      scrollToTable,
    };
  },
};
</script>
<style lang="scss" scoped>
.row-column {
  display: flex;
  flex-direction: column;
}
.row-row {
  display: flex;
  flex-direction: row;
}
.spacing {
  margin-left: 5px;
}
tr {
  cursor: pointer;
}
.first-row-style {
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
