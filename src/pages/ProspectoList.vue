<template>
  <q-page class="login-page">
    <div class="container">
      <p class="logo-text text-center q-mt-xl">Reporte de Prospectos</p>
      <q-card class="login-card" flat bordered>
        <div class="text-center">
          <!--
                    <q-btn label="Listado de ventas" class="q-my-xs" color="secondary" :to="'/ventas'" icon="list"/>
          -->
        </div>
        <div class="text-center q-pt-md">

          <!--
                    DEPENDIENDO QUE SELECCIONE ARRIBA ME DESPLEGARA NUEVAS OPCIONES ABAJO
          --- Si le doy cliente nuevo en vez que diga cliente debe ser un campo de texto que diga
          nombre, referencia, moonto, comision y no debe de aparecer esa parte que dice pago posteriores


          ---- si es prospectos
          -->
          <!--          <q-btn @click="alert = true">Cliente nuevo </q-btn>
                    <q-btn @click="alert = true">Prospecto</q-btn> &lt;!&ndash;JALAR BASE DE PROSPECTO&ndash;&gt;
                    <q-btn @click="alert = true">Cliente</q-btn> &lt;!&ndash;JALAR BASE DE CLIENTES&ndash;&gt;
                   -->
          <!--          <q-dialog v-model="alert">
                      <q-card>
                        <q-card-section>
                          <div class="text-h6">Alert</div>
                        </q-card-section>
                        <q-card-section class="q-pt-none">
                          CLIENTE NUEVO?
                        </q-card-section>
                        <q-card-actions align="right">
                          <q-btn flat label="SI" color="primary" @click="clienteNuevo=true" />
                          <q-btn flat label="NO" color="primary" v-close-popup />
                        </q-card-actions>
                      </q-card>
                    </q-dialog>-->
        </div>
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
                    <q-btn label="" icon="search" outline flat @click="getProspectos"/>
                  </div>
                  <div class="col-12 text-center q-mt-md" v-if="periodoespecifico">
                    <span color="secondary">Fechas: <q-badge color="secondary">{{ reformattedDate.Desde + " - " + reformattedDate.Hasta }}</q-badge> </span>
                  </div>
                  <div class="col-12 text-center q-mt-md" v-if="periodoespecifico">
                    <span color="secondary">Fechas: <q-badge color="secondary">{{ reformattedDate.Desde + " - " + reformattedDate.Hasta }}</q-badge> </span>
                  </div>
                </div>
              </div>
              <div>
                <ColumnChart :data="registros" :options="options2" v-if="showChart"/>
              </div>
              <q-table
                :data="rows"
                :columns="columns"
              >
                <template v-slot:body-cell-tags="props">
                  <td>
              <span v-for="tag in convertirTags(props.row.tags)" :key="tag">
                <q-badge class="q-mx-xs" color="secondary">
                  {{ tag }}
                </q-badge>
              </span>
                  </td>
                </template>
                <template v-slot:body-cell-fecha="props">
                  <td>
                    <span>
                      {{props.row.created_at}}
                    </span>
                  </td>
                </template>
              </q-table>
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
      </q-card>
    </div>
  </q-page>
