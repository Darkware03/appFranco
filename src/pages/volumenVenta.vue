<template>
  <q-page class="login-page">
<!--
    ORDENAR FECHAS DE MENOR A MAYOR
-->
    <div class="container">
      <p class="logo-text text-center q-mt-xl">Reporte de Ventas</p>
      <q-card class="login-card" flat bordered>
        <div class="q-mt-lg q-mx-sm">
          <p class="text-center text-weight-bold" v-if="!periodoespecifico">Ultimos 30 dias</p>
          <div class="row text-center">
            <q-checkbox v-model="periodoespecifico" label="Periodo especifico"/>
<!--            <div class="row q-mb-md q-mt-md" v-if="periodoespecifico">
              <div class="col q-mx-sm">
                <q-select label="año" outlined hint="Fecha inicial"></q-select>
              </div>
              <div class="col  q-mx-sm">
                <q-select label="mes" outlined hint="Fecha Final"></q-select>
              </div>
            </div>-->
            <div class="col-8" v-if="periodoespecifico">Selecciona un rango de fechas
<!--              <q-input filled v-model="fechaInicio" mask="date" :rules="['date']">-->
              <q-btn round color="secondary" class="q-ml-sm">
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="model" color="secondary" range>
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="secondary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                <!--
                              </q-input>
                -->
              </q-btn>
            </div>
<!--
            <div class="col-5 q-ml-md">
              <q-input filled v-model="fechaFin" mask="date" :rules="['date']">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="fechaFin" color="secondary">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="secondary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
-->
            <div class="col-1 q-ml-xs q-mt-xs" v-if="periodoespecifico">
              <q-btn label="" icon="search" outline flat @click="ventasVolumen"/>
            </div>
            <div class="col-12 text-center q-mt-md" v-if="periodoespecifico">
              <span color="secondary">Fechas: <q-badge color="secondary">{{ reformattedDate.Desde + " - " + reformattedDate.Hasta }}</q-badge> </span>
            </div>
          </div>
        </div>
        <q-separator/>
        <q-card-section class="q-mt-lg" v-if="!periodoespecifico">
          <p class="text-h6 text-center text-secondary">
<!--
           {{ total }} ventas realizadas
-->
            Volumen total: $ {{ volumenTotal }}
          </p>
          <ColumnChart :data="ventas" :options="options" v-if="showChart"/>
        </q-card-section>
        <q-card-section class="q-mt-lg text-center" v-else>
          <p class="text-h6 text-center text-secondary">
            <!--
                       {{ total }} ventas realizadas
            -->
            Volumen total: $ 0.00
          </p>
          <div class="text-weight-bold text-positive">
            <p v-if="!showChart">No posee ventas en este rango de fechas...</p>
          <ColumnChart :data="ventas" :options="options" v-else/>

          </div>
        </q-card-section>
        <q-card-section>
<!--          <q-table
            :data="rows"
            :columns="columns"
          />-->

<!--          sacar la venta promedio que genero en el periodo seleccionado o por defecto en los ultimos 30 dias&ndash;&gt; total de volumen de ventas entre la cantidad de ventas que se realizaron-->
        </q-card-section>
<!--        <q-separator/>-->
          <div class="row q-mx-md q-mt-md" flat v-if="personalBCS!==null">
            <p class="col-6 bg-green-7 text-center q-pa-sm text-white">
              Venta promedio
            </p>
            <p class="col-6 flex flex-center q-card--bordered text-center">
              $ {{ personalBCS.total_monto }}<br>
              {{ personalBCS.fecha }}
            </p>
          </div>
          <div class="row q-mx-md q-mt-md" flat v-else>
            <p class="col-6 bg-green-7 text-center q-pa-sm text-white">
              Record personal
            </p>
            <p class="col-6 flex flex-center q-card--bordered text-center">
              $ 0.00<br>

            </p>
          </div>

        <div>
          <q-table :data="ventasc" :columns="columnas">
            <template v-slot:body-cell-created_at="props">
              <td>
                {{ fecha(props.row.created_at) }}
              </td>
            </template>
            <template v-slot:body-cell-referencia="props">
              <td>
              <span v-for="tag in convertirTags(props.row.referencia)" :key="tag">
                <q-badge class="q-mx-xs" color="secondary">
                  {{ tag }}
                </q-badge>
              </span>
              </td>
            </template>
          </q-table>
        </div>
      </q-card>
    </div>
    <q-dialog :value="loader" content-css="box-shadow: none;">
      <q-img src="../assets/loader2.gif" class="no-shadow"/>
    </q-dialog>
  </q-page>
</template>
<script>
import { ref } from "vue";
import ColumnChart from "components/ColumnChart";
import AddVenta from "pages/addVenta";
import Ventas from "pages/ventas";

