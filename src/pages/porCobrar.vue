<template>
  <q-page class="login-page">
    <div class="container">
      <div style="margin-top: 17em"></div>
      <p class="logo-text text-center q-mt-xl">Ventas por Cobrar</p>
      <q-card class="login-card" flat bordered>
        <!--PRIMERO PONER FILTROS Y TABLA DE LA PANTALLA AGREGAR VENTAS, AGREGAR GRAFICO QUE REFLEJE COMISIONES QUE RECIBIRE POR DIAS, por ejemplo martes 1 recibo 400 pesos de comisiones que se relfeje en cada fecha, en evez de grafica calendario-->
        <div class="row flex justify-center q-mt-lg">
          <div>
            <q-card-section>
              <q-input v-model="startDate" label="Fecha de inicio" type="date" @input="checkDatesFilled" />
            </q-card-section>
          </div>
          <div>
            <q-card-section>
              <q-input v-model="endDate" label="Fecha de fin" type="date" @input="checkDatesFilled" />
            </q-card-section>
          </div>
        </div>
        <q-card-section class="q-mt-sm text-center" v-if="showGrafico">
          <ColumnChart :data="ventas" :options="options"/>
        </q-card-section>
        <q-card-section class="q-mt-lg text-center" v-else>
          No se encuentra informacion para graficar...
        </q-card-section>
        <q-card-section class="">
          <div class="flex-center">
            <div>
              <div class="social-buttons text-center">
<!--
                <div class="row text-center" v-if="pagoProximo!==null">
                  <div class="col-12">
                    <p class="text-center text-weight-bold text-secondary">
                      Pago mas proximo:
                    </p>
                  </div>
                  <div class="col-6">
                <span class="q-px-sm">
                  Monto : <span class="text-weight-bold">$ {{ pagoProximo.monto }}</span>
                </span>
                  </div>
                  <div class="col-6">
                <span class="q-px-sm">
                  Comision({{ pagoProximo.comision
                  }}%): ${{ (pagoProximo.monto * (pagoProximo.comision / 100)).toFixed(2)
                  }}
                </span>
                  </div>
&lt;!&ndash;                  <div class="col-12 q-mt-md" v-if="pagoProximo.fecha">
                <span class="q-px-sm">
                  Fecha: {{ pagoProximo.fecha }}
                </span>
                  </div>&ndash;&gt;
                </div>
-->
              </div>

              <q-separator class="separator" />
              <div class="row text-center">
                <div class="col-6">
                  <p>
                    <span class="text-weight-bold">Total por cobrar: </span>${{ totalMes }}
                  </p>
                </div>
                <div class="col-6">
                  <p>
                    <span class="text-weight-bold">comision promedio: </span>%{{ totalMesComision }}
                  </p>
                </div>
              </div>
              <q-separator class="separator" />

            </div>
            <div class="text-center">
              <div class="q-pa-md">
                <q-date class="" :color="'secondary'" v-model="days" multiple readonly title="Fechas de pago" />
              </div>
            </div>
          </div>
<!--          <div class="text-center">
            <q-btn color="secondary" @click="loader=true">Ver detalles</q-btn>
          </div>-->
        </q-card-section>
      </q-card>
    </div>
    <q-dialog :value="loader" persistent>
      <q-card class="q-pa-md">
        <p class="text-h5 text-weight-bold q-pa-sm rounded-borders text-secondary">
          Detalle de ventas por cobrar
        </p>
        <q-card-section>
          <q-table :data="porCobrar" :columns="columns" row-key="id">
            <template v-slot:body-cell-pago="props">
              <q-btn @click="registrar(props.row.id)"
                     color="info" dense outline flat>
                <q-icon name="check" />
              </q-btn>
            </template>

          </q-table>
        </q-card-section>
        <q-card-actions class="flex items-end justify-end">
          <q-btn flat label="Cerrar" color="secondary" v-close-popup @click="loader=false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import ColumnChart from "components/ColumnChart";

