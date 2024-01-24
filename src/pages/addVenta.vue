<template>
  <q-page class="login-page">
    <div class="container">
      <p class="logo-text text-center q-mt-xl">Nueva venta </p>
      <q-card class="login-card" flat bordered>
<!--        <div class="text-center">
          <q-btn label="Listado de ventas" class="q-my-xs" color="secondary" :to="'/ventas'" icon="list"/>
        </div>-->
        <div class="text-center q-pt-md">

<!--
          DEPENDIENDO QUE SELECCIONE ARRIBA ME DESPLEGARA NUEVAS OPCIONES ABAJO
--- Si le doy cliente nuevo en vez que diga cliente debe ser un campo de texto que diga
nombre, referencia, moonto, comision y no debe de aparecer esa parte que dice pago po
steriores


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
           <div class="col-9">
             <q-select
               outlined
               v-model="nombre"
               use-input
               color="secondary"
               option-value="id"
               option-label="nombre"
               label="Cliente"
               @keydown="getCliente"
               :options="clientes"
             >

               <template v-slot:no-option>
                 <q-item>
                   <q-item-section class="text-grey">
                     No se encontro cliente
                   </q-item-section>
                 </q-item>
               </template>
               <template v-slot:option="props">
                 <q-item style="border: whitesmoke solid" class="q-ma-md"
                         v-bind="props.itemProps"
                         v-on="props.itemEvents">
                   <q-item-section>
                     <div class="col-12 q-ma-md">
                       <p class="text-center">
                         {{props.opt.nombre}}
                       </p>
                     </div>
                   </q-item-section>
                   <q-item-section>
                     <div class="col-12 text-center q-ma-xs">
                       <q-chip class="text-white" color="secondary" v-if="props.opt.referencia">
                         {{props.opt.referencia}}
                       </q-chip>
                       <q-chip color="red" class="text-white">
                         ({{props.opt.tipo == 1?'CLIENTE' : 'PROSPECTO'}})
                       </q-chip>
                     </div>
                   </q-item-section>
                 </q-item>
               </template>
             </q-select>
           </div>
           <div class="col">
             <q-checkbox v-model="clienteNuevo" label="cliente nuevo"/>
           </div>
         </div>

         <div v-if="clienteNuevo">
           <div class="row">
             <div class="col-9">
               <q-input  v-model="nombre" color="secondary" outlined label="Cliente"/>
             </div>
             <div class="col">
               <q-checkbox v-model="clienteNuevo" label="cliente nuevo"/>
             </div>
             <div class="col-12">
<!--
               que se cree una categoria si no existe de lo contrario mostrar listado de existentes sera un input libre
               igual para referencias TODAS LAS REFERENCIAS
-->
               <q-select outlined label="Categoria/Tipo" class="q-mt-lg" color="secondary" :options="tipos" option-value="id" option-label="nombre" v-model="id_tipo_cliente"/>
             </div>
             <div class="col-12">
               <q-select
                 outlined
                 ref="referenciaCliente"
                 v-model="referenciaCliente"
                 multiple
                 use-input
                 color="secondary"
                 :options="optionsCliente"
                 use-chips
                 :value="inputValueCliente"
                 label="Referencia cliente"
                 class="submit-button q-py-xs"
                 @keydown.space.prevent="handleSpacebarCliente"
                 @input="handleSpacebarCliente"
               >
               </q-select>
             </div>
           </div>
         </div>

          <q-select
            outlined
            ref="referencia"
            v-model="referencia"
            multiple
            use-input
            color="secondary"
            :options="options"
            use-chips
            :value="inputValue"
            label="Referencia"
            class="submit-button q-mb-md"
            @keydown.space.prevent="handleSpacebar"
            @input="handleSpacebar"
          >
          </q-select>
<!--
          PROGRAMAR ESTA PARTE
-->
<!--
          <q-input class="q-mb-md" outlined label="Tags" color="secondary"  v-model="referencia"/>
-->
          <div class="row">
<!--            <div class="col-6">
              <q-select
                outlined
                v-model="producto"
                label="Producto"
                class="q-mb-md"
                color="secondary"
                :options="productos"
                option-value="id"
                option-label="nombre"
              />
            </div>
            <div class="col-5 q-ml-sm">
              <q-input class="q-mb-md" outlined label="Cantidad"  type="number" color="secondary" v-model="cantidad" />
            </div>-->
            <div class="col-6 ">
              <q-input class="q-mb-md" outlined label="Monto" prefix="$" type="number" color="secondary" v-model="monto"/>
            </div>
            <div class="col-5 q-ml-sm">
              <q-input class="q-mb-md" outlined label="Comision" prefix="%" color="secondary" v-model="comision"/>
            </div>
            <div class="col-12 text-center q-py-sm">
              <b>Total a recibir:</b> ${{  monto * (comision / 100)  }}
            </div>

            <div class="col-12 text-center q-py-sm">
              <b>Cobro de comisión:</b>
              <div class="row">
                <div class="col">
                  <q-checkbox v-model="exhibicion" label="Una exhibición"/>
                </div>
                <div class="col">
                  <q-checkbox v-model="varias" label="Varias"/>
                </div>
                <div class="col">
                  <q-checkbox v-model="recurrente" label="Recurrente"/>
                </div>
              </div>
            </div>
            <q-separator/>
          </div>
          <div class="q-my-md row" v-if="recurrente">
            <div class="col">
              <q-select value="" label="Seleccione periodo" outlined color="secondary" :options="['semanales','quincenales','mensuales','trimestrales','semestrales','anuales']" v-model="periodoPago"/>
            </div>
          </div>
          <div class="q-my-md row" v-if="varias">
            <div class="col">
              <q-input value="" label="Seleccione cantidad" outlined color="secondary" type="number" v-model="numberVarios"/>
            </div>
          </div>
