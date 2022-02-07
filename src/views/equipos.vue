<template>
  <div class="about">
    <navbar />
    <b-container>
        <div class="menu">
          <h1 v-if="pestaña == 'editar'">Editar Equipo</h1>
          <h1 v-else-if="pestaña == 'enviar'">Enviar Equipo</h1>
          <h1 v-else>Listado de Equipos</h1>
          <b-alert
            :show="dismissCountDown"
            dismissible
            :variant="mensaje.color"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged"
          >
            {{mensaje.texto}}
          </b-alert>  
            <br>
            <b-row v-if="botones === 'si'">
              <b-col cols="12" md="4">
                <div class="mb-3">
                  <b-button @click="MostrarEquiposAct()" class="btn-success botonmostrar">Equipos con dueño</b-button>
                </div>
              </b-col>
              <b-col cols="12" md="4">
                <div class="mb-3">
                  <b-button @click="EquiposBuenEstado()" class="btn-succes btn-warning botonmostrar">Equipos sin dueño</b-button>
                </div>
              </b-col>
              <b-col cols="12" md="4">
                <div class="mb-3">
                  <b-button @click="EquiposMalEstado()" class="btn-danger botonmostrar">Equipos dados de Baja</b-button>
                </div>
              </b-col>
            </b-row>
            <!-- Tabla de equipos con dueños que estan en buen estado -->
            <table class="table table-striped table-dark table-responsive-lg table-responsive-md" id="tablaConDueño" v-if="pestaña === 'equiposact'">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">N° Serie</th>
                  <th scope="col">Codigo</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Jardin</th>
                  <th scope="col">Codigo Jardin</th>
                  <th scope="col">Dueño</th>
                  <th scope="col">Zona</th>
                  <th scope="col">Mostrar Equipo</th>
                  <th scope="col">Quitar Equipo</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="i in equiposAct" :key="i.codHistorial">
                  <td scope="row">{{i.codHistorial}}</td>
                  <td>{{i.tipoEquipo}}</td>
                  <td>{{i.serie}}</td>
                  <td>{{i.codEquipo}}</td>
                  <td>{{i.estado}}</td>
                  <td>{{i.nomJardin}}</td>
                  <td>{{i.codJardin}}</td>
                  <td>{{i.nombre}}</td>
                  <td>{{i.zona}}</td>
                  <td>
                    <b-button @click="Acteditar()" class="btn-warning btn-sm">Mostrar Mas</b-button>
                  </td>
                  <td>
                    <b-button @click="quitar(i.codHistorial, i.estado)" class="btn-danger btn-sm">Quitar</b-button>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- Tabla de equipos sin dueños que estan en buen estado -->
            <table class="table table-striped table-dark table-responsive-lg table-responsive-md" id="tablaSinDueño" v-if="pestaña === 'equiposNoAct'">
              <thead>
                <tr>
                  <th scope="col">Equipo</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">N° Serie</th>
                  <th scope="col">Codigo</th>
                  <th scope="col">Marca</th>
                  <th scope="col">Modelo</th>
                  <th scope="col">Enviar Equipo</th>
                  <th scope="col">Mostrar Equipo</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="i in equiposBuenEstado" :key="i.corrEquipo">
                  <td scope="row">{{i.corrEquipo}}</td>
                  <td>{{i.tipoEquipo}}</td>
                  <td>{{i.serie}}</td>
                  <td>{{i.codEquipo}}</td>
                  <td>{{i.nomMarca}}</td>
                  <td>{{i.modelo}}</td>
                  <td>
                    <b-button @click="Enviar(i.corrEquipo)" class="btn-success btn-sm">Enviar Equipo</b-button>
                  </td>
                  <td>
                    <b-button @click="Acteditar()" class="btn-warning btn-sm">Mostrar Mas</b-button>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- Tabla de equipos sin dueños que estan en MAL estado -->
            <table class="table table-striped table-dark table-responsive-lg table-responsive-md" id="tablaBajas" v-if="pestaña === 'equiposBaja'">
              <thead>
                <tr>
                  <th scope="col">Equipo</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">N° Serie</th>
                  <th scope="col">Codigo</th>
                  <th scope="col">Marca</th>
                  <th scope="col">Modelo</th>
                  <th scope="col">Mostrar Equipo</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="i in equiposMalEstado" :key="i.corrEquipo">
                  <td scope="row">{{i.corrEquipo}}</td>
                  <td>{{i.tipoEquipo}}</td>
                  <td>{{i.serie}}</td>
                  <td>{{i.codEquipo}}</td>
                  <td>{{i.nomMarca}}</td>
                  <td>{{i.modelo}}</td>
                  <td>
                    <b-button @click="Acteditar()" class="btn-warning btn-sm">Mostrar Mas</b-button>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- Editar un Equipo -->
              <div class="card" v-if="pestaña === 'editar'">
                <div class="card-body">
                 <b-row>
                  <b-col cols="12" md="4">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Codigo equipo</label>
                      <input type="text" class="form-control" id="codEquipoEdita" aria-describedby="emailHelp" v-model="$v.codigo.$model">
                      <p class="text-danger" v-if="$v.codigo.$error">Es necesario ingresar un codigo</p>
                    </div>
                  </b-col>
                  <b-col cols="12" md="4">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Modelo equipo</label>
                      <input type="text" class="form-control" id="modeloEdita" aria-describedby="emailHelp" v-model="$v.modelo.$model">
                      <p class="text-danger" v-if="$v.modelo.$error">Es necesario ingresar un modelo</p>
                    </div>
                  </b-col>
                  <b-col cols="12" md="4">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Tipo de equipo</label>
                      <select class="form-control" v-model="$v.tipo.$model">
                        <option disabled value="">Seleccione que tipo de equipo es</option>
                        <option>Bueno</option>
                        <option>Regular</option>
                        <option>Malo</option>
                        <option>Baja</option>
                      </select>
                      <p class="text-danger" v-if="$v.tipo.$error">Es necesario determinar el tipo del equipo</p>
                    </div>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">N° Serie Equipo</label>
                      <input type="text" class="form-control" id="serieEdita" aria-describedby="emailHelp" v-model="$v.serie.$model">
                      <p class="text-danger" v-if="$v.serie.$error">Es necesario ingresar un número de serie</p>
                    </div>
                  </b-col>
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Marca equipo</label>
                      <select class="form-control" v-model="$v.marca.$model">
                        <option disabled value="">Seleccione la marca del equipo</option>
                        <option>Bueno</option>
                        <option>Regular</option>
                        <option>Malo</option>
                        <option>Baja</option>
                      </select>
                      <p class="text-danger" v-if="$v.marca.$error">Es necesario ingresar una marca</p>
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
                <b-row>
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <b-button @click="EditarEquipo()" class="btn-success botonmostrar">Editar Equipo</b-button>
                    </div>
                  </b-col>  
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <b-button @click="Volver()" class="botonmostrar">Volver</b-button>
                    </div>
                  </b-col>  
                </b-row>
              </div>
            </div>
            <!-- Enviar un Equipo -->
            <div class="card" v-if="pestaña === 'enviar'">
                <div class="card-body">
                 <b-row>
                  <b-col cols="12" md="2">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Numero del equipo</label>
                      <input disabled type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="$v.numero.$model">
                    </div>
                  </b-col>
                  <b-col cols="12" md="2">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Zona del equipo</label>
                      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="$v.zona.$model">
                    </div>
                  </b-col>
                  <b-col cols="12" md="4">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Nombre del Jardin</label>
                      <select class="form-control" v-model="$v.nombre.$model" id="nomJardin">
                        <option v-for="i in nombres" :key="i.nomJardin" :value="i.nomJardin">{{i.nomJardin}}</option>
                      </select>
                    </div>
                  </b-col>
                  <b-col cols="12" md="4">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Dueño del equipo</label>
                      <select class="form-control" v-model="$v.dueño.$model">
                        <option v-for="i in dueños" :key="i.nombre" :value="i.nombre">{{i.nombre}}</option>
                      </select>
                    </div>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <b-button @click="Volver()" href="#" class="botonmostrar">Volver al listado</b-button>
                    </div>
                  </b-col>  
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <b-button @click="EnviarEquipo()" class="btn-success botonmostrar">Enviar Equipo</b-button>
                    </div>
                  </b-col>  
                </b-row>
              </div>
            </div>
        </div>
    </b-container>
  </div>
