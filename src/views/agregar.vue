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
                      <select @change="actCodTipo()" class="form-control" v-model="$v.tipo.$model" v-if="tipoMostrar === 'si'">
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
                <b-row v-if="(codTipo > 0 && codTipo < 6) || (codTipo > 6 && codTipo < 14) || (codTipo > 15 && codTipo < 18) || (codTipo == 21) || (codTipo > 24 && codTipo < 27)">
                  <b-col cols="12" md="6" v-if="codTipo == 2 || (codTipo > 9 && codTipo < 13) || codTipo == 17 || codTipo == 21">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Memoria RAM Gb</label>
                      <input @change="controlInputs()" type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="ram">
                    </div>
                  </b-col>
                  <b-col cols="12" md="6" v-if="codTipo == 25">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">VA(VOLT AMPERES)</label>
                      <input type="number" @change="controlInputs()" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="va">
                    </div>
                  </b-col>
                  <b-col cols="12" md="6" v-if="codTipo == 13">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Lumenes Proyector</label>
                      <input type="number" @change="controlInputs()" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="lumenes">
                    </div>
                  </b-col>
                  
                  <b-col cols="12" md="6" v-if="codTipo == 4 || codTipo == 7 || codTipo == 16">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">IMEI del Equipo</label>
                      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="imei">
                    </div>
                  </b-col>
                  <b-col cols="12" md="6" v-if="codTipo == 1 || codTipo == 3">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">MAC del Equipo</label>
                      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="mac">
                    </div>
                  </b-col>
                  <b-col cols="12" md="6" v-if="codTipo == 4 || codTipo == 7 || codTipo == 16">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Compañia del Equipo</label>
                      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="compañia">
                    </div>
                  </b-col>
                  <b-col cols="12" md="6" v-if="codTipo == 2 || (codTipo > 9 && codTipo < 13) || codTipo == 17 || codTipo == 21">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Procesador del Equipo</label>
                      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="procesador">
                    </div>
                  </b-col>
                  <b-col cols="12" md="6" v-if="codTipo == 5 || codTipo == 9 || codTipo == 21">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Capacidad Equipo</label>
                      <input type="number" @change="controlInputs()" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="capacidad">
                    </div>
                  </b-col>
                  <b-col cols="12" md="6" v-if="codTipo == 2 || (codTipo > 9 && codTipo < 13) || codTipo == 17">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Disco Duro del Equipo</label>
                      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="disco">
                    </div>
                  </b-col>
                  <b-col cols="12" md="6" v-if="codTipo == 3 || codTipo == 2 || codTipo == 8 || (codTipo > 9 && codTipo < 13) || codTipo == 17 || codTipo == 21 || codTipo == 27">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Pulgadas Equipo</label>
                      <input type="number" @change="controlInputs()" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="pulgadas">
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
        codTipo: 0,
        tipoNew: '',
        tipos: [],
        serie: '',
        marca: '',
        marcaNew: '',
        marcas: [],
        estado: '',
        condicion: '',
        disco: '',
        //CARACTERISTICAS ESPECIFICAS
        mac: '',
        ram: 0,
        pulgadas: 0,
        imei: '',
        capacidad: 0,
        lumenes: 0,
        va: 0,
        procesador: '',
        compañia: '',
        disco: '',
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
      //Controlador de inputs numericos
      controlInputs(){
        if(this.ram < 0){
          this.ram = 0;
        }
        if(this.pulgadas < 0){
          this.pulgadas = 0
        }
        if(this.capacidad < 0){
          this.capacidad = 0
        }
        if(this.lumenes < 0){
          this.lumenes = 0;
        }
        if(this.va < 0){
          this.va = 0;
        }
      },
      alerta(color, texto){
        this.mensaje.color = color;
        this.mensaje.texto = texto;
        this.showAlert();
      },
      //Función que permite transformar los datos a NULL según el tipo de equipo al agregar uno nuevo
      transformarNull(){
        if(this.codTipo !== 1 && this.codTipo !== 3){
          this.mac = null
        }
        if(this.codTipo !== 2 && this.codTipo !== 10 && this.codTipo !== 11 && this.codTipo !== 12 && this.codTipo !== 17 && this.codTipo !== 21){
          this.ram = null
          this.procesador = null
        }
        if(this.codTipo !== 2 && this.codTipo !== 10 && this.codTipo !== 11 && this.codTipo !== 12 && this.codTipo !== 17 && this.codTipo !== 21 && this.codTipo !== 3 && this.codTipo !== 8 && this.codTipo !== 27){
          this.pulgadas = null
        }
        if(this.codTipo !== 4 && this.codTipo !== 7 && this.codTipo !== 16){
          this.imei = null
          this.compañia = null
        }
        if(this.codTipo == 5 && this.codTipo == 9 && this.codTipo == 21){
          this.capacidad = null
        }
        if(this.codTipo !== 2 && this.codTipo !== 10 && this.codTipo !== 11 && this.codTipo !== 12 && this.codTipo !== 17){
          this.disco = null
        }
        if(this.codTipo !== 13){
          this.lumenes = null
        }
        if(this.codTipo !== 25){
          this.va = null
        }
      },
      //Función que permite crear un nuevo equipo usa v-model y axios para enviar los datos al api
      //algunos datos son requeridos se usa Vualidate ($v.) para verificar si cumplen las condiciones
      agregarEquipo(){
        this.transformarNull()
        let config = {
          headers: {
            token: this.token
          }
        }
        this.$v.$touch()
        if(!this.$v.codigo.$invalid && !this.$v.modelo.$invalid && !this.$v.serie.$invalid && !this.$v.condicion.$invalid){
          this.axios.post('api/agregaEquipo', {codEquipo: this.codigo, modelo: this.modelo, serie: this.serie, tipoEquipo: this.tipo, nomMarca: this.marca, estado: this.estado, condicion: this.condicion, va: this.va, compañia: this.compañia, pulgadas: this.pulgadas, mac: this.mac, procesador: this.procesador, ram: this.ram, discoDuro: this.disco, imei: this.imei, capacidad: this.capacidad, lumenes: this.lumenes}, config)
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
            this.codTipo = res.data[0].codTipo;
          })
          .catch(e => {
            this.alerta('danger', 'No se han podido cargar los tipos');
        })
      },
      //Al cambiar un tipo se actualiza su codigo
      actCodTipo(){
        const index = this.tipos.findIndex(item => item.tipoEquipo == this.tipo);
        this.codTipo = this.tipos[index].codTipo
        this.mac = ''
        this.ram = 0
        this.pulgadas = 0
        this.imei = ''
        this.capacidad = 0
        this.lumenes = 0
        this.va = 0
        this.procesador = ''
        this.compañia = ''
        this.disco = ''
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

.boton{
    margin: 20px;
    width: 90%;
    border-radius: 12px;
    border-color: black;
  }
</style>