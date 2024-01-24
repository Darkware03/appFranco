<template>
  <q-page class="login-page q-mt-xl">
    <div class="container" style="margin-top: 0%">
      <p class="logo-text text-center">Reporte Cierre de Ventas</p>
      <q-card class="login-card" flat bordered>
        <q-card-section class="">
        <div class=" q-mx-sm" >
          <p class="text-center text-weight-bold">
<!--
            PROCENTAJE DE CIERRE DE: {{ (totalCliente * 100) / totalProspecto }} %
-->
<!--
            $porcentajeCierre = ($ventasExitosas / $totalOportunidades) * 100;
-->

<!--
            PORCENTAJE DE CIERRE DE: {{ ((totalVentas / (totalVentas + totalProspectox)) * 100).toFixed(2)  }} %
-->
            PORCENTAJE DE CIERRE DE: {{ ((totalCliente * 100) / totalProspecto ).toFixed(2)  }} %
          </p>

          <div class="text-center   text-bold ">
            <q-card-section>
              <div class="row" v-if="!clienteNuevo">

                <div class="col-6"></div>
                <div class="col-12">
                  <div class="text-center text-bold">
                    <div class="text-center text-bold">
                      Ultimos 30 dias
                    </div>
                    <q-checkbox v-model="periodoespecifico" label="Periodo especifico"/>
                    <div class="row q-mb-md q-mt-md" v-if="periodoespecifico">
                      <div class="col q-mx-sm">
                        <q-btn  outlined label="Fecha inicial" @click="verCalendario1 = !verCalendario1"></q-btn>
                        <span v-if="dateItems[0].selectedDay">
                    {{dateItems[0].selectedDay.value}}/{{dateItems[0].selectedMonth.value}}/{{dateItems[0].selectedYear.value}}
                    </span>
                      </div>
                      <div class="col  q-mx-sm">
                        <q-btn  outlined label="Fecha Final" @click="verCalendario2 = !verCalendario2"></q-btn>
                        <span v-if="dateItems2[0].selectedDay">
                       {{dateItems2[0].selectedDay.value}}/{{dateItems2[0].selectedMonth.value}}/{{dateItems2[0].selectedYear.value}}
                    </span>
                      </div>
                    </div>
                  </div>
<!--                  <q-table
                    :data="rows"
                    :columns="columns"
                  />-->
                </div>
              </div>
            </q-card-section>
            <q-dialog v-model="verCalendario1">
              <div>
                <q-card  class="q-pa-md">
                  <p class="text-bold q-ma-md">Seleccione fecha:</p>
                  <div class="row q-mt-xl" v-for="(item, index) in dateItems" :key="index">
                    <div class="col q-mx-sm">
                      <q-select label="año" outlined hint="año"
                                v-model="item.selectedYear"
                                :options="yearsList"
                      ></q-select>
                    </div>
                    <div class="col  q-mx-sm">
                      <q-select label="mes" outlined hint="mes"
                                v-model="item.selectedMonth"
                                :options="monthsOfYear"
                      ></q-select>
                    </div>
                    <div class="col  q-mx-sm">
                      <q-select label="dia" outlined hint="dia"
                                v-model="item.selectedDay"
                                :options="daysInMonth"
                      >
                      </q-select>
                    </div>
                  </div>
                  <div class="q-mt-md text-center">
                    <q-btn color="secondary" @click="verCalendario1 = !verCalendario1">GUARDAR</q-btn>
                  </div>
                </q-card>
              </div>
            </q-dialog>
            <q-dialog v-model="verCalendario2">
              <div>
                <q-card  class="q-pa-md">
                  <p class="text-bold q-ma-md">Seleccione fecha:</p>
                  <div class="row q-mt-xl" v-for="(item, index) in dateItems2" :key="index">
                    <div class="col q-mx-sm">
                      <q-select label="año" outlined hint="año"
                                v-model="item.selectedYear"
                                :options="yearsList2"
                      ></q-select>
                    </div>
                    <div class="col  q-mx-sm">
                      <q-select label="mes" outlined hint="mes"
                                v-model="item.selectedMonth"
                                :options="monthsOfYear2"
                      ></q-select>
                    </div>
                    <div class="col  q-mx-sm">
                      <q-select label="dia" outlined hint="dia"
                                v-model="item.selectedDay"
                                :options="daysInMonth2"
                      >
                      </q-select>
                    </div>
                  </div>
                  <div class="q-mt-md text-center">
                    <q-btn color="secondary" @click="verCalendario2 = !verCalendario2">GUARDAR</q-btn>
                  </div>
                </q-card>
              </div>
            </q-dialog>
          </div>


          <q-card class="q-mt-md q-mb-xl  text-white text-center">

            <q-table
              :data="[totalProspecto | totalCliente]"
              :columns="columns"
              row-key="name"
              hide-bottom
              :separator="'vertical'"
            >
              <template v-slot:body-cell-prospecto>
                <td>
                  {{ totalProspecto }}
                </td>
              </template>
              <template v-slot:body-cell-cliente>
                <td>
                  <p class="q-mt-md text-center">
                     {{ totalCliente }}
                  </p>
                </td>
              </template>
            </q-table>

