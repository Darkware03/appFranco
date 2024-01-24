<template>
  <q-page class="login-page">
    <div class="container">
      <p class="logo-text text-center q-mt-xl">
        Empresas
      </p>
      <q-card class="login-card" flat bordered>
        <q-card-section class="text-right">
          <q-btn color="secondary" icon-right="bi-plus" @click="loader=true">
            Agegar empresa
          </q-btn>
        </q-card-section>
        <q-card-section class="q-mt-lg">
          <q-table
            :data="data"
            :columns="columns"
            row-key="name"
          >
            <template v-slot:body-cell-totalVentas="props">
              <td>
                <p v-if="props.row.totalVentas" class="q-mt-md text-center">
                  {{ props.row.totalVentas }}
                </p>
                <p v-else class="q-mt-md text-center">
                  0.00
                </p>
              </td>
            </template>
            <template v-slot:body-cell-Editar>
              <td class="text-center">
                <q-btn flat round>
                  <q-icon class="icon bi-pencil" color="secondary"/>
                </q-btn>
              </td>
            </template>
            <template v-slot:body-cell-Eliminar>
              <td class="text-center">
                <q-btn flat round>
                  <q-icon class="icon bi-x-circle" color="secondary"/>
                </q-btn>
              </td>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </div>
    <q-dialog :value="loader" content-css="box-shadow: none;">
      <q-card class="q-pa-xl" style="width: 100%">
        <div style="">
          <q-input label="Nombre de la empresa" v-model="nombre" />
          <q-input label="Numero de telefono" v-model="numero_telefono" />
          <q-input label="Encargado" v-model="encargado" />
          <q-select
            outlined
            v-model="id_pais"
            label="Pais"
            class="q-mt-xs"
            color="secondary"
            :options="paises"
            option-value="id"
            option-label="nombre"
          />
          <q-input label="Direccion" v-model="direccion" />
        </div>
        <div class="text-center q-mt-lg">
          <q-btn color="secondary" flat outline>
            Cancelar
          </q-btn>
          <q-btn color="secondary" icon-right="bi-plus" @click="postEmpresas()">
            GUARDAR
          </q-btn>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
export default {
  name: "empresaIndex",
  data: () => ({
    loader: false,
    columns: [
      {
        name: "Nombre empresa",
        field: "nombre",
        align: "center",
        label: "Nombre empresa",
        headerClasses: "bg-secondary text-white"
      },
      {
        name: "totalVentas",
        field: "totalVentas",
        align: "center",
        label: "Ventas hechas",
        headerClasses: "bg-secondary text-white"
      },
      {
        name: "Editar",
        field: "editar",
        align: "center",
        label: "Editar",
        headerClasses: "bg-secondary text-white"
      },
      {
        name: "Eliminar",
        field: "eliminar",
        align: "center",
        label: "eliminar",
        headerClasses: "bg-secondary text-white"
      },
    ],
    data: [],
    nombre: null,
    numero_telefono: null,
    encargado: null,
    id_pais: null,
    direccion: null,
    paises: [],
    empresas: []
  }),
  methods: {
    loadLogin() {
      this.loader = true;
      setTimeout(() => {
        this.loader = false;
        this.$router.push("/perfil");
      }, 3000);
    },
    async getPaises() {
      const response = await this.$makeRequest("/api/paises", "GET");
      this.paises = response.data;
    },
    async getEmpresas() {
      const response = await this.$makeRequest("/api/empresas", "GET");
      this.data = response.data;
    },
    async postEmpresas() {
      try {
        const requestData = {
          nombre: this.nombre,
          numero_telefono: this.numero_telefono,
          encargado: this.encargado,
          id_pais: this.id_pais.id,
          direccion: this.direccion
        }
        const response = await this.$makeRequest("/api/empresas", "POST", requestData);
        this.$q.notify({
          message: response.message,
          color: "info",
          position: "top",
          textColor: "black"
        });
        await this.getEmpresas();
      } catch (error) {
        this.$q.notify({
          message: "Ah ocurrido un error, intente mas tarde",
          color: "dark",
          position: "top"
        });
      }finally {
        this.loader = false;
      }
    },
  },
    mounted() {
      this.getPaises();
      this.getEmpresas();
    }
  }
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
