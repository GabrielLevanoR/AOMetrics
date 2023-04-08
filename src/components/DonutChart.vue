<template>
  <apexchart
    type="donut"
    :options="chartOptions"
    :series="chartSeries"
    ref="donut"
  ></apexchart>
</template>

<script>
import { useQuasar } from "quasar";
import { ref, onUpdated, computed } from "vue";
export default {
  props: {
    series: { required: true },
    labels: { required: true },
    colors: { required: true },
  },
  setup(props) {
    const $q = useQuasar();
    const donut = ref(null);
    const chartSeries = ref([...props.series]);
    const chartLabels = ref([...props.labels]);
    const chartColors = ref([...props.colors]);

    const chartOptions = computed({
      get() {
        return {
          colors: chartColors.value,
          labels: chartLabels.value,
          style: {
            fontSize: "14px",
            fontWeight: "bold",
            dropShadow: {
              enabled: false,
            },
          },
          chart: {
            type: "donut",
            width: 500,
          },
          theme: {
            mode: $q.dark.isActive ? "dark" : "light",
          },
          legend: {
            position: "bottom",
            horizontalAlign: "center",
            offsetY: 10,
          },
          responsive: [
            {
              breakpoint: 915,
              options: {
                chart: {
                  width: 400,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
            {
              breakpoint: 455,
              options: {
                chart: {
                  width: 300,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
            {
              breakpoint: 300,
              options: {
                chart: {
                  width: 250,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
          stroke: {
            show: false,
          },
        };
      },
    });
    onUpdated(() => {
      chartOptions.value.theme.mode = !$q.dark.isActive ? "dark" : "light";
      if (donut.value) {
        donut.value.updateOptions(chartOptions.value);
      }
    });
    return {
      chartOptions,
      donut,
      chartSeries,
    };
  },
};
</script>

<style lang="scss" scoped></style>
