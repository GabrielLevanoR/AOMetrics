<template>
  <div
    class="chart-container"
    v-if="
      options.xaxis.categories !== ['Loading....'] && sortedSeries.data != [5]
    "
  >
    <apexchart
      type="bar"
      height="128"
      :options="options"
      :series="sortedSeries"
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
import { computed } from "vue";
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
    const { formatNumber } = useFormatNumber();
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
              props.chartOptions !== undefined
                ? props.chartOptions
                : ["Loading..."],
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
    };
  },
};
</script>
<style lang="scss" scoped></style>
