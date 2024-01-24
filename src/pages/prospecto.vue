<template>
  <div>
<!--    <p class="logo-text text-center q-mt-xs">
      Listado prospectos
    </p>-->
<!--
    <q-card class="login-card" flat bordered>
-->
      <q-card-section class="q-mt-lg">
<!--        <div class="text-right">
          <q-btn label="Registrar prospecto" class="q-my-sm" color="secondary" icon="add" :to="'nuevoProspecto'"/>
        </div>-->
<!--
        <q-table :data="ventas" :columns="columnas">
          <template v-slot:body-cell-tipo="props">
            <td>
              <p v-if="props.row.tipo == 1">
                <q-badge color="secondary" class="q-pa-sm">CLIENTE</q-badge>
              </p>
              <p v-if="props.row.tipo == 0">
                <q-badge color="accent" text-color="black" class="q-pa-sm">PROSPECTO</q-badge>
              </p>
            </td>
          </template>
          <template v-slot:body-cell-created_at="props">
            <td>
              {{ fecha(props.row.created_at) }}
            </td>
          </template>
          <template v-slot:body-cell-tags="props">
            <td>
              <span v-for="tag in convertirTags(props.row.tags)" :key="tag">
                <q-badge class="q-mx-xs" color="secondary">
                  {{ tag }}
                </q-badge>
              </span>
            </td>
          </template>
        </q-table>
-->
      </q-card-section>
<!--
    </q-card>
-->
  </div>
</template>

<script>
import { date } from 'quasar'
export default {
  name: "prospecto",
  data: () => ({
    ventas:[],
    columnas: [
      {
        name: "nombre",
        field: "nombre",
        align: "center",
        label: "Nombre",
        headerClasses: "bg-secondary text-white"
      },
      {
        name: "tags",
        field: "tags",
        align: "center",
        label: "Tags",
        headerClasses: "bg-secondary text-white"
      },
      {
        name: "tipo",
        field: "tipo",
        align: "center",
        label: "Tipo",
        headerClasses: "bg-secondary text-white"
      },
      {
        name: "fecha_creacion",
        field: "fecha_creacion",
        align: "center",
        label: "Fecha",
        headerClasses: "bg-secondary text-white"
      },
    ],
  }),
  methods:{
    async getVentas(){
      this.$store.commit('general/setLoader', true);
      try {
        const response = await this.$makeRequest("/api/clientes/clienteProspecto", "GET");
        this.ventas = response;
      }catch (e){}
      finally {
        this.$store.commit('general/setLoader', false);
      }
    },
    fecha(fecha){
      const timeStamp = fecha
      const formattedString = date.formatDate(timeStamp, 'DD/MM/YYYY')
      return formattedString
    },
    convertirTags(tags){
      const parsedTags = JSON.parse(tags)
      console.log(parsedTags);
      return parsedTags;
    }
  },
  created() {
    this.getVentas();
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
