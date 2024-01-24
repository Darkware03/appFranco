<template>
  <q-page class="login-page">
    <div class="container">
      <p class="logo-text text-center q-mt-xl">
        Configuracion
      </p>
      <q-card class="login-card" flat bordered>
        <q-card-section class="q-mt-lg">
          <q-select  outlined label="Tipo comision"
                     class="q-mt-lg" color="secondary"
                     :options="['Comision 1', 'Comision 2']"/>
          <q-select  outlined label="Ciclos pago"
                     class="q-mt-lg" color="secondary"
                     :options="['Ciclo 1', 'Ciclo 2']"/>
          <!--          <q-input  outlined label="Apellidos" class="q-mt-lg" color="secondary"/>
                    <q-input  outlined label="Foto de perfil" class="q-mt-lg" color="secondary"/>
                    -->
          <q-btn class="submit-button q-py-xs" color="secondary"
                 label="Guardar Configuracion" outline rounded @click="loadLogin"/>
        </q-card-section>
      </q-card>
    </div>
    <q-dialog :value="loader" content-css="box-shadow: none;">
      <q-img src="../assets/loader2.gif" class="no-shadow"/>
    </q-dialog>
  </q-page>
</template>
<script>
export default {
  name: "configuracion",
  data: () => ({
    loader: false
  }),
  methods:{
    loadLogin(){
      this.loader = true;
      setTimeout(()=> {
        this.loader = false
        this.$router.push('/perfil')
      },3000);
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