</template>
<script>
import { ref } from 'vue'
import ColumnChart from "components/ColumnChart";
export default {
  name: "prospectoLists",
  components: {  ColumnChart },
  data: () => ({
    registros: [],
    showChart:false,
    model: { from: '', to: '' },
    options2: {
      labels: [],
      colors: ['#2D8847'],
      dates: [],
      yaxisTitle: ['Volomen de registros'],
      tooltip: {
        unit:[],
      },
    },
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
    numberVarios: 1,
    periodoespecifico: false,
    verCalendario: false,
    exhibicion: false,
    varias: false,
    recurrente: false,
    loader: false,
    clienteNuevo: false,
    alert: false,
    columns: [
      { name: 'nombre',  label: 'Nombres', field: 'nombre', align: 'center'},
      { name: 'tags', label: 'Tags', field: 'tags', align: 'center'},
      { name: 'tipo', label: 'Tipo', field: 'tipo', align: 'center'},
      { name: 'fecha', label: 'Fecha', field: 'fecha', align: 'center'},
    ],
    options: [],
    optionsCliente: [],
    modelMultipleCliente:[],
    inputValueCliente: '',
    inputValue: '',
    rows: [],
    id_tipo_venta: null,
    referenciaCliente: [],
    tipoVentas: null,
    date: ref(),
    pago: null,
    id_tipo_cliente: null,
    producto: null,
    productos: [],
    empresas: [],
    tipos: [],
    clientes: [],
    clientesOptions: [],
    nombre:null,
    referencia:[],
    empresa:null,
    cantidad:0,
    comision:0,
    monto: 0.00,
    fechaInicio:null,
    fechaFin:null,
  }),
  methods:{
    convertirTags(tags){
      const parsedTags = JSON.parse(tags)
      console.log(parsedTags);
      return parsedTags;
    },
    async registrarProspecto(){
      this.registro = false;
      this.$store.commit('general/setLoader', true);
      try {
        const requestData = {
          nombre: this.nombre,
          referencia: this.referencia,
          tags: JSON.stringify(this.modelMultiple),
          notas: this.notas,
          id_tipo_cliente: this.id_tipo_cliente.id,
        }
        const response = await this.$makeRequest("/api/clientes", "POST", requestData);
        this.nombre.id = response.id.id
        this.$q.notify({
          message: response.message,
          color: "info",
          position: "top",
          textColor: "black"
        });
      } catch (error) {
        console.log(error);
        this.$q.notify({
          message: "Ah ocurrido un error, intente mas tarde",
          color: "dark",
          position: "top"
        });
      }finally {
        this.registro = true;
        this.$store.commit('general/setLoader', false);
        this.limpiar();
      }
    },
    async getTipoCliente(){
      this.$store.commit('general/setLoader', true);
      try {
        const response = await this.$makeRequest("/api/clientes/tipoCliente", "GET");
        this.tipos = response;
      }catch (e){}
      finally {
        this.$store.commit('general/setLoader', false);
      }
    },
    handleSpacebarCliente(event) {
      console.log("ACA");
      if (event.target.value.length <=0 ) return false;
      const inputText = event.target.value;
      const lastCharacter = inputText[inputText.length - 1];
      if (lastCharacter === ' ') {
        if (event.target.value){
          this.referenciaCliente.push(event.target.value);
          this.$nextTick(() => {
            const selectInput = this.$refs.referenciaCliente.$el.querySelector('input');
            if (selectInput) {
              selectInput.value = '';
            }
          });
        }
      }
      if (event.keyCode === 32 || event.code === 'Space'  || event.key === ' '
        /*|| event.keyCode === 229*/) {
        // this.options.push(event.target.value);
        this.referenciaCliente.push(event.target.value);
        this.$nextTick(() => {
          const selectInput = this.$refs.referenciaCliente.$el.querySelector('input');
          if (selectInput) {
            selectInput.value = '';
          }
        });
      }
    },
    handleSpacebar(event) {
      if (event.target.value.length <=0 ) return false;
      const inputText = event.target.value;
      const lastCharacter = inputText[inputText.length - 1];
      if (lastCharacter === ' ') {
        if (event.target.value){
          this.referencia.push(event.target.value);
          this.$nextTick(() => {
            const selectInput = this.$refs.referencia.$el.querySelector('input');
            if (selectInput) {
              selectInput.value = '';
            }
          });
        }
      }
      if (event.keyCode === 32 || event.code === 'Space'  || event.key === ' '
        /*|| event.keyCode === 229*/) {
        // this.options.push(event.target.value);
        this.referencia.push(event.target.value);
        this.$nextTick(() => {
          const selectInput = this.$refs.referencia.$el.querySelector('input');
          if (selectInput) {
            selectInput.value = '';
          }
        });
      }
    },
    loadLogin(){
      this.loader = true;
      setTimeout(()=> {
        this.loader = false
        this.$router.push('/perfil')
      },3000);
    },
    addPago(){
      this.rows.push({
        pago: this.pago,
        fecha: this.date
      })
      this.pago = null;
    },
    async getTiposVentas(){
      const response = await this.$makeRequest('/api/tipoVentas', 'GET');
      this.tipoVentas = response.data;
    },
    async getProducto(){
      const response = await this.$makeRequest(`/api/productos`, 'GET');
      this.productos = response.data
    },
    async getCliente(event = null){
      let value = '';
      if (event !=null){
        value = event.target.value;
      }
      const response = await this.$makeRequest(`/api/clientes?nombre=${value}`, 'GET');
      this.clientes = response
    },
    async getEmpresas() {
      const response = await this.$makeRequest("/api/empresas", "GET");
      this.empresas = response.data;
    },
    async postVenta(){
      if (!this.nombre.id){
        this.$q.notify({
          message: "Ha ocurrido un error...",
          color: "info",
          position: "top",
          textColor: "black"
        });

      }
      await this.registrarProspecto();
      this.$store.commit('general/setLoader', true);
      try {
        const requestData = {
          //id_tipo_venta: this.id_tipo_venta.id,
          cliente: this.nombre.id,
          referencia: JSON.stringify(this.referencia),
          //producto: this.producto.nombre,
          monto: this.monto,
          //cantidad: this.cantidad,
          comision: this.comision,
          pagosPosteriores: this.rows,
          //id_empresa: this.empresa.id
        }
        const response = await this.$makeRequest(`/api/ventas`, 'POST', requestData);
        console.log(response);
        this.$q.notify({
          message: response.message,
          color: "info",
          position: "top",
          textColor: "black"
        });
      }catch (e) {}
      finally {
        this.$store.commit('general/setLoader', false);
        this.limpiar();
      }
    },
    limpiar(){
      this.nombre = null;
      this.referencia = [];
      this.monto = null;
      this.comision = null;
      this.rows = [];
    },
    getRows(){
      this.rows = []
    },
    async getProspectos(){
      this.showChart = false;
      this.fechaFin = this.model.from;
      this.fechaInicio = this.model.to;
      this.fechaFin = this.formatterFecha(this.model.from);
      this.fechaFin = this.formatterFecha(this.model.to);
      console.log("FECHAFI",this.fechaFin);
      if (this.fechaFin == '') this.fechaFin = null;
      if (this.fechaInicio == '') this.fechaInicio = null;
      const response = await this.$makeRequest(`/api/clientes/prospectos?fechaInicio=${this.formatterFecha(this.model.from)}&fechaFin=${this.formatterFecha(this.model.to)}`, "GET");
      this.rows = response[1];
      console.log(response[0]);

      if(response[0].length>0)
      {
        this.showChart = true;
        this.options2.labels=[];
        this.registros=[];
        response[0].forEach(row => {
          this.options2.labels.push(row.fecha)
          this.registros.push(row.total_prospectos)
        })
      }
    },
    formatterFecha(fecha){
      const fechaOriginal = fecha;
      const fechaFormateada = new Date(fechaOriginal).toISOString().split('T')[0].replace(/-/g, '-');
      return fechaFormateada;
    },
  },
  mounted() {
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
    this.getProspectos();
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
    if (this.$q.platform.is.mobile) {
      document.addEventListener('keydown', this.handleSpacebar);
      document.addEventListener('keydown', this.handleSpacebarCliente);
    }
    this.getTiposVentas();
   // this.getProducto();
    this.getCliente();
    //this.getEmpresas();
    this.getTipoCliente();
    this.getRows();
  },
  beforeDestroy() {
    if (this.$q.platform.is.mobile) {
      document.removeEventListener('keydown', this.handleSpacebar);
      document.removeEventListener('keydown', this.handleSpacebarCliente);
    }
  },
  computed:{
    reformattedDate(){
      return { Desde: this.model.from, Hasta: this.model.to }
    },
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
    },
    periodoespecifico(val){
      val?this.showChart = false: this.getProspectos();
    }

  },

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
