<template>
  <div id="q-app">
    <q-dialog :value="loader" content-css="box-shadow: none;">
      <q-img src="./assets/loader2.gif" class="no-shadow"/>
    </q-dialog>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'App',
  data: () => ({}),
  computed: {
    ...mapGetters({
      loader: 'general/getLoader'
    }),
  }
}
</script>
