<template>
  <div class="splash-screen flex justify-center items-center">
    <div class="justify-center text-center icon">
      <q-img src="../assets/logo.png"
             style="width: 27em"/>
      <p class="app-name text-weight-bold text-center text-accent"
         v-if="showAppName" style="font-size: 1.2em">
      AYUDANDO A TU ORGANIZACION EN VENTAS
     </p>
    </div>
  </div>
</template>
<script>
export  default {
  data () {
    return {
      showAppName: false,
    }
  },
  mounted() {
    setTimeout(this.showAppName = true,3500 )
  },
  watch: {
    showAppName(value){
      setTimeout(() => {
        this.$router.push('/');
      }, 4000);
    }
  }
}
</script>
<style scoped>
.splash-screen {
  /* Estilos para centrar el contenido y ocupar toda la pantalla */
  height: 100vh;
  /* Cambia el color de fondo según tus preferencias */
  /*
  background-color: #ffffff;
  */
}

.icon {
  animation: slide-up 2s ease-in-out alternate;
}

.app-name {
  opacity: 0;
  animation: fade-in 1s ease-in-out forwards;
  animation-delay: 2s; /* Retraso para mostrar el nombre de la app después de 2 segundos */
}

@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translateY(-100%);
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
