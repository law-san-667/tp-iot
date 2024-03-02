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
              display: false,
              type: 'category', // Utilisation de l'échelle de type 'category'
              labels: chartData.labels, // Utilisation des labels fournis
              position: 'bottom'
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
