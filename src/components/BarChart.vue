<template>
  <div
    class="chart-container"
    v-if="options.xaxis.categories !== ['L'] && sortedSeries.data != [5]"
  >
    <apexchart
      type="bar"
      height="128"
      :options="options"
      :series="sortedSeries"
      ref="chart"
    />
  </div>
  <div v-else>
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
</template>

<script>
import useFormatNumber from "../composables/useFormatNumber.js";
import { computed, onUpdated, ref } from "vue";
import { useQuasar } from "quasar";
export default {
  props: {
    series: {
      required: true,
    },
    chartOptions: { required: true },
    color: { required: false, type: String, default: "#FF8A25" },
    format: { required: false, type: String, default: "normal" },
  },
  setup(props) {
    const $q = useQuasar();
    const { formatNumber } = useFormatNumber();
    onUpdated(() => {
      options.value.theme.mode = !$q.dark.isActive ? "dark" : "light";
      if (chart.value) {
        chart.value.updateOptions(options.value);
      }
    });
    const chart = ref(null);

    const sortedSeries = computed({
      get: () => {
        let sorted = props.series;
        if (sorted == undefined) {
          return [
            {
              name: "Load",
              data: [5],
            },
          ];
        } else {
          return sorted;
        }
      },
    });
    const options = computed({
      get() {
        return {
          chart: {
            type: "bar",
            toolbar: {
              show: false,
            },
            height: "120",
            padding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          },
          theme: {
            mode: $q.dark.isActive ? "dark" : "light",
          },
          fill: {
            colors: [props.color],
          },
          grid: {
            show: false,
          },
          tooltip: {
            marker: { show: false },
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
              return `<div style="  font-size: 12px;  padding: 4px 8px;  color: #fff ;  background-color: #333;  border-radius: 4px;"
            >${
              props.format === "normal"
                ? formatNumber(
                    Math.round(w.globals.series[seriesIndex][dataPointIndex])
                  )
                : Math.round(w.globals.series[seriesIndex][dataPointIndex])
            }</div>`;
            },
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: true,
            },
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            categories:
              props.chartOptions !== undefined ? props.chartOptions : ["L"],
            labels: { show: false },
            grid: {
              show: false,
            },
          },
        };
      },
    });
    return {
      options,
      sortedSeries,
      chart,
    };
  },
};
</script>
<style lang="scss" scoped>
:deep(.apexcharts-canvas) {
  svg {
    background: none !important;
  }
}
</style>
