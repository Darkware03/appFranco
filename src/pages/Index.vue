<template>
  <q-page class="login-page">
    <div class="container">
      <q-img src="../assets/logo.png" style="width: 25em; margin-top: 5em"/>
      <p class="text-white text-center" style="font-size: 2em">llevar el control de tus comisiones nunca fue tan facil</p>
      <q-card class="login-card" flat bordered>
        <q-card-section>
          <p class="text-h4 text-accent text-weight-bold q-mt-xl">
            Bienvenido!
          </p>
          <p>
            <span class="text-accent">
              ComiCalc
            </span>
            <span class="text-secondary text-weight-bold">
              es un app que te ayudara a calcular y predecir tus comisiones de forma totalmente
              gratuita, tambien te permitira observar graficas en tiempo real, totales de ventas, ganancias por venta y todo
              lo relacionado a tus comisiones ganadas en ventas
            </span>
          </p>
          <div class="text-center q-mt-xl">
            <div class="row">
              <div class="col col-md-12 col-sm-12 col-xs-12 flex justify-center content-center" >
                <q-btn class="q-pa-xs q-mb-md" color="dark" rounded @click="$router.push('/login')">Iniciar sesion</q-btn>
              </div>
              <div class="col col col-md-12 col-sm-12 col-xs-12 text-center flex justify-center content-center" >
                <q-btn class="q-pa-xs" rounded outline color="secondary" to="/registro" >
                  Registrarse
                </q-btn>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-section class="text-center">
<!--          <q-btn @click="$router.push('/allRoutes')" color="secondary" rounded>
            Ver todas las rutas
          </q-btn>-->
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<style scoped>
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

.login-card {
  width: 100%;
  min-height: 80vh;
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
</style>