export default {
  name: "volumenVenta",
  components: {  ColumnChart },
  data: () => ({
    ventasc:[],
    columns: [
      { name: 'pago',  label: 'Pagos posteriores', field: 'pago', align: 'center'},
      { name: 'fecha', label: 'Fecha', field: 'fecha', align: 'center'},
    ],
    rows: [],
    columnas: [
      {
        name: "nombre",
        field: "nombre",
        align: "center",
        label: "Nombre cliente",
        headerClasses: "bg-secondary text-white"
      },
      {
        name: "referencia",
        field: "referencia",
        align: "center",
        label: "Referencia",
        headerClasses: "bg-secondary text-white"
      },
      {
        name: "created_at",
        field: "created_at",
        align: "center",
        label: "Fecha",
        headerClasses: "bg-secondary text-white"
      },
      {
        name: "monto",
        field: "monto",
        align: "center",
        label: "Monto",
        headerClasses: "bg-secondary text-white"
      },
    ],
    model: { from: '', to: '' },
    loader: false,
    periodoespecifico: false,
    date: ref('2019/02/01'),
    fechaInicio:null,
    fechaFin:null,
    volumenTotal:0,
    ventas: [],
    personalBCS: null,
    options: {
      labels: [],
      colors: ['#2D8847'],
      dates: [],
      yaxisTitle: ['Volumen de ventas'],
      tooltip: {
        unit:[],
      },
    },
    total:0,
    showChart: false,
  }),
  methods:{
    getRows(){
      this.rows = [{
        pago: '$ 10.00',
        fecha: '30/08/2023'
      }]
    },
    async getVentas(){
      this.$store.commit('general/setLoader', true);
      try {
        const response = await this.$makeRequest("/api/ventas", "GET");
        this.ventas = response;
        this.ventasc = response;
      }catch (e){}
      finally {
        this.$store.commit('general/setLoader', false);
      }
    },
    async ventasVolumen(){
      this.showChart = false;
      this.$store.commit('general/setLoader', true);
      try {
        this.ventas = [];
        this.options.labels = [];
        this.fechaFin = this.model.from;
        this.fechaInicio = this.model.to;
        this.fechaFin = this.formatterFecha(this.model.from);
        this.fechaFin = this.formatterFecha(this.model.to);
        console.log("FECHAFI",this.fechaFin);
        if (this.fechaFin == '') this.fechaFin = null;
        if (this.fechaInicio == '') this.fechaInicio = null;
        const response = await this.$makeRequest(`/api/ventas/volumen?fechaInicio=${this.formatterFecha(this.model.from)}&fechaFin=${this.formatterFecha(this.model.to)}`, "GET");
        this.personalBCS = await this.montoMayor(response)
        this.total = 0;

          response.forEach(row => {
            //this.options.tooltip.unit.push(row.volumen_ventas)
          this.ventas.push(row.total_monto)
            console.log("VENTAS",this.ventas);
            this.options.labels = [];
          this.volumenTotal+=Number(row.total_monto);
          this.options.labels.push(row.fecha)
          this.total = this.total + row.total_monto;
          this.ventas.length>0?this.showChart=true:'';
        })
      }catch (e){
        console.error("ERROR",e);
      }
      finally {
        this.$store.commit('general/setLoader', false);
      }
    },
    async montoMayor (data) {
      const objetoMayorTotalMonto = data.reduce((maxObj, obj) => {
        const maxTotalMonto = parseFloat(maxObj.total_monto);
        const currentTotalMonto = parseFloat(obj.total_monto);

        return currentTotalMonto > maxTotalMonto ? obj : maxObj;
      });
      return objetoMayorTotalMonto;
    },
    formatterFecha(fecha){
      const fechaOriginal = fecha;
      const fechaFormateada = new Date(fechaOriginal).toISOString().split('T')[0].replace(/-/g, '-');
      return fechaFormateada;
    },
    fecha(fecha){
      const fechaOriginal = fecha;
      const fechaFormateada = new Date(fechaOriginal).toISOString().split('T')[0].replace(/-/g, '/');
      return fechaFormateada;
    },
    convertirTags(tags){
      const parsedTags = JSON.parse(tags)
      console.log(parsedTags);
      return parsedTags;
    }
  },
  computed: {
    reformattedDate(){
      return { Desde: this.model.from, Hasta: this.model.to }
    }
  },
  created() {
    const today = new Date(); // Obtiene la fecha de hoy
    const year = today.getFullYear(); // Año actual
    const month = today.getMonth(); // Mes actual (0-11)

// Primer día del mes actual
    const firstDayOfMonth = new Date(year, month, 1);
// Último día del mes actual (incrementa en 1 al siguiente mes y luego retrocede 1 día)
    const lastDayOfMonth = new Date(year, month + 1, 0);

// Formatea las fechas en el formato YYYY-MM-DD
    const formatDate = date => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

// Ahora establece el modelo
    this.model = {
      from: formatDate(firstDayOfMonth),
      to: formatDate(lastDayOfMonth),
    };
    this.ventasVolumen();
    this.getVentas();
    this.getRows();
  },
  watch: {
    periodoespecifico(val){
      val?this.showChart = false: this.ventasVolumen();
    }
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
.google-button {
  color: #ffffff;
  background-color: #DB4437;
}
.outlook-button {
  color: #ffffff;
  background-color: #0072C6;
}
.facebook-button {
  color: #ffffff;
  background-color: #3B5998;
}
.signup-link {
  color: #32934C;
  text-decoration: none;
}
.signup-link:hover {
  text-decoration: underline;
}
</style>
