<template>
  <q-page class="login-page">
    <div class="container">
      <p class="logo-text text-centerr">Registrate</p>
      <q-card class="login-card" flat bordered>
        <q-card-section v-if="errores.length>0">
          <q-banner inline-actions class="text-white bg-red text-center">
            Debes completar los siguientes campos
            <span class="text-center" v-for="error in errores" :key="error">
              <p>* {{ error }}</p>
            </span>
          </q-banner>
        </q-card-section>
        <q-card-section class="q-mt-xs">
          <div>
            <q-input
              outlined
              v-model="email"
              label="Correo electrónico"
              color="secondary"
            />

            <q-input
              outlined
              v-model="password"
              label="Contraseña"
              class="q-mt-xs"
              type="password"
              color="secondary"
            />

            <q-input
              outlined
              v-model="confirmPassword"
              label="Repetir contraseña"
              class="q-mt-xs"
              type="password"
              color="secondary"
            />
            <q-input outlined v-model="firstName" label="Nombres" class="q-mt-xs" color="secondary" />
            <q-input outlined v-model="lastName" label="Apellidos" class="q-mt-xs" color="secondary" />
            <q-input outlined v-model="empresa" label="Empresa" class="q-mt-xs" color="secondary" />
            <q-select
              outlined
              v-model="sellerType"
              label="Tipo de vendedor"
              class="q-mt-xs"
              color="secondary"
              :options="tipoVendedores"
              option-value="id"
              option-label="nombre"
            />
            <q-input class="q-mt-xs" color="secondary" outlined v-model="productService" label="Producto o servicio a vender"  />
            <q-file class="q-mt-xs" color="secondary" outlined v-model="profilePicture" label="Seleccionar foto"></q-file>
            <q-btn class="submit-button q-py-xs" color="secondary" label="Registrar" outline rounded @click="register" />
            <q-btn class="submit-button q-py-xs" color="secondary" label="Regresar a la pantalla de inicio"  flat rounded :to="'/'"/>
          </div>
        </q-card-section>
<!--
        <q-card-section>
          <div class="text-center text-bold">
            <p> O registrate con</p>
          </div>
          <div class="social-buttons">
            <div class="row text-center">
              <div class="col-12">
                <q-btn @click="loginWithGoogle" class="google-button q-pa-sm" flat rounded dense icon-right="bi-google">
                <span class="q-px-sm">
                  Google
                </span>
                </q-btn>
              </div>
              <div class="col-12 q-mt-md">
                <q-btn class="outlook-button  q-pa-sm" flat rounded dense icon-right="bi-microsoft">
                <span class="q-px-sm">
                  Outlook
                </span>
                </q-btn>
              </div>
              <div class="col-12 q-mt-md">
                <q-btn class="facebook-button  q-pa-sm" flat rounded  dense icon-right="facebook">
                <span class="q-px-sm">
                  Facebook
                </span>
                </q-btn>
              </div>
              <div class="col-12 q-mt-md">
                <q-btn class="q-pa-sm"  outline rounded  icon="arrow_back" color="secondary" flat>
                <span class="q-px-sm" @click="$router.push('/')">
                 Regresar a la pantall anterior
                </span>
                </q-btn>
              </div>
            </div>
          </div>
        </q-card-section>
-->
        <q-separator class="separator"/>
        <p class="text-center">
          Al registrarse usted acepta los
          <a href="#">terminos de acuerdos y condiciones</a>
        </p>
      </q-card>
    </div>
    <q-dialog :value="loader" content-css="box-shadow: none;">
      <q-img src="../assets/loader2.gif" class="no-shadow"/>
    </q-dialog>
  </q-page>
</template>
<script>
import { Notify } from 'quasar'

export default {
  name: "registro",
  data: () => ({
    loader: false,
    email:"",
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    sellerType: null,
    productService: '',
    profilePicture: null,
    tipoVendedores: null,
    empresa: '',
    errores: []
  }),
  methods:{
    loadLogin(){
      this.loader = true;
      setTimeout(()=> {
        this.loader = false
        this.$router.push('/perfil')
      },3000);
    },
    validateEmail(value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      //return emailRegex.test(value) || 'Ingrese un correo electrónico válido.';
      if (!emailRegex.test(value))  {
        this.errores = [];
        this.errores.push('Correo electronico');
        this.$store.commit('general/setLoader', false)
      }
    },
    validatePassword(value) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
      //return passwordRegex.test(value) || 'La contraseña debe tener al menos una mayúscula, un número, un carácter especial y no contener espacios.';
      this.errores.push('Contraseña / contraseña invalida')

    },
    validateConfirmPassword(value) {
    //return value === this.password || 'Las contraseñas no coinciden.';
      this.errores.push('Contraseña / Las contraseñas no coinciden.')

    },
    async register() {
      this.$store.commit('general/setLoader', true);
      this.validateEmail(this.email);
      if (this.errores.length<=0) {
        try {
          const requestData = new FormData();
          requestData.append('correo', this.email);
          requestData.append('contrasena', this.password);
          requestData.append('nombres', this.firstName);
          requestData.append('apellidos', this.lastName);
          requestData.append('empresa', this.empresa);
          requestData.append('id_tipo_vendedor', this.sellerType.id);
          requestData.append('producto_servicio', this.productService);
          requestData.append('profilePicture', this.profilePicture);
          requestData.append('photo', this.profilePicture);
          const response = await this.$makeRequest('/api/users', 'POST', requestData);
          this.$q.notify({
            message: response.message,
            color: 'info',
            position: 'top',
            textColor: 'black'
          })
        } catch (error) {
          this.$q.notify({
            message: 'Ah ocurrido un error al intentar registrarse, intente mas tarde',
            color: 'dark',
            position: 'top'
          })
          this.$store.commit('general/setLoader', false)
        }finally {
          setTimeout(
          this.$router.push('/'),
          this.$store.commit('general/setLoader', false)
        , 5000)
        }
      }
    },
    async getTipoVendedor() {
      const response = await this.$makeRequest('/api/tipo-vendedores', 'GET');
      console.log("RESPONSE",response);
      this.tipoVendedores = response.data;
    },
  },
  mounted() {
    this.getTipoVendedor();
  }
};
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
