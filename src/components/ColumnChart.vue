<template>
  <div>
    <div ref="chart" style="width: 100%;"></div>
  </div>
</template>

<script>
import ApexCharts from 'apexcharts'

export default {
  name: 'BarChart',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      try {
        const opts = this.options;

        if (!this.data || this.data.length === 0) {
          throw new Error("No se proporcionaron datos para graficar");
        }

        const chart = new ApexCharts(this.$refs.chart, {
          chart: {
            type: 'bar'
          },
          series: [{
            name: 'Serie 1',
            data: this.data
          }],
          xaxis: {
            categories: opts.labels || []
          },
          colors: opts.colors || ['#008FFB'],
          // Resto del código...
        });

        chart.render();
      } catch (error) {
        console.error("ERROR AL RENDERIZAR EL GRÁFICO:", error.message);
      }
    }
  }
}
</script>

<style scoped>
/* Estilos específicos del componente si es necesario */
</style>
