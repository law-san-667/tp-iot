<template>
  <canvas id="chartCanvas" style="height: 50vh;"></canvas>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  props: {
    chartData: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    onMounted(() => {
      renderChart(props.chartData);
    });

    const renderChart = (chartData) => {
      const canvas = document.getElementById('chartCanvas');
      if (!canvas) return;

      const context = canvas.getContext('2d');
      if (!context) return;

      Chart.register(...registerables);

      new Chart(context, {
        type: 'line',
        data: chartData,
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day'
              }
            }
          }
        }
      });
    };
  }
});
</script>

<style scoped>
/* Styles spécifiques au composant Chart */
</style>
