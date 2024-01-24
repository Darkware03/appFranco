<template>
  <q-page class="login-page">
    <div>
      <div class="q-ml-lg row">
        <div class="col-12 text-center">
          <q-avatar size="9em" color="white" class="q-mt-md">
            <q-img :src="`${url}/api/fotos/${userInfo.foto_perfil}`" />
          </q-avatar>
        </div>
        <div class="col-12 text-white text-h5 q-mt-lg text-center">
          <p style="font-size: 1em">
            {{ userInfo.nombres }} <br>{{ userInfo.apellidos }}

          </p>
        </div>
      </div>
      <div class="row" v-if="perfilInfo != null">
<!--        <div class="col-4 text-center q-my-sm">
          <span class="">
            <span class="text-white text-weight-bold">
              <q-icon name="bi-percent" color="white"/>
              {{ perfilInfo.porcentajeCierre>0?perfilInfo.porcentajeCierre:0 }}%
            </span><br>
            <span class="text-negative">
             Porcentaje de cierre
            </span>
          </span>
        </div>
        <div class="col-4 text-center q-my-sm">
          <span class="">
&lt;!&ndash;            <div class="hexagon">
              <i class="icon bi bi-search"></i>
            </div>&ndash;&gt;
            <span class="text-white text-weight-bold">
              <q-icon name="bi-currency-dollar" color="white"/>
              {{ ganancias }}
            </span><br>
            <span class="text-negative">
              ganancias totales
            </span>
          </span>
        </div>
        <div class="col-4 text-center q-my-sm">
          <span class="">
&lt;!&ndash;            <div class="hexagon">
              <i class="icon bi bi-search"></i>
            </div>&ndash;&gt;
            <span class="text-white text-weight-bold">
              <q-icon name="bi-calendar" color="white"/>
              {{ fecha(perfilInfo.fechaCreacion.created_at) }}
            </span><br>
            <span class="text-negative">
             ultima venta
            </span>
          </span>
        </div>-->
        <div class="col-12 text-white text-h5 q-mt-lg text-center">
         <p style="font-size: 0.8em">
           {{ userInfo.nombres }} {{ userInfo.apellidos }}
         </p>
        </div>
      </div>
      <div class="row bg-positive q-mt-xl login-card">
        <div class="col-12 text-center q-my-sm text-white">
          <b> Correo: </b>{{userInfo.correo}}
        </div>
        <div class="col-12 text-center q-my-sm text-white">
          <b>Producto o servicio:</b> {{userInfo.producto_servicio}}
        </div>
<!--        <div class="col-6 text-center q-my-sm">
          <div class="hexagon bg-negative" @click="$router.push('/cierre')">
              <q-icon class="icon  bi-pie-chart-fill" color="secondary"/>
          </div>
        </div>
        <div class="col-6 text-center q-my-sm">
          <div class="hexagon bg-negative" @click="$router.push('/porCobrar')">
              <q-icon class="icon  bi-calendar-date" color="secondary"/>
          </div>
        </div>-->
<!--        <div class="col-4 text-center q-my-sm">-->
<!--          <div class="hexagon bg-negative" @click="$router.push('/etrenencia')">-->
<!--              <q-icon class="icon  bi-calculator" color="secondary"/>-->
<!--          </div>-->
<!--        </div>-->
        <div class="col-12">
          <q-card class="login-card " flat bordered  style="height: 40em">
            <q-card-section>
              <q-list  class="rounded-borders text-justify">
                <p class="text-center text-positive text-h5">
                Datos de la empresa
                </p>
                <div class="text-center q-my-md">
                    <b class="text-positive">Nombre:</b> {{userInfo.nombre}}
                </div>
                <div class="text-center q-my-md">
                 <b class="text-positive"> Encargado:</b> {{userInfo.direccion}}
                </div>
                <div class="text-center q-my-md">
                 <b class="text-positive"> Numero telefono:</b> {{userInfo.direccion}}
                </div>
                <div class="text-center q-my-md">
                 <b class="text-positive"> Direccion:</b> {{userInfo.direccion}}
                </div>
