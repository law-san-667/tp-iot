<template>
  <div class="container mx-auto py-8">
    <h1 class="text-3xl font-bold mb-4">Graphique de données IoT</h1>
    <div v-if="loading">Chargement en cours...</div>
    <div v-else>
      <Chart :chartData="chartData" v-if="chartData" />
      <button @click="refreshChart" class="mt-16">Rafraîchir le graphique</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Chart from './components/Chart.vue';

export default {
  components: {
    Chart
  },
  data() {
    return {
      loading: true,
      chartData: null
    };
  },
  async mounted() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('https://tp-iot-api.vercel.app/getData');
        console.log('Résultats:', response.data);

        this.chartData = {
          labels: response.data.map(item => new Date(item.time)),
          datasets: [{
            label: 'Valeurs',
            data: response.data.map(item => item.value),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1
          }]
        };

        this.loading = false;
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        this.loading = false;
      }
    },
    async refreshChart() {
      this.loading = true;
      await this.fetchData();
    }
  }
};
</script>

<style>
/* Ajoutez ici votre style Tailwind CSS personnalisé */
</style>