</template>

<script>
import navbar from "../components/navbar.vue";
import { required} from "vuelidate/lib/validators";
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from 'jquery'; 

export default {
  name: "about",
  components: {
    navbar,
  },
  data() {
      return {
        equiposAct: [],
        corrEquipos: [],
        equiposBuenEstado: [],
        equiposMalEstado: [],
        pestaña: 'equiposact',
        botones: 'si',
        selected: '',
        codigo: '',
        modelo: '',
        tipo: '',
        serie: '',
        marca: '',
        estado: '',
        condicion: '',
        numero: '',
        zona: '',
        nombre: '',
        nombres: [],
        dueño: '',
        dueños: [],
        dismissSecs: 5,
        dismissCountDown: 0,
        mensaje: {color: '', texto: ''}
      }
    },
    validations:{
      codigo:{required},
      modelo:{required},
      tipo:{required},
      serie:{required},
      marca:{required},
      estado:{required},
      condicion:{required},
      numero:{required},
      zona:{required},
      nombre:{required},
      dueño:{required},
    },
    created(){
      this.listarEquiposAct();
      this.listarEquiposBuenEstado();
      this.listarEquiposMalEstado();
      this.nombresJardin();
      this.listarDueños()
    },
    methods: {
      alerta(color, texto){
        this.mensaje.color = color;
        this.mensaje.texto = texto;
        this.showAlert();
      },
      Acteditar(){
        this.pestaña = 'editar'
        this.botones = 'no'
        $('#tablaSinDueño').DataTable().destroy();
        $('#tablaBajas').DataTable().destroy();
        $('#tablaConDueño').DataTable().destroy();
      },
      quitar(id, estado){
        this.axios.put(`/actualizaHistorial/${id}`)
          .then(res => {
            const index = this.equiposAct.findIndex(item => item.codHistorial == res.data);
            console.log(index);
            this.equiposAct.splice(index, 1)
            this.corrEquipos.splice(index, 1)
            console.log(this.corrEquipos);
          })
      },
      MostrarEquiposAct(){
        this.pestaña = 'equiposact'
        $('#tablaSinDueño').DataTable().destroy();
        $('#tablaBajas').DataTable().destroy();
        $('#tablaConDueño').DataTable();
      },
      listarEquiposAct(){
        this.axios.get('/equiposConDueno')
          .then(res => {
            this.equiposAct = res.data;
            this.llenarCorrelativos();
          })
          .catch(e => {
            this.alerta('danger', 'No se han podido cargar los equipos con Dueño');
          })
      },
      llenarCorrelativos(){
        for(var i = 0; i<this.equiposAct.length; i++){
          this.corrEquipos.push(this.equiposAct[i].corrEquipo)
        }
      },
      EquiposBuenEstado(){
        this.pestaña = 'equiposNoAct'
        $('#tablaConDueño').DataTable().destroy();
        $('#tablaBajas').DataTable().destroy();
        $('#tablaSinDueño').DataTable();
      },
      listarEquiposBuenEstado(){
         this.axios.get('/equiposSinDueno')
          .then(res => {
            this.equiposBuenEstado = res.data;
          })
          .catch(e => {
            this.alerta('danger', 'No se han podido cargar los equipos sin Dueño');
          })
      },
      EquiposMalEstado(){
        this.pestaña = 'equiposBaja'
        $('#tablaConDueño').DataTable().destroy();
        $('#tablaSinDueño').DataTable().destroy();
        $('#tablaBajas').DataTable();
      },
      listarEquiposMalEstado(){
        this.axios.get('/equiposBaja')
          .then(res => {
            this.equiposMalEstado = res.data;
          })
          .catch(e => {
            this.alerta('danger', 'No se han podido cargar los equipos dados de baja');
        })
      },
      EditarEquipo(){

      },
      Volver(){
        location.reload();
      },
      Enviar(id){
        this.pestaña = 'enviar'
        this.botones = 'no'
        this.numero = id
        $('#tablaSinDueño').DataTable().destroy();
        $('#tablaBajas').DataTable().destroy();
        $('#tablaConDueño').DataTable().destroy();
      },
      nombresJardin(){
        this.axios.get('/dependencias')
          .then(res => {
            this.nombres = res.data;
            this.nombre = res.data[0].nomJardin
          })
          .catch(e => {
            this.alerta('danger', 'No se han podido cargar los nombres de los jardines');
        })
      },
      listarDueños(){
        this.axios.get('/funcionarios')
          .then(res => {
            this.dueños = res.data;
            this.dueño = res.data[0].nombre
          })
          .catch(e => {
            this.alerta('danger', 'No se han podido cargar los nombres de los Funcionarios');
        })
      },
      EnviarEquipo(){
        this.axios.post('/agregaHistorial', {zona: this.zona, nombre: this.dueño, nomJardin: this.nombre, corrEquipo: this.numero})
          .then(res => {
            Swal.fire(
              'Se ha enviado un equipo al funcionario ' + this.dueño +'!',
              'Seleccione Ok para continuar',
              'success'
            )
            //location.reload();
          })
          .catch(e => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No se ha podido enviar el equipo',
              footer: 'Posible error del sistema'
            })
        })
      },
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
      }
    },
    mounted(){
      $('#tablaConDueño').DataTable();
      $('#tablaSinDueño').DataTable();
      $("#tablaBajas").DataTable()
    },
    watch: {
      equiposAct(val) {
        if(this.pestaña === 'equiposact'){
          $('#tablaConDueño').DataTable().destroy();
          this.$nextTick(()=> {
            $('#tablaConDueño').DataTable()
          });
        }
      },
      equiposBuenEstado(val) {
        if(this.pestaña === 'equiposNoAct'){
          $('#tablaSinDueño').DataTable().destroy();
          this.$nextTick(()=> {
            $('#tablaSinDueño').DataTable()
          });
        }
      },
      equiposMalEstado(val) {
        if(this.pestaña === 'equiposBaja'){
          $('#tablaBajas').DataTable().destroy();
          this.$nextTick(()=> {
            $('#tablaBajas').DataTable()
          });
        }
      },
    }
};


</script>

<style>
  .menu{
    padding: 30px;
  }

  body{
    background-color: #eee;
  }

  .botonmostrar{
    margin: 20px;
  }
</style>