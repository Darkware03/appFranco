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

        // Verificar si hay datos para la serie
        if (!this.data || this.data.length === 0) {
          throw new Error("No se proporcionaron datos para graficar");
        }

        // Verificar si se proporcionaron categorías para el eje x
        if (!opts.labels || opts.labels.length === 0) {
          throw new Error("No se proporcionaron etiquetas para el eje X");
        }

        // Crear una serie con el formato adecuado
        const seriesData = this.data.map((item, index) => ({
          name: `Serie ${index + 1}`,
          data: item
        }));

        // Crear el gráfico con los datos en el formato adecuado
        const chart = new ApexCharts(this.$refs.chart, {
          chart: {
            type: 'bar'
          },
          series: seriesData,
          xaxis: {
            categories: opts.labels
          },
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