<!--          <div class="row q-my-md">
            <q-btn class="submit-button" color="secondary" label="registrar venta" rounded @click="postVenta"/>
          </div>-->
          <div class="row">
            <div class="col-5">
              <q-input v-model="pago" class="q-mb-md" outlined dense
                       label="Fecha de pago" prefix="$" color="secondary" disable/>
            </div>
            <div class="col-2 q-ml-sm">
              <q-btn filled v-model="date" icon="today" @click="verCalendario = !verCalendario"></q-btn>
              <q-dialog v-model="verCalendario">
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
                      <q-btn color="secondary" @click="verCalendario = !verCalendario">GUARDAR</q-btn>
                    </div>
                  </q-card>
                </div>
              </q-dialog>

              <!--
                            AQUI DESOEGARA UN SELEC CON AÑO, MES, DIA en una sola exhibicion, cuando es varias se seleccione cuantas sera por un input number
             para recurentes seleccionare periodos semanales, quiencelas, mensuales, trimestrales, semetre, año
              -->
            </div>
            <div class="col-12 q-mb-md">
              <q-btn class="submit-button" color="secondary" label="registrar venta" rounded @click="postVenta"/>
            </div>
<!--
            <div class="col-4 q-ml-sm">
              <q-btn round color="secondary" @click="addPago()">
                <q-icon name="bi-plus"/>
              </q-btn>
            </div>
-->
            <div class="col-6"></div>
<!--
            <div class="col-12">
              <div class="text-center text-bold">
                <div class="text-center text-bold">
                  Ultimos 30 dias
                </div>
                <q-checkbox v-model="periodoespecifico" label="Periodo especifico"/>
                <div class="row q-mb-md q-mt-md" v-if="periodoespecifico">
                  <div class="col q-mx-sm">
                    <q-select label="año" outlined hint="Fecha inicial"></q-select>
                  </div>
                  <div class="col  q-mx-sm">
                    <q-select label="mes" outlined hint="Fecha Final"></q-select>
                  </div>
                </div>
              </div>
              <q-table
                :data="rows"
                :columns="columns"
              />
            </div>
-->
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
<script>
import { ref } from 'vue'
export default {
  name: "addVenta",
  data: () => ({
    totalClientex: 0,
    totalProspectox: 0,
    totalVentas:0,
    exist: false,
    dateItems: [], // Array para almacenar los datos de fecha de cada conjunto
    selectedYear: null,
    periodoPago: null,
    selectedMonth: null,
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
    selectedDay: null,
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
      { name: 'pago',  label: 'Pagos posteriores', field: 'pago', align: 'center'},
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
  }),
  methods:{
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
      if (event.target !== this.$refs.referenciaCliente.$el.querySelector('input')) {
        return; // Salir si el evento no se generó en el input del multiselect
      }
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
      if (event.target !== this.$refs.referencia.$el.querySelector('input')) {
        return; // Salir si el evento no se generó en el input del multiselect
      }
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
      let cliente = this.nombre.id;
    if (!this.nombre.id){
    /*    this.$q.notify({
          message: "Ha ocurrido un error...",
          color: "info",
          position: "top",
          textColor: "black"
        });*/
      const requestData = {
        nombre: this.nombre,
        referencia: this.referencia,
        tags: JSON.stringify(this.modelMultiple),
        notas: this.notas,
        id_tipo_cliente: this.id_tipo_cliente.id,
      }
      const response = await this.$makeRequest("/api/clientes", "POST", requestData);
      cliente = response.id.id;
    }
      console.log("IDNOM",this.nombre);
      this.$store.commit('general/setLoader', true);
      try {
        let tipocomision;
        let cobrocomision = [];
        this.exhibicion?tipocomision = 1
          :this.varias?tipocomision=2
            :this.recurrente?tipocomision=3:tipocomision=null;
        this.dateItems.forEach(row => {
          console.log(row);
          cobrocomision.push({
            fecha: `${row.selectedDay.value}/${row.selectedMonth.value}/${row.selectedYear.value}`
          })
        })
        console.log("cobrocomision", cobrocomision);
        const requestData = {
          //id_tipo_venta: this.id_tipo_venta.id,
          cliente: cliente,
          referencia: JSON.stringify(this.referencia),
          //producto: this.producto.nombre,
          monto: this.monto,
          //cantidad: this.cantidad,
          comision: this.comision,
          //pagosPosteriores: this.rows,
          //id_empresa: this.empresa.id
          tipoCobroComision:tipocomision,
          cobroComision:cobrocomision,
          periodo:this.periodoPago !==null || this.periodoPago !==''?this.periodoPago:null,
        }
        console.log(requestData);
        const response = await this.$makeRequest(`/api/ventas`, 'POST', requestData);
        console.log(response);
        this.$q.notify({
          message: response.message,
          color: "info",
          position: "top",
          textColor: "black"
        });
      }catch (e) {
        console.log("ERROR", e);
        this.$q.notify({
          message:"ah ocurrido un error!",
          color: "info",
          position: "top",
          textColor: "black"
        });
      }
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
      this.rows = [{
        pago: '$ 10.00',
        fecha: '30/08/2023'
      }]
    }
  },
  mounted() {
    for (let i = 0; i < this.numberVarios; i++) {
      this.dateItems.push({
        selectedYear: null,
        selectedMonth: null,
        selectedDay: null,
      });
    }

    if (this.$q.platform.is.mobile) {
      document.addEventListener('keydown', this.handleSpacebar);
      document.addEventListener('keydown', this.handleSpacebarCliente);
    }
    this.getTiposVentas();
    //this.getProducto();
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
