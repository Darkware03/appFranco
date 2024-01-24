<!--
<template>
  <q-page>
    <div class="flex-center q-px-xl" >
      <q-card class="">
        <div class="row q-pa-sm">
          <div class="col-6 flex flex-center shadow-0">
            Volumen total
          </div>
          <div class="col-5 q-card&#45;&#45;bordered q-ml-md">
            <q-input outlined/>
          </div>
        </div>
        <div class="row q-pa-sm">
          <div class="col-6 flex flex-center shadow-0">
            Total prospectos
          </div>
          <div class="col-5 q-card&#45;&#45;bordered q-ml-md">
            <q-input outlined/>
          </div>
        </div>
        <div class="row q-pa-sm">
          <div class="col-6 flex flex-center shadow-0">
            Total ventas
          </div>
          <div class="col-5 q-card&#45;&#45;bordered q-ml-md">
            <q-input outlined/>
          </div>
        </div>
      </q-card>

      <q-card class="q-mt-lg">
        <div class="row">
          <q-card class="col-6 bg-green-7 text-center q-pa-sm text-white">
            Etpcreencia <br> vs <br>Prospectos
          </q-card>
          <q-card class="col-6 flex flex-center">
            $3000
          </q-card>
        </div>
        <div class="row q-mt-lg">
          <q-card class="col-6 bg-green-7 text-center q-pa-sm text-white">
            Ticket promedio
          </q-card>
          <q-card class="col-6 flex flex-center">
            $3000
          </q-card>
        </div>
      </q-card>
    </div>
  </q-page>
</template>
-->

<template>
  <q-page class="login-page">
    <div class="container">
      <p class="logo-text text-center q-mt-xl"></p>
      <q-card class="login-card" flat bordered>
        <q-card-section class="">
          <div class="row">
            <div class="col-5">
              <q-input filled v-model="fechaInicio" mask="date" :rules="['date']">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="fechaInicio" color="secondary">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="secondary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
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
            <div class="col-1 q-ml-xs q-mt-sm">
              <q-btn label="" icon="search" outline flat @click="ventasVolumen"/>
            </div>
          </div>

          <div class="flex-center q-px-xl">
            <div class="row q-pa-sm">
              <div class="col-6 flex flex-center shadow-0">
                Volumen total
              </div>
              <div class="col-5 q-card&#45;&#45;bordered q-ml-md">
                <q-input outlined/>
              </div>
            </div>
            <div class="row q-pa-sm">
              <div class="col-6 flex flex-center shadow-0">
                Total prospectos
              </div>
              <div class="col-5 q-card&#45;&#45;bordered q-ml-md">
                <q-input outlined/>
              </div>
            </div>
            <div class="row q-pa-sm">
              <div class="col-6 flex flex-center shadow-0">
                Total ventas
              </div>
              <div class="col-5 q-card&#45;&#45;bordered q-ml-md">
                <q-input outlined/>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-separator class="separator"/>
        <div class="">
          <q-card class="row" flat>
            <p class="col-6 bg-green-7 text-center q-pa-sm text-white">
              Eficiencia <br> vs <br>Prospectos
            </p>
            <p class="col-6 flex flex-center q-card--bordered">
              $3000
            </p>
          </q-card>
          <q-card class="row q-mt-lg" flat>
              <p class="col-6 bg-green-7 text-center q-pa-sm text-white">
                Ticket promedio
              </p>
              <p class="col-6 flex flex-center q-card--bordered">
                $3000
              </p>
          </q-card>


        </div>
      </q-card>
    </div>
    <q-dialog :value="loader" content-css="box-shadow: none;">
      <q-img src="../assets/loader2.gif" class="no-shadow"/>
    </q-dialog>
  </q-page>
</template>
<script>
export default {
  name: 'etrenecia',
  data: () => ({
    loader: false,
    days: [],
    fechaInicio:null,
    fechaFin:null,
  }),
  methods:{
    loadLogin(){
      this.loader = true;
      setTimeout(()=> {
        this.loader = false
        this.$router.push('/perfil')
      },3000);
    },
    async getEficiencia(){
      const response = await this.$makeRequest(`/api/eficiencia?fechaInicio=${this.fechaInicio}&fechaFin=${this.fechaFin}`, "GET");
    }
  },
  created() {
    this.getEficiencia();
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

<!--<script>
export default {
  components: {
  },
  name: 'etrenecia',
  data(){
    return { }
  },
}
</script>-->