<!--            <p>1
              <span class="text-weight-bold">porcentaje cierre:</span> Cierre 30%
            </p>-->
          </q-card>
          <div class="text-center">
            <p class="text-weight-bold q-mt-md">
              Cierre por categoria
            </p>
            <bar-chart v-if="dataChart.length>0 && options.labels.length>0" :data="dataChart" :options="options"/>
          </div>
          <div class="text-center q-my-lg">
            <p class="text-weight-bold q-mt-xl">
              Cierre por categoria
            </p>

<!--
            DARLE DISEÑO DE LA TBLA QUASARA
-->
            <div class="text-center flex justify-center q-py-md">
              <table class="q-table">
                <tr style="border: solid 1px black; !important;" class="bg-secondary text-white">
                  <td>Nombre</td>
                  <td>Categoria</td>
                  <td>Tipo</td>
                </tr>
                <tr style="border: solid 1px" v-for="cliente in data" :key="cliente.id">
                  <td style="border: solid 1px">{{cliente.nombre}}</td>
                  <td style="border: solid 1px">
                    <q-badge color="secondary" v-if="cliente.referencia">
                      {{cliente.referencia}}
                    </q-badge>
                  </td>
                  <td style="border: solid 1px">{{cliente.tipoCliente}}</td>
                </tr>
              </table>
            </div>
<!--
            <q-table
              :data="data"
              :columns="columns2"
              row-key="name"
              :separator="'vertical'" bordered
            >
              <template v-slot:body-cell-cliente="props">
                <td class="q-mt-sm">
                  <q-card class="q-py-sm" flat>
                    {{ props.row.nombre }}
                    <q-badge v-if="props.row.tipo === 1" color="info" class="q-mx-xs q-py-xs"> Cliente </q-badge>
                    <q-badge v-else color="secondary" class="q-mx-xs"> Prospecto </q-badge>
                    <q-badge class="q-mx-xs q-py-xs" color="accent text-black"> {{ props.row.referencia }} </q-badge>
                  </q-card>
                </td>
              </template>
            </q-table>
-->
          </div>
        </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import DonutChart from '../components/DonutChart';
