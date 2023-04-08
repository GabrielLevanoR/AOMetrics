<template>
  <q-table
    class="my-sticky-virtscroll-table"
    virtual-scroll
    v-model:pagination="pagination"
    :rows-per-page-options="[0]"
    :virtual-scroll-sticky-size-start="48"
    row-key="Position"
    :rows="battles"
    :columns="columns"
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="Position" :props="props">
          {{ props.row.newPosition + 1 }}
        </q-td>
        <q-td key="name" :props="props">
          {{ props.row.name }}
        </q-td>
        <q-td key="server" :props="props" style="text-transform: uppercase">
          {{ props.row.server }}
        </q-td>
        <q-td key="kills" :props="props">
          {{ formatNumber(props.row.totalKills) }}
        </q-td>
        <q-td key="deaths" :props="props">
          {{ formatNumber(props.row.totalDeaths) }}
        </q-td>
        <q-td key="battles" :props="props">
          {{ formatNumber(props.row.totalBattles) }}
        </q-td>
        <q-td key="fame" :props="props">
          {{ formatNumber(props.row.totalFame) }}
        </q-td>
        <q-td key="icon" :props="props">
          <IconPosition :position="props.row.position" />
        </q-td>
      </q-tr> </template
  ></q-table>
</template>

<script>
import useFormatNumber from "../composables/useFormatNumber";
import { ref } from "vue";
import IconPosition from "./IconPosition.vue";
export default {
  props: {
    battles: { required: true, type: Array, default: () => [] },
  },
  setup(props) {
    const { formatNumber } = useFormatNumber();
    const columns = [
      {
        name: "Position",
        label: "POSITION",
        field: "newPosition",
        align: "left",
      },
      {
        name: "name",
        label: "GUILD NAME",
        align: "left",
      },
      {
        name: "server",
        label: "SERVER",
        align: "left",
      },
      {
        name: "kills",
        label: "KILLS",
        field: "totalKills",
        align: "left",
      },
      {
        name: "deaths",
        label: "DEATHS",
        field: "totalDeaths",
        align: "left",
      },
      {
        name: "battles",
        label: "BATTLES",
        field: "totalBattles",
        align: "left",
      },
      {
        name: "fame",
        label: "FAME",
        field: "totalFame",
        align: "left",
      },
      {
        name: "icon",
        label: "STATUS",
        align: "center",
      },
    ];
    return {
      formatNumber,
      columns,
      pagination: ref({
        rowsPerPage: 0,
      }),
    };
  },
  components: { IconPosition },
};
</script>

<style lang="scss" scoped>
body.body--dark {
  .my-sticky-virtscroll-table {
    :deep(.q-table thead tr:first-child th) {
      background-color: $darkMode--bg2;
    }
  }
}
:deep(.q-table) {
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    color: orange;
    background-color: white;
    font-weight: bold;
  }
  thead tr th {
    position: sticky;
    z-index: 1;
  }
  thead tr:last-child th {
    top: 48px;
  }
  thead tr:first-child th {
    top: 0;
    font-weight: bold;
    font-size: 13px;
  }
  .q-virtual-scroll__content tr td {
    height: 60px;
  }
  td {
    border-color: rgba(0, 0, 0, 0.12);
  }
}
.my-sticky-virtscroll-table {
  height: 450px;
  tbody {
    scroll-margin-top: 48px;
  }
}
</style>
