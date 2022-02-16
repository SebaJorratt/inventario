<template>
  <div>
    <navbar />
    <br />
    <h1 id="menu">Agregar equipos</h1>
    <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="mensaje.color"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
    {{mensaje.texto}}
    </b-alert>
    <div class="mt-5">
      <div id="centro"> 
        <b-container>
          <div class="card" style="border-color: black;">
               <div class="card-body">
                 <b-row>
                  <b-col cols="12" md="4">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Codigo equipo</label>
                      <input type="text" class="form-control" id="codEquipoAgrega" aria-describedby="emailHelp" v-model="$v.codigo.$model">
                      <p class="text-danger" v-if="$v.codigo.$error">Es necesario ingresar un codigo</p>
                    </div>
                  </b-col>
                  <b-col cols="12" md="4">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Modelo equipo</label>
                      <input type="text" class="form-control" id="modeloAgrega" aria-describedby="emailHelp" v-model="$v.modelo.$model">
                      <p class="text-danger" v-if="$v.modelo.$error">Es necesario ingresar un modelo</p>
                    </div>
                  </b-col>
                  <b-col cols="12" md="4">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Tipo de equipo</label>
                      <label @click="CambioTipo()" for="exampleInputEmail1" v-if="tipoMostrar === 'si'" style="color: #35ACF1;" class="form-label">&nbsp; (Crear Nuevo Tipo?)</label>
                      <label @click="CambioTipo()" for="exampleInputEmail1" v-if="tipoMostrar === 'no'" style="color: #35ACF1;" class="form-label">&nbsp; (Revisar ya existentes)</label>
                      <select class="form-control" v-model="$v.tipo.$model" v-if="tipoMostrar === 'si'">
                        <option v-for="i in tipos" :key="i.tipoEquipo">{{i.tipoEquipo}}</option>
                      </select>
                      <input type="text" class="form-control" id="tiponewEdita" aria-describedby="emailHelp" v-if="tipoMostrar === 'no'" v-model="$v.tipoNew.$model">
                      <div v-if="tipoMostrar === 'no'">
                        <p class="text-danger" v-if="$v.tipoNew.$error">Es necesario ingresar el nombre del tipo</p>
                      </div>
                    </div>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">N° Serie Equipo</label>
                      <input type="text" class="form-control" id="serieAgrega" aria-describedby="emailHelp" v-model="$v.serie.$model">
                      <p class="text-danger" v-if="$v.serie.$error">Es necesario ingresar un número de serie</p>
                    </div>
                  </b-col>
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Marca equipo</label>
                      <label @click="CambioTipo()" for="exampleInputEmail1" v-if="tipoMostrar === 'si'" style="color: #35ACF1;" class="form-label">&nbsp; (Crear Nueva Marca?)</label>
                      <label @click="CambioTipo()" for="exampleInputEmail1" v-if="tipoMostrar === 'no'" style="color: #35ACF1;" class="form-label">&nbsp; (Revisar ya existentes)</label>
                      <select class="form-control" v-model="$v.marca.$model" v-if="tipoMostrar === 'si'">
                        <option v-for="i in marcas" :key="i.nomMarca">{{i.nomMarca}}</option>
                      </select>
                      <input type="text" class="form-control" id="marcanewEdita" aria-describedby="emailHelp" v-if="tipoMostrar === 'no'" v-model="$v.marcaNew.$model">
                      <div v-if="tipoMostrar === 'no'">
                        <p class="text-danger" v-if="$v.marcaNew.$error">Es necesario ingresar el nombre de la marca</p>
                      </div>
                    </div>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Estado de Equipo</label>
                      <select class="form-control" v-model="$v.estado.$model">
                        <option disabled value="">Seleccione un estado posible</option>
                        <option>Bueno</option>
                        <option>Regular</option>
                        <option>Malo</option>
                        <option>Baja</option>
                      </select>
                      <p class="text-danger" v-if="$v.estado.$error">Es necesario indicar el estado del equipo</p>
                    </div>
                  </b-col>
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Condicion Equipo</label>
                      <textarea type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="$v.condicion.$model"></textarea>
                    </div>
                  </b-col>
                </b-row>
                <br>
              <button type="submit" @click="agregarEquipo()" class="btn btn-primary botonAgrega" v-if="tipoMostrar === 'si'">Agregar equipo</button>
              <b-row>
                  <b-col cols="12" md="6">
                    <b-button @click="agregaTipo()" class="btn-success botonmostrar botonAgrega" v-if="tipoMostrar === 'no'">Agregar Tipo</b-button>
                  </b-col>
                  <b-col cols="12" md="6">
                    <b-button @click="agregaMarca()" class="btn-success botonmostrar botonAgrega" v-if="tipoMostrar === 'no'">Agregar Marca</b-button>
                  </b-col>
              </b-row>
            </div>
          </div>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "../components/navbar.vue";
import { required} from "vuelidate/lib/validators";

