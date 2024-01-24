<template>
  <q-page class="login-page">
    <div class="container">
      <p class="logo-text text-center q-mt-xl">Inicia session</p>
      <q-card class="login-card" flat bordered>
        <q-card-section class="q-mt-lg">
          <q-input   outlined label="correo electronico" color="secondary" v-model="correo"/>
          <q-input  outlined label="Contraseña" type="password" class="q-mt-lg" color="secondary" v-model="password"/>
          <q-btn class="submit-button" color="secondary" label="Ingresar" rounded @click="login()"/>
        </q-card-section>
        <q-separator class="separator"/>
<!--        <p class="text-secondary text-center text-secondary">
          O inicie sesión con
        </p>
        <div class="social-buttons">
          <div class="row text-center">
            <div class="col-12">
              <q-btn @click="loginWithGoogle" class="google-button q-pa-sm" flat rounded dense icon-right="bi-google">
                <span class="q-px-sm">
                  Continua con google
                </span>
              </q-btn>
            </div>
            <div class="col-12 q-mt-md">
              <q-btn class="outlook-button  q-pa-sm" flat rounded dense icon-right="bi-microsoft">
                <span class="q-px-sm">
                  Continua con outlook
                </span>
              </q-btn>
            </div>
            <div class="col-12 q-mt-md">
              <q-btn class="facebook-button  q-pa-sm" flat rounded  dense icon-right="facebook">
                <span class="q-px-sm">
                  Continua con facebook
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
        </div>-->
      </q-card>
    </div>
    <q-dialog :value="loader" content-css="box-shadow: none;">
        <q-img src="../assets/loader2.gif" class="no-shadow"/>
    </q-dialog>
  </q-page>
</template>
<script>
export default {
  name: "login",
  data: () => ({
    loader: false,
    correo: "egbg98@outlook.com",
    password: "admin",
   // correo: null,
   // password: null
  }),
  methods:{
    loadLogin(){
      this.loader = true;
      setTimeout(()=> {
        this.loader = false
        this.$router.push('/home')
      },3000);
    },
    async login() {
      this.loader = true;
        try {
          const correo = this.correo.replace(/\s/g, "");
          const password = this.password.replace(/\s/g, "");
          const requestData = {
            "correo": correo,
            "contrasena": password
          }
          const response = await this.$makeRequest('/api/login', 'POST', requestData);
          localStorage.setItem('userInfo', JSON.stringify(response.user));
          localStorage.setItem('access_token', JSON.stringify(response.access_token));
/*          this.$q.notify({
            message: `Bienvenido ${response.user.nombres}`,
            color: 'info',
            position: 'top',
            textColor: 'black'
          })*/
          this.$router.push('/home')
        } catch (error) {
          this.$q.notify({
            message: 'Ah ocurrido un error, intente mas tarde',
            color: 'dark',
            position: 'top'
          })
          this.loader = false;
        }finally {
          this.loader = false;
        }
    },

    loginWithGoogle() {
      this.$gAuth.signIn()
        .then(googleUser => {
          // Aquí puedes acceder a los datos del usuario autenticado
          console.log(googleUser)
        })
        .catch(error => {
          console.error(error)
        })
    }
  },
  created() {
    localStorage.clear();
    if (process.env.API_URL.includes('127')){
      this.correo = 'egbg98@outlook.com';
      this.password = 'admin';
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