export default {
  name: "login",
  components: {  ColumnChart },
  data: () => ({
    showGrafico: false,
    ventas:[],
    options: {
      labels: [],
      colors: ['#2D8847'],
      dates: [],
      yaxisTitle: ['Comisiones de ventas por dia'],
      tooltip: {
        unit:[],
      },
    },
    loader: false,
    days: [],
    porCobrar: [],
    totalMes: 0,
    totalMesComision: 0,
    startDate: null,
    endDate: null,
    columns: [
      {
        name: "fecha",
        field: "fecha",
        align: "center",
        label: "Fecha",
        headerClasses: "bg-secondary text-white"
      },
      {
        name: "monto",
        field: "monto",
        align: "center",
        label: " Monto",
        headerClasses: "bg-secondary text-white"
      },
      {
        name: "comision",
        field: "comision",
        align: "center",
        label: "Comision(%)",
        headerClasses: "bg-secondary text-white"
      },
      {
        name: "pago",
        field: "pago",
        align: "center",
        label: "Pago",
        headerClasses: "bg-secondary text-white"
      }
    ]
  }),
  methods: {
    checkDatesFilled() {
      if (this.startDate && this.endDate) {
        this.showGrafico= false;
          console.log('Ambas fechas están llenas:', this.startDate, this.endDate);
        // Aquí puedes realizar la lógica que desees con las fechas completas
        this.getPorCobrar()
      }
    },
    async getPorCobrar() {
      try {
        const response = await this.$makeRequest(`/api/ventas/porCobrar?fechaIni=${this.startDate}&fechaFin=${this.endDate}`, "GET");
        this.porCobrar = response.result;

        const ventasPorFecha = {}; // Objeto para almacenar ventas por fecha

        this.porCobrar.forEach(row => {
          const fecha = row.fecha.replace(/-\d\dT.*/, "").replace(/-/g, "/"); // Extraer solo la fecha y formatear
          if (!ventasPorFecha[fecha]) {
            ventasPorFecha[fecha] = 0;
          }
          ventasPorFecha[fecha] += parseFloat(row.monto); // Sumar ventas por fecha
        });

        const miBoton = document.getElementsByClassName("q-btn--actionable q-focusable q-hoverable q-btn--wrap q-btn--dense");

        response.ventas.forEach(row => {
          const fechaObjetivo = new Date(row.created_at);
          const year = fechaObjetivo.getFullYear();
          const month = String(fechaObjetivo.getMonth() + 1).padStart(2, "0");
          const day = String(fechaObjetivo.getDate()).padStart(2, "0");
          const dayN0 = String(fechaObjetivo.getDate());
          const fechaFormateada = `${year}/${month}/${day}`;

          setTimeout(() => {
            for (let i = 0; i < miBoton.length; i++) {
              const boton = miBoton[i];
              if (i > 6 && boton.id == dayN0) {
                const btn = document.getElementById(boton.id);
                btn.classList.remove("bg-secondary");
                btn.classList.add("bg-amber");
                btn.classList.add("text-white");
                console.log(boton.id);
              }
            }
          }, 600);

          console.log(this.formatterFecha(row.created_at));
          const fecha = fechaFormateada.replace(/-\d\dT.*/, "").replace(/-/g, "/"); // Extraer solo la fecha y formatear
          if (!ventasPorFecha[fecha]) {
            ventasPorFecha[fecha] = 0;
          }
          ventasPorFecha[fecha] += parseFloat(row.monto); // Sumar ventas por fecha
          this.ventas.push(row.monto);
        });

        // Asignar las ventas sumadas por fecha al array ventas
        this.ventas = Object.values(ventasPorFecha);

        // Configurar options.labels con fechas únicas sin duplicados
        this.options.labels = [...new Set(Object.keys(ventasPorFecha))];

        this.showGrafico = this.ventas.length > 0;

        // Calcular totales
        const sumaMontos = Object.values(ventasPorFecha).reduce((total, monto) => total + parseFloat(monto), 0);
        const pagoComision = this.porCobrar.reduce((total, venta) => total + (venta.monto * (venta.comision / 100)), 0);

        this.totalMes = sumaMontos.toFixed(2);
        this.totalMesComision = pagoComision.toFixed(2);

        console.log(this.ventas);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    },
    async registrar(id) {
      const response = await this.$makeRequest("/api/ventas/porCobrar?id=" + id, "POST");
      this.days = [];
      await this.getPorCobrar();
    },
    formatterFecha(fecha){
      const fechaOriginal = fecha;
      const fechaFormateada = new Date(fechaOriginal).toISOString().split('T')[0].replace(/-/g, '/');
      return fechaFormateada;
    }
  },
  computed: {
    pagoProximo() {
      const pagos = this.porCobrar;
      const fechaActual = new Date();
      let pagoProximo = null;
      let diferenciaMinima = Infinity;

      for (const pago of pagos) {
        const fechaPago = new Date(pago.fecha);
        const diferencia = Math.abs(fechaPago - fechaActual);

        if (diferencia < diferenciaMinima) {
          diferenciaMinima = diferencia;
          pagoProximo = pago;
        }
      }
      return pagoProximo;
    }
  },
  created() {
    this.getPorCobrar();
    // Obtener el botón por su ID
    setTimeout(() => {
      const miBoton = document.getElementsByClassName("q-btn--actionable q-focusable q-hoverable q-btn--wrap q-btn--dense");
      let counter = 0;
      for (let i = 0; i < miBoton.length; i++) {
        const boton = miBoton[i];
        if (i > 6) {
          counter += 1;
          boton.id = `${counter}`;
        }
      }
    }, 500);
  }
};
</script>
<style scoped>
.no-shadow {
  box-shadow: none;
}


.login-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #32934C;
}

.container {
  /*position: fixed;*/
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-text {
  font-size: 2rem;
  font-weight: bold;
  color: #fff3e0;
}

/*.logo-text::before {
  content: "🍔";
  display: inline-block;
  font-size: 4rem;
  margin-right: 0.5rem;
  transform: rotate(-10deg);
}*/
/*.logo-text::after {
  content: "🍟";
  display: inline-block;
  font-size: 4rem;
  margin-left: 0.5rem;
  transform: rotate(10deg);
}*/
.login-card {
  width: 100%;
  min-height: 100vh;
  border-radius: 16px 16px 0 0;
}

.login-card .q-card-section:first-child {
  border-radius: 16px 16px 0 0;
}

.submit-button {
  margin-top: 16px;
  width: 100%;
}

.separator {
  margin-top: 1em;
  margin-bottom: 1em;
}

.social-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
}

.outlook-button {
  color: #ffffff;
  background-color: #0072C6;
}

.facebook-button {
  color: #ffffff;
  background-color: #3B5998;
}
</style>
