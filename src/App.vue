<template>
  <div class="container mx-auto py-8">
    <h1 class="text-3xl font-bold mb-4">Graphique de données aléatoires</h1>
    <div v-if="loading">Chargement en cours...</div>
    <div v-else>
      <Chart :chartData="chartData" v-if="chartData" />
      <!--button is black and text is white-->
      <button @click="refreshChart" class="mt-16 bg-black text-white px-4 py-2 rounded-md">Rafraîchir le graphique</button>
    </div>
    <!-- Footer with Copyright-->
    <footer class="text-center mt-8">
      <p class="text-gray-500">© 2024 </p>
      <p class="text-gray-500">Mouhamed Lawal Dan Azoumi</p>
      <p class="text-gray-500">Oumar Diop</p>
      <p class="text-gray-500">Cathy Sadykh Diaw</p>
      <p class="text-gray-500">Cheikh Nourou Sow</p>
      <p class="text-gray-500">Barhame Sokhna</p>
    </footer>
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
