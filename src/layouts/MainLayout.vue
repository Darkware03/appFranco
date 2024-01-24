<template>
  <q-layout view="lHh Lpr lFf">
    <q-header v-if="$route.path!='/splash'">
      <q-toolbar class="bg-secondary">
        <div class="row" style="width: 100%">
          <div class="col-6">
            <q-btn
              v-if="$route.path!='/' && $route.path!='/splash' && $route.path!='/login' && $route.path!='/registro'"
              flat
              dense
              round
              icon="menu"
              aria-label="Menu"
              @click="leftDrawerOpen = !leftDrawerOpen"
            />
          </div>
<!--          <div class="col-6 text-right">
            <q-btn
              v-if="$route.path!='/'
          && $route.path!='/login'
          && $route.path!='/registro'"
              color="white"
              flat
              icon-right="logout"
              aria-label="Menu"
              label="Logout"
              @click="$router.push('/')"
            />
          </div>-->
        </div>

<!--        <q-toolbar-title class="text-center">
          Comisión App
        </q-toolbar-title>-->

<!--
        <div>Quasar v{{ $q.version }}</div>
-->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="$route.path!='/' && $route.path!='/splash' && $route.path!='/login' && $route.path!='/registro'"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
<!--
          Bienvenido {Francisco}
-->
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container class="bg-secondary">
<!--        <p class="text-uppercase q-pa-lg text-white" v-if="$route.path!='/' && $route.path!='/login' && $route.path!='/perfil' ">
          <span class="text-accent">Hola Franco, tu comision actual es:</span>
          <span class="text-h4 text-weight-bold ">
            $1250.00
          </span>
        </p>-->
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
const linksData = [
  {
    title: 'Home',
    //caption: 'quasar.dev',
    icon: 'home',
    link: '/home'
  },
  {
    title: 'Perfil',
    //caption: 'quasar.dev',
    icon: 'person',
    link: '/perfil'
  },
  {
    title: 'Registrar prospecto',
    //caption: '@quasarframework',
    icon: 'person_add',
    link: '/nuevoProspecto'
  },
  {
    title: 'Registrar venta',
    //caption: '@quasarframework',
    icon: 'add',
    link: '/agregarVenta'
  },
  {
    title: 'Ventas por Cobrar',
    //caption: 'forum.quasar.dev',
    icon: 'date_range',
    link: '/porCobrar'
  },
  {
    title: 'Porcentaje de Cierre de Ventas',
    //caption: '@QuasarFramework',
    icon: 'percent',
    link: '/cierre'
  },
  {
    title: 'Reporte de Ventas',
    //caption: '@quasarframework',
    icon: 'show_chart',
    link: '/volumenVenta'
  },
/*  {
    title: 'Configuracion',
    //caption: '@QuasarFramework',
    icon: 'settings',
    link: '/configuracion'
  },*/

  {
    title: 'Reporte de Prospectos',
    //caption: '@quasarframework',
    icon: 'poll',
    link: '/prospectoList'
  },

/*  {
    title: 'Reporte de Ventas',
    //caption: '@quasarframework',
    icon: 'chart-line-variant',
    link: '/ventaList'
  },*/
  {
    title: 'Cerrar sesion',
   // caption: 'Community Quasar projects',
    icon: 'logout',
   link: '/login'
  }
]
export default {
  name: 'MainLayout',
  components: {
    EssentialLink
  },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  },
  created() {
    this.$store.commit('general/setRoutes', linksData)
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
