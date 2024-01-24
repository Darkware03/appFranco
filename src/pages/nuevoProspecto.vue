<template>
  <q-page class="login-page">
    <div class="container">
      <p class="logo-text text-center q-mt-xl">
        Registro prospecto
      </p>
<!--
      AGREGAR GRAFICO COMO EL CALENDARIO PARA VER QUE DIAS REGISTRE PROSPECTOS, con filtros todo esto seria abajo de registrar prospectos, vendria intervalo, total de prospectos registrados, agregar grafico de barras
-->
      <q-card class="login-card" flat bordered>
<!--        <div class="text-center q-my-sm">
          <q-btn label="listado prospectos" color="secondary" :to="'prospectos'"/>
        </div>-->
        <q-card-section class="q-mt-lg">
          <q-input outlined label="Nombre" color="secondary" v-model="nombre" />
          <q-select
            outlined
            ref="selectMulti"
            v-model="modelMultiple"
            multiple
            use-input
            color="secondary"
            :options="options"
            use-chips
            :value="inputValue"
            label="Referencia"
            class="submit-button q-py-xs"
            @keydown.space.prevent="handleSpacebar"
            @input="handleSpacebar"
          >
          </q-select>
          <q-select outlined label="Categoria/Tipo" class="q-mt-lg" color="secondary"
                    :options="tipos" option-value="id" option-label="nombre"
                    v-model="id_tipo_cliente"
                    @input="customFilter($event.target)"
                    @keydown="customFilter($event.target)" v-if="!existe" use-input
          />
          <q-input v-else v-model="id_tipo_cliente" label="Categoria/Tipo" color="secondary" outlined/>
          <q-input outlined label="Notas" class="q-mt-lg" color="secondary" v-model="notas"/>
<!--          <q-input  outlined label="Apellidos" class="q-mt-lg" color="secondary"/>
          <q-input  outlined label="Foto de perfil" class="q-mt-lg" color="secondary"/>
          -->
          <q-btn class="submit-button q-py-xs" color="secondary"
                 label="Registrar Prospecto" outline rounded @click="registrarProspecto"/>
          <div class="q-mt-md">
            <prospecto v-if="registro"/>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <q-dialog :value="loader" content-css="box-shadow: none;">
      <q-img src="../assets/loader2.gif" class="no-shadow"/>
    </q-dialog>
  </q-page>
</template>
<script>
import Prospecto from "pages/prospecto";
export default {
  name: "nuevoProspecto",
  components: { Prospecto },
  data: () => ({
    existe: false,
    loader: false,
    nombre: null,
    referencia: null,
    notas: null,
    id_tipo_cliente: null,
    usuario_registro: null,
    registro: true,
    tipos:[],
    modelMultiple:[],
    options: [],
    inputValue: '',
    tipos2: []
  }),
  methods:{
    customFilter(item) {
      this.tipos = this.tipos2;
      this.tipos = this.tipos.filter((element) => {
        if (element.nombre.includes(item.value)) {
          return element.nombre.includes(item.value);
        }else{
          this.existe = true;
        }
        return
      });
    },
    createCustomItem(newItem) {
      console.log(newItem);
      // Este método se llama cuando el usuario introduce un valor no existente en las opciones
      // Puedes personalizar cómo deseas manejar el nuevo elemento aquí, como agregarlo a la lista de elementos
      // En este ejemplo, simplemente establecemos el valor seleccionado como el nuevo elemento
      this.selectedItem = newItem;
    },
    handleSpacebar(event) {
      if (event.target !== this.$refs.selectMulti.$el.querySelector('input')) {
        return; // Salir si el evento no se generó en el input del multiselect
      }


      const inputText = event.target.value;
      console.log(inputText);
      if (inputText){
        const lastCharacter = inputText[inputText.length - 1];
        if (lastCharacter === ' ') {
          if (event.target.value){
            this.modelMultiple.push(event.target.value);
            this.$nextTick(() => {
              const selectInput = this.$refs.selectMulti.$el.querySelector('input');
              if (selectInput) {
                selectInput.value = '';
              }
            });
          }
        }
        if (event.target.value.length <=0 ) return false;
        if (event.keyCode === 32 || event.code === 'Space' || event.key === ' ') {
          //this.options.push(event.target.value);
          this.modelMultiple.push(event.target.value);
          this.$nextTick(() => {
            const selectInput = this.$refs.selectMulti.$el.querySelector('input');
            if (selectInput) {
              selectInput.value = '';
            }
          });
        }

      }
  },




    async registrarProspecto(){
      this.registro = false;
      this.$store.commit('general/setLoader', true);
      try {
        const requestData = {
          nombre: this.nombre,
          referencia: this.referencia,
          tags: JSON.stringify(this.modelMultiple),
          notas: this.notas,
          id_tipo_cliente: this.id_tipo_cliente,
        }
        console.log(requestData);
        const response = await this.$makeRequest("/api/clientes", "POST", requestData);
        this.$q.notify({
          message: response.message,
          color: "info",
          position: "top",
          textColor: "black"
        });
      } catch (error) {
        console.log(error);
        this.$q.notify({
          message: "Ah ocurrido un error, intente mas tarde",
          color: "dark",
          position: "top"
        });
      }finally {
        this.registro = true;
        this.$store.commit('general/setLoader', false);
        this.limpiar();
      }
    },
    async getTipoCliente(){
      this.$store.commit('general/setLoader', true);
      try {
        const response = await this.$makeRequest("/api/clientes/tipoCliente", "GET");
        this.tipos = response;
        this.tipos2 = response;
      }catch (e){}
      finally {
        this.$store.commit('general/setLoader', false);
      }
    },
    limpiar(){
      this.nombre = null;
      this.referencia = null;
      this.notas = null;
      this.id_tipo_cliente = null;
      this.modelMultiple = [];
    }
  },
  created() {
    this.getTipoCliente();
  },
  mounted() {
    if (this.$q.platform.is.mobile) {
      document.addEventListener('keydown', this.handleSpacebar);
    }
  },
  beforeDestroy() {
    if (this.$q.platform.is.mobile) {
      document.removeEventListener('keydown', this.handleSpacebar);
    }
  },
};
</script>
<style scoped>
.no-shadow {
  box-shadow: none;
}


.login-page {
  height: 100;
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