<!--                <div v-if="ventas.length">
                  <q-infinite-scroll :offset="50">
                  <q-item v-for="item in ventas" :key="item.id">
                    <q-item-section>
                      <q-item-label lines="1" class="q-pa-xs bg-negative text-center">
                     <span class="text-center text-secondary">
                    {{ item.producto }} - {{ fecha(item.created_at, 2) }}
                     </span>
                      </q-item-label>
                      <q-item-label caption>
                        Cliente
                        <span class="text-weight-bold">
                        {{ item.nombre }}
                      </span>
                        <br>
                        Venta total:
                        <span class="text-weight-bold">
                        ${{ item.cantidad * item.monto }}
                      </span>
                        <br>
                        <br>
                        <p class="q-btn&#45;&#45;rounded bg-secondary q-pa-xs text-white">
                          Comision ganada:
                          <span class="text-weight-bold">
                          $ {{
                              ((item.cantidad * item.monto) *
                              (item.comision / 100)).toFixed(2)
                            }}
                        </span>
                        </p>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  </q-infinite-scroll>
                </div>
                <div v-else class="text-center text-weight-bold">
                  <p>No posee ventas hechas...</p>
                </div>
             --> </q-list>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { date } from 'quasar'
export default {
  name: 'perfil',
  data(){
    return {
      data: [
        {
          fecha: '09 mayo 2023',
          unidadesVendidas: 5,
          precioUnitario: 5.00,
          producto: 'Botella p/ agua',
          comisionPercent: 25,
        },
        {
          fecha: '09 mayo 2023',
          unidadesVendidas: 250,
          precioUnitario: 1.50,
          producto: 'audifonos xtreme',
          comisionPercent: 30,
        },
        {
          fecha: '05 mayo 2023',
          unidadesVendidas: 1,
          precioUnitario: 100.00,
          producto: 'microondas wave',
          comisionPercent: 12,
        },
      ],
      userInfo: null,
      perfilInfo:null,
      url: process.env.API_URL,
      ventas: []
    }
  },
  methods:{
    async getPerfilInfo(){
      this.$store.commit('general/setLoader', true);
      try {
        const response = await this.$makeRequest("/api/perfil", "GET");
        this.perfilInfo = response.data;
      }catch (e){}
      finally {
        this.$store.commit('general/setLoader', false);
      }
    },
    async getVentas(){
      this.$store.commit('general/setLoader', true);
      try {
        const response = await this.$makeRequest(`/api/ventas?mesActual=${true}`, "GET");
        this.ventas = response;
      }catch (e){}
      finally {
        this.$store.commit('general/setLoader', false);
      }
    },
    fecha(fecha, tipo = 1){
      if (tipo == 1){
        const timeStamp = fecha
        const formattedString = date.formatDate(timeStamp, 'DD/MM/YYYY')
        return formattedString
      }
      if (tipo == 2){
        const timeStamp = fecha
        const formattedString = date.formatDate(timeStamp, 'DD/MM/YYYY')
        return formattedString
      }
    }
  },
created(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.getPerfilInfo();
    this.getVentas();
  },
  computed: {
    ganancias() {
      let ganancia = 0;
      const mesActual = new Date().getMonth() + 1; // Obtiene el mes actual (1-12)

      if (this.ventas.length > 0) {
        this.ventas
          .filter(row => new Date(row.created_at).getMonth() + 1 === mesActual) // Filtra por el mes actual
          .forEach(row => {
            ganancia += (row.cantidad * row.monto) * (row.comision / 100);
          });
      }

      return ganancia.toFixed(2);
    }
  }
}
</script>
<style scoped>
.login-card {
  border-radius: 16px 16px 0 0;
}
.hexagon {
  position: relative;
  width: 4em;
  height: 4em;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 1.5em;
}

.hexagon i.icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  color: white;
}

</style>