import { mapState } from 'vuex'
export default {
  name: "about",
  components: {
    navbar,
  },
  data() {
      return {
        tipoMostrar: 'si',
        //Datos para agregar un nuevo equipo con v-model
        selected: '',
        codigo: '',
        modelo: '',
        tipo: '',
        tipoNew: '',
        tipos: [],
        serie: '',
        marca: '',
        marcaNew: '',
        marcas: [],
        estado: '',
        condicion: '',
        //Variables de las alertas
        dismissSecs: 5,
        dismissCountDown: 0,
        mensaje: {color: '', texto: ''}
      }
    },
    validations:{
      //Validaciones de los input
      codigo:{required},
      modelo:{required},
      tipo:{required},
      tipoNew:{required},
      serie:{required},
      marca:{required},
      marcaNew:{required},
      estado:{required},
      condicion:{required}
    },
    computed: {
      ...mapState(['token'])
    },
    created(){
      //Iniciamos las funciones que se encargan de cargar los datos apenas se inicie la ruta
      this.obtenerTipos();
      this.obtenerMarcas();
    },
    methods: {
      alerta(color, texto){
        this.mensaje.color = color;
        this.mensaje.texto = texto;
        this.showAlert();
      },
      //Función que permite crear un nuevo equipo usa v-model y axios para enviar los datos al api
      //algunos datos son requeridos se usa Vualidate ($v.) para verificar si cumplen las condiciones
      agregarEquipo(){
        let config = {
          headers: {
            token: this.token
          }
        }
        this.$v.$touch()
        if(!this.$v.codigo.$invalid && !this.$v.modelo.$invalid && !this.$v.serie.$invalid && !this.$v.condicion.$invalid){
          this.axios.post('api/agregaEquipo', {codEquipo: this.codigo, modelo: this.modelo, serie: this.serie, tipoEquipo: this.tipo, nomMarca: this.marca, estado: this.estado, condicion: this.condicion}, config)
            .then(res => {
              if(!res.data.sqlMessage){
                Swal.fire(
                  'Se ha creado un nuevo equipo!',
                  'Seleccione Ok para continuar',
                  'success'
                )
              }else{
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'No se ha creado este nuevo equipo',
                  footer: 'Asegurese de que el codigo o el n° de serie no existan ya en los registros'
                })
              }
              //location.reload();
            })
            .catch(e => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se ha podido crear el equipo',
                footer: 'Posible error del sistema'
              })
          })
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Rellene todos los campos',
            footer: 'Revise que existan todos los datos requeridos'
          })
        }
      },
      agregaTipo(){
        let config = {
          headers: {
            token: this.token
          }
        }
        if(!this.$v.tipoNew.$invalid){
          this.axios.post('api/agregaTipo', {tipoEquipo: this.tipoNew}, config)
            .then(res => {
              if(!res.data.sqlMessage){
                Swal.fire(
                  'Se ha generado un nuevo tipo de equipo ',
                  'Seleccione Ok para continuar',
                  'success'
                )
                this.tipoMostrar = 'si';
                this.obtenerTipos();
              }else{
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'No se ha creado este nuevo tipo',
                  footer: 'Nombre ya se encuentra registrado'
                })
              }
            })
            .catch(e => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se ha crear este nuevo tipo',
                footer: 'Posible error del sistema'
              })
          })
        }else{
          this.alerta('danger', 'Porfavor ingrese un nuevo tipo');
        }
      },
      //Función que agrega una nueva marca
      agregaMarca(){
        let config = {
          headers: {
            token: this.token
          }
        }
        if(!this.$v.marcaNew.$invalid){
          this.axios.post('api/agregaMarca', {nomMarca: this.marcaNew}, config)
            .then(res => {
              if(!res.data.sqlMessage){
                Swal.fire(
                  'Se ha generado una nueva marca ',
                  'Seleccione Ok para continuar',
                  'success'
                )
                this.tipoMostrar = 'si';
                this.obtenerMarcas();
              }else{
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'No se ha creado esta nueva marca',
                  footer: 'Nombre ya se encuentra registrado'
                })
              }
            })
            .catch(e => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se ha logrado crear esta nueva marca',
                footer: 'Posible error del sistema'
              })
          })
        }else{
          this.alerta('danger', 'Porfavor ingrese un nombre para la marca');
        }
      },
      //Función que obtiene todos los tipos
      obtenerTipos(){
        let config = {
          headers: {
            token: this.token
          }
        }
        this.axios.get('api/tipos', config)
          .then(res => {
            this.tipos = res.data;
            this.tipo = res.data[0].tipoEquipo;
          })
          .catch(e => {
            this.alerta('danger', 'No se han podido cargar los tipos');
        })
      },
      //Función que obtiene todos las marcas
      obtenerMarcas(){
        let config = {
          headers: {
            token: this.token
          }
        }
        this.axios.get('api/marcas', config)
          .then(res => {
            this.marcas = res.data;
            this.marca = res.data[0].nomMarca;
            this.estado = 'Bueno';
          })
          .catch(e => {
            this.alerta('danger', 'No se han podido cargar las marcas');
        })
      },
      CambioTipo(){
        if(this.tipoMostrar === 'no'){
          this.tipoMostrar = 'si'
        }else{
          this.tipoMostrar = 'no'
        }
      },
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
      }
    }
};


</script>

<style>
.menu {
  padding: 30px;
}

body {
  background-color: #eee;
}

#formulario {
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  padding: 30px;
  width: 90%;
  max-width: 450px;
  padding: 0px;
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
}

#centro {
  display: block;
}

.botonAgrega{
    margin: 20px;
    width: 50%;
    border-radius: 12px;
    border-color: black;
  }
</style>