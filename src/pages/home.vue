<template>
  <q-page class="login-page">
    <div class="container">
      <div class="row q-mt-sm">
        <!--        <div class="col-4">
                  <q-icon class="q-mb-md q-ml-md" size="7em" name="bi-emoji-laughing" color="white"/>
                </div>-->
        <!--        <div class="col-6 q-mt-lg text-white text-weight-bold">
                  Hola Franco Guerrero, tu cierre ha sido EXCELENTE.
                </div>-->
        <p class="text-weight-bold text-h4 text-white">
          <q-icon name="home" class="q-mb-xs q-mr-sm"/>
          <span>HOME</span>
        </p>
      </div>
      <q-card class="login-card" flat bordered  @click="meta = !meta">
        <div class="q-mt-xl">
          <div class="text-center">
            <q-card class="q-mt-md gradient-bg text-white text-center">
              <div class="q-mt-xs q-mb-sm row q-gutter-sm flex justify-center">
<!--                ESTA META SE VA A DEFINIR EN UNA NUEVA SECCION, manejara los parametros, crear configuracion de meta y al dar click en meta aqui en la card se guarde y esa sea la meta.-->
                <div class="col-12 flex justify-center">
                    <p>
                      META: $ {{ newMeta }}
                    </p>
                </div>
                <div>
                  Por conseguir: $ {{conseguir}}
                </div>
              </div>
              <q-dialog v-model="meta">
                <q-card class="q-pa-md">
                  <q-input value="" label="agregar meta" v-model="newMetaAdd"></q-input>
                  <div class="q-ma-md">
                    <q-btn  color="secondary" @click="postMeta()">GUARDAR</q-btn>
                  </div>
                </q-card>
              </q-dialog>
            </q-card>
          </div>
          <div class="row q-gutter-sm flex justify-center">
            <q-card class="q-mt-md gradient-bg text-white text-center"
                    :class="route.link.includes('nuevoProspecto') ||
                    route.link.includes('agregarVenta')
                    ||route.link.includes('ventaList')
                    ?'col-5':'col-12'"
                    v-for="route in routesFiltered" :key="route.link" @click="redirect(route.link)">
              <div class="q-mt-xs q-mb-sm row q-gutter-sm flex justify-center">
                <div class="col-12 flex justify-center">
                  <q-card style="width: 25%">
                    <q-icon :name="route.icon" size="3em" color="secondary"/>
                  </q-card>
                </div>
                <div class="col-12 text-center">
                  <div class="text-weight-bold" style="font-size: 1.5em">
                    <div v-if="route.link.includes('porCobrar')">
                      $ {{ porCobrar }}
                    </div>
<!--                    <div v-if="route.link.includes('agregarVenta')" class="q-mt-sm">
                      {{ registrarVenta }}
                    </div>-->
                    <div v-if="route.link.includes('volumen')" class="q-mt-sm">
                     $  {{ volumenVenta }}
                    </div>
                    <div v-if="route.link.includes('cierre')" class="q-mt-sm">
                     {{ ((totalVentas / (totalVentas + totalProspectox)) * 100).toFixed(2)  }} %
                    </div>
                  </div>
                    <span class="text-center">
                      {{
                       route.title ==='Ventas por Cobrar'?'Comisiones por Cobrar'
                      :route.title ==='Reporte de Ventas'?'Volumen de Ventas'
                      :route.title ==='Reporte de Prospectos'?'Prospectos Registrados':route.title

                      }}
                      {{route.title!=='Registrar prospecto' && route.title!=='Registrar venta' ?
                      'en el mes': ''}}
                    </span>
                </div>
              </div>
            </q-card>
          </div>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {
  },
  name: 'home',
  data(){
    return {
      totalVentas:0,
      totalClientex: 0,
      totalProspectox: 0,
      meta:false,
      newMeta: 0.00,
      newMetaAdd: 0.00,
      conseguir: 0.00,
      porCobrar: 0,
      routesFiltered: null,
      registrarVenta:0,
      volumenVenta: 0,
      cierre: 0,
      prospectos: 0,
      data: [],
      totalCliente: 0,
      totalProspecto: 0,
    }
  },
  methods:{
    redirect(route){
      this.$router.push(route);
    },
    async getHome(){
      const response = await this.$makeRequest('/api/home', 'GET');
      this.porCobrar = response.porCobrar
      this.registrarVenta = response.registrarVenta.ventas
      this.volumenVenta = response.volumen.volumen_ventas
      this.prospectos = response.prospectos
    },
    async getMeta(){
      const response = await this.$makeRequest('/api/home/meta', 'GET');
      this.newMeta = response[0].monto;
      let sum = 0;
      if (response[1]){
        response[1].forEach(row => {
          sum = Number(sum) + Number(row.monto);
        })
      }
      this.conseguir = Number(this.newMeta) - Number(this.volumenVenta);
      console.log("CONSEGUI",this.conseguir,this.volumenVenta);
    },
    async postMeta(){
      const requestData = {
        valor_monto: this.newMetaAdd
      }
      const response = await this.$makeRequest('/api/home/meta', 'POST',requestData);
      this.newMeta = response.monto;
      await this.getMeta()
      console.log(response);
      this.meta = false;
    },
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

        response[0].forEach(row => {

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
        for (let i = 0; i<=response[2].length; i++){
          this.totalVentas = i;
          console.log(i);
        }
      }catch (e){
        console.log(e);
      }
      finally {
        this.$store.commit('general/setLoader', false);
      }
    }

  },
  computed: {
    ...mapGetters({
      routes: 'general/getRoutes'
    }),
  },
  created() {
    this.getHome()
    this.getMeta()
    this.getCierre()
    console.log(this.routes);
    this.routesFiltered = this.routes.filter( (route) => {
      return route.link !== '/home' && route.link !== '/login'
        && route.link !== '/perfil'
    })
  }
}
</script>
<style scoped>
.gradient-bg {
  /*
  background: linear-gradient(to right,#4dd270, #32934C );
  */
  background: linear-gradient(to right,#32934C, #32934C );
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
.login-card {
  width: 100%;
  min-height: 100vh;
  border-radius: 16px 16px 0 0;
}
.login-card .q-card-section:first-child {
  border-radius: 16px 16px 0 0;
}
</style>