import BarChart from "components/ColumnChart";
export default {
  components: {
    BarChart,
  },
  name: 'cierre',
  data(){
    return {
      clienteNuevo:false,
      numberVarios: 1,
      dateItems: [], // Array para almacenar los datos de fecha de cada conjunto
      dateItems2: [], // Array para almacenar los datos de fecha de cada conjunto
      monthsOfYears: [
        { label: "Enero", value: 1 },
        { label: "Febrero", value: 2 },
        { label: "Marzo", value: 3 },
        { label: "Abril", value: 4 },
        { label: "Mayo", value: 5 },
        { label: "Junio", value: 6 },
        { label: "Julio", value: 7 },
        { label: "Agosto", value: 8 },
        { label: "Septiembre", value: 9 },
        { label: "Octubre", value: 10 },
        { label: "Noviembre", value: 11 },
        { label: "Diciembre", value: 12 },
      ],
      verCalendario1: false,
      verCalendario2: false,
      totalVentas:0,
      periodoespecifico:false,
      columns: [
        { name: 'cliente',field: 'cliente', align: 'center', label: 'Total Clientes',headerClasses: 'bg-secondary text-white' },
        { name: 'prospecto',field: 'prospecto', align: 'center', label: 'Total Prospectos',headerClasses: 'bg-secondary text-white' },
/*
        { name: 'total_v', field: 'total_v', align: 'center', label: 'Total venta',headerClasses: 'bg-secondary text-white' },
*/
      ],
      columns2:[
        { name: 'cliente',field: 'cliente', align: 'center', label: 'Prospectos / Clientes',headerClasses: 'bg-secondary text-white' },
/*
        { name: 'prospecto',field: 'prospecto', align: 'center', label: 'Prospectos',headerClasses: 'bg-secondary text-white' }
*/
      ],
      data: [],
      dataChart: [],
      options: {
        labels: [],/*['Socios', 'Agentes', 'Agencia', 'Rigen', 'No venta'],*/
        colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0']
      },
      totalCliente: 0,
      totalProspecto: 0,
      totalClientex: 0,
      totalProspectox: 0,
      rows: []
    }
  },
  methods:{
    async getCierre(){
      this.$store.commit('general/setLoader', true);
      let variableDinamica = {};
      try {
        const response = await this.$makeRequest("/api/ventas/cierreVenta", "GET");
        response[0].forEach(rows => {
          variableDinamica[rows.referencia] = 0;
        })
        this.data = response[0];
        let count = 0;
        let count2 = 0;
        let count3 = 0;
        response[1].forEach(row => {
          this.options.labels.push(row.referencia)
        })
        response[0].forEach(row => {
          if (row.prospecto === 0){
            this.totalCliente = this.totalCliente + 1;
          }
          if (row.prospecto === 1){
            this.totalProspecto = this.totalProspecto + 1;
          }

          if (variableDinamica.hasOwnProperty(row.referencia)){
            variableDinamica[row.referencia] +=1;
          }
        })
        response[3].forEach(row => {
          if (row.prospecto === 0){
            this.totalClientex = this.totalClientex + 1;
          }
          if (row.prospecto === 1){
            this.totalProspectox = this.totalProspectox + 1;
          }
        })

        Object.keys(variableDinamica).forEach(key => {
          const value = variableDinamica[key];
          this.dataChart.push(value)
        });
        for (let i = 0; i<=response[2].length; i++){
          this.totalVentas = i;
        }
      }catch (e){
        console.log(e);
      }
      finally {
        this.$store.commit('general/setLoader', false);
      }
    }
  },
  created() {
    for (let i = 0; i < this.numberVarios; i++) {
      this.dateItems.push({
        selectedYear: null,
        selectedMonth: null,
        selectedDay: null,
      });
    }
    for (let i = 0; i < this.numberVarios; i++) {
      this.dateItems2.push({
        selectedYear2: null,
        selectedMonth2: null,
        selectedDay2: null,
      });
    }
    this.getCierre();
  },
  watch:{
    numberVarios (value) {
      if (this.numberVarios<0 || this.numberVarios == ''){
        this.numberVarios = 1;
      }

      if (this.numberVarios>0){
        for (let i = 0; i < this.numberVarios; i++) {
          this.dateItems.push({
            selectedYear: null,
            selectedMonth: null,
            selectedDay: null,
          });
        }
      }
    }
  },
  computed:{
    dias () {
      const dias = [];
      for (let i; i<=30; i++){
        console.log("i",i);
        dias.push(i);
      }
      console.log(dias);
      return dias;
    },
    yearsList() {

      const currentYear = new Date().getFullYear();
      const startYear = currentYear; // Cambia esto según tus necesidades (por ejemplo, -10 para mostrar los últimos 10 años)
      const endYear = currentYear + 25; // Cambia esto según tus necesidades (por ejemplo, +10 para mostrar los próximos 10 años)

      let years = [];
      // Genera tu lista de años aquí (como se mencionó en la respuesta anterior)
      for (let year = startYear; year <= endYear; year++) {
        years.push({ label: year.toString(), value: year });
      }
      return years;
    },
    monthsOfYear() {
      // Genera tu lista de meses aquí (como se mencionó en la respuesta anterior)
      return this.monthsOfYears;
    },
    daysInMonth() {
      // Genera tu lista de días aquí (como se mencionó en la respuesta anterior)
      const days = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
      const dias = [];
      for (let i = 1; i <= days; i++) {
        dias.push({ label: i.toString(), value: i });
      }
      return dias;
    },
    yearsList2() {

      const currentYear = new Date().getFullYear();
      const startYear = currentYear; // Cambia esto según tus necesidades (por ejemplo, -10 para mostrar los últimos 10 años)
      const endYear = currentYear + 25; // Cambia esto según tus necesidades (por ejemplo, +10 para mostrar los próximos 10 años)

      let years = [];
      // Genera tu lista de años aquí (como se mencionó en la respuesta anterior)
      for (let year = startYear; year <= endYear; year++) {
        years.push({ label: year.toString(), value: year });
      }
      return years;
    },
    monthsOfYear2() {
      // Genera tu lista de meses aquí (como se mencionó en la respuesta anterior)
      return this.monthsOfYears;
    },
    daysInMonth2() {
      // Genera tu lista de días aquí (como se mencionó en la respuesta anterior)
      const days = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
      const dias = [];
      for (let i = 1; i <= days; i++) {
        dias.push({ label: i.toString(), value: i });
      }
      return dias;
    },
  },

}
</script>
<style scoped>
.no-shadow {
  box-shadow: none;
}


.login-page {
  height: 100%;
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
