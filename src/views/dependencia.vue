<template>
  <div class="about">
    <navbar />
    <b-container>
        <div class="menu">
            <h1 v-if="pestaña === 'dependencias'">Listado de Dependencias</h1>
            <h1 v-if="pestaña === 'agregar'">Agrega una Dependencia</h1>
            <h1 v-if="pestaña === 'historial'">Historial de la Dependencia</h1>
            <h1 v-if="pestaña === 'actuales'">Equipos actuales de la Dependencia</h1>
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
            <!-- Boton para ir a agregar un Funcionario -->
            <div class="row">
              <b-button @click="agregar()" class="btn-success botonAgregar" v-if="pestaña === 'dependencias'">Agregar Dependencia</b-button>
            </div>
            <!-- Listado de Funcionarios -->
            <div class="row">
                <table class="table table-striped table-dark table-responsive-lg table-responsive-md" id="dependencias" v-if="pestaña === 'dependencias'">
                  <thead>
                    <tr>
                      <th scope="col">Codigo Jardin</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Region</th>
                      <th scope="col">Providencia</th>
                      <th scope="col">Comuna</th>
                      <th scope="col">Editar</th>
                      <th scope="col">Historial</th>
                      <th scope="col">Equipos Actuales</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="i in dependencias" :key="i.codigo">
                      <td scope="row">{{i.codJardin}}</td>
                      <td>{{i.nomJardin}}</td>
                      <td>{{i.region}}</td>
                      <td>{{i.provincia}}</td>
                      <td>{{i.comuna}}</td>
                      <td>
                        <b-button @click="Acteditar()" class="btn-warning btn-sm">Editar</b-button>
                      </td>
                      <td>
                        <b-button @click="ActHistorial()" class="btn-sm">Historial</b-button>
                      </td>
                      <td>
                        <b-button @click="EquiposActuales()" class="btn-success btn-sm">Equipos Actuales</b-button>
                      </td>
                    </tr>
                  </tbody>
                </table>
            </div>
          <!-- Agregar una dependencia -->
          <div class="card" v-if="pestaña === 'agregar'">
               <div class="card-body">
                 <b-row>
                   <b-col cols="12" md="12">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Codigo perteneciente al Jardin</label>
                      <input type="text" class="form-control" id="codJardinAgrega" aria-describedby="emailHelp" v-model="$v.codigo.$model">
                      <p class="text-danger" v-if="$v.codigo.$error">Es necesario ingresar un codigo</p>
                    </div>
                  </b-col>
                 </b-row>
                 <b-row>
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Nombre del Jardin</label>
                      <input type="text" class="form-control" id="nomJardinAgrega" aria-describedby="emailHelp" v-model="$v.nomJardinAgrega.$model">
                      <p class="text-danger" v-if="$v.nomJardinAgrega.$error">Es necesario ingresar un nombre</p>
                    </div>
                  </b-col>
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Region del Jardin</label>
                      <select @change="cambioRegion(true)" class="form-control" if="regionAgrega" v-model="$v.regionAgrega.$model">
                        <option v-for="i in regiones" :key="i.region">{{i.region}}</option>
                      </select>
                    </div>
                  </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12" md="6">
                      <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Comuna del Jardin</label>
                        <select class="form-control" v-model="$v.comunaAgrega.$model">
                          <option disabled value="">Seleccione que tipo de equipo es</option>
                          <option>Bueno</option>
                          <option>Regular</option>
                          <option>Malo</option>
                          <option>Baja</option>
                        </select>
                      </div>
                    </b-col>
                    <b-col cols="12" md="6">
                      <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Provincia del Jardin</label>
                        <select class="form-control" v-model="$v.provinciaAgrega.$model">
                          <option v-for="i in provincias" :key="i.provincia">{{i.provincia}}</option>
                      </select>
                      </div>
                    </b-col>
                </b-row>
                <br>
              <button type="submit" @click="agregarDependencia()" class="btn btn-success m-3">Agregar Dependencia</button>
              <button type="submit" @click="Volver()" class="btn btn-primary">Volver al Listado</button>
            </div>
          </div>
          <!-- Editar una dependencia-->
          <div class="card" v-if="pestaña === 'editar'">
               <div class="card-body">
                 <b-row>
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Nombre del Jardin</label>
                      <input type="text" class="form-control" id="nomJardinEdita" aria-describedby="emailHelp" v-model="$v.nomJardin.$model">
                      <p class="text-danger" v-if="$v.nomJardin.$error">Es necesario ingresar un nombre</p>
                    </div>
                  </b-col>
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Region del Jardin</label>
                      <select class="form-control" v-model="$v.region.$model">
                        <option v-for="i in regiones" :key="i.region">{{i.region}}</option>
                      </select>
                    </div>
                  </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12" md="6">
                      <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Comuna del Jardin</label>
                        <select class="form-control" v-model="$v.comuna.$model">
                          <option disabled value="">Seleccione que tipo de equipo es</option>
                          <option>Bueno</option>
                          <option>Regular</option>
                          <option>Malo</option>
                          <option>Baja</option>
                      </select>
                      </div>
                    </b-col>
                    <b-col cols="12" md="6">
                      <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Provincia del Jardin</label>
                        <select class="form-control" v-model="$v.provincia.$model">
                          <option disabled value="">Seleccione que tipo de equipo es</option>
                          <option>Bueno</option>
                          <option>Regular</option>
                          <option>Malo</option>
                          <option>Baja</option>
                      </select>
                      </div>
                    </b-col>
                </b-row>
                <br>
              <button type="submit" @click="editarDependencia()" class="btn btn-success m-3">Editar Dependencia</button>
              <button type="submit" @click="Volver()" class="btn btn-primary">Volver al Listado</button>
            </div>
          </div>
          <!-- Historial del funcionario -->
          <b-button @click="Volver()" class="botonAgregar" v-if="pestaña === 'historial'">Volver al listado de las Dependencias</b-button>
          <b-button @click="ActHistorial()" class="botonAgregar btn btn-success" v-if="pestaña === 'historial'">Filtrar Datos de la tabla</b-button>
          <div class="row">
                <table class="table table-striped table-dark table-responsive-lg table-responsive-md" id="historialdependencias" v-if="pestaña === 'historial'">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Codigo Equipo</th>
                      <th scope="col">Tipo de Equipo</th>
                      <th scope="col">N° Serie</th>
                      <th scope="col">Modelo</th>
                      <th scope="col">Marca</th>
                      <th scope="col">Funcionario</th>
                      <th scope="col">Zona</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td scope="row">January</td>
                      <td>1324343324</td>
                      <td>$10asd0</td>
                      <td>January</td>
                      <td>January</td>
                      <td>January</td>
                      <td>January</td>
                      <td>January</td>
                    </tr>
                  </tbody>
                </table>
            </div>
          <!-- Equipos Actuales del funcionario -->  
          <b-button @click="Volver()" class="botonAgregar" v-if="pestaña === 'actuales'">Volver al listado de las Dependencias</b-button>
          <b-button @click="EquiposActuales()" class="botonAgregar btn btn-success" v-if="pestaña === 'actuales'">Filtrar Datos de la tabla</b-button>
          <div class="row">
                <table class="table table-striped table-dark table-responsive-lg table-responsive-md" id="actualesdependencias" v-if="pestaña === 'actuales'">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Codigo Equipo</th>
                      <th scope="col">Tipo de Equipo</th>
                      <th scope="col">N° Serie</th>
                      <th scope="col">Modelo</th>
                      <th scope="col">Marca</th>
                      <th scope="col">Funcionario</th>
                      <th scope="col">Zona</th>
                      <th scope="col">Quitar Equipo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td scope="row">January</td>
                      <td>1324343324</td>
                      <td>$10asd0</td>
                      <td>January</td>
                      <td>January</td>
                      <td>January</td>
                      <td>January</td>
                      <td>January</td>
                      <td>
                        <b-button @click="quitar()" class="btn-danger btn-sm">Quitar</b-button>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
        //Listas utilizadas para el manejo de tablas
        equiposAct: [],
        historial: [],
        dependencias: [],
        //Pestaña que indica la vista actual
        pestaña: 'dependencias',
        codigo: '',
        nomJardinAgrega: '',
        regionAgrega: '',
        regiones: [],
        comunaAgrega: '',
        comunas: [],
        provinciaAgrega: '',
        provincias: [],
        nomJardin: '',
        region: '',
        comuna: '',
        provincia: '',
        //Variables de las alertas
        dismissSecs: 5,
        dismissCountDown: 0,
        mensaje: {color: '', texto: ''}
      }
    },
    validations:{
      //Validaciones de los input
      codigo:{required},
      nomJardinAgrega:{required},
      regionAgrega:{required},
      comunaAgrega:{required},
      provinciaAgrega:{required},
      nomJardin:{required},
      region:{required},
      comuna:{required},
      provincia:{required}
    },
    created(){
      //Iniciamos las funciones que se encargan de cargar los datos apenas se inicie la ruta
      this.listarDependencias();
      this.obtenerRegiones();
    },
    methods: { //Vista inicial
    //Función que obtiene los datos de las dependencias y los enviar al arreglo que cargara la tabla
      listarDependencias(){
        this.axios.get('/dependenciasTabla')
          .then(res => {
            this.dependencias = res.data;
          })
          .catch(e => {
            this.alerta('danger', 'No se han podido cargar a las dependencias');
          })
      },
      //Función que obtiene todas las regiones
      obtenerRegiones(){
        this.axios.get('/regiones')
          .then(res => {
            this.regiones = res.data;
            this.regionAgrega = res.data[0].region;
            this.obtenerProvincias(true);
          })
          .catch(e => {
            this.alerta('danger', 'No se han podido cargar las regiones');
          })
      },
      //Funcion que permite indicar cuando se cambia una region
      cambioRegion(agregar){
        if(agregar)this.obtenerProvincias(true);
      },
      //Funcion que carga las provincias de una region, si agregar es true carga las provincias de la vista agregar
      obtenerProvincias(agregar){
        if(agregar) var r = this.regionAgrega;
        else var r = this.region;
        this.axios.get(`/provincias/${r}`)
          .then(res => {
            this.provincias = res.data;        
            if(agregar) this.provinciaAgrega = res.data[0].provincia;
            else this.provincia = res.data[0].provincia;
          })
          .catch(e => {
            this.alerta('danger', 'No se han podido cargar las provincias');
          })
      },
      /*Funcion que carga las comunas de una provincia, si agregar es true carga las comunas de la vista agregar
      obtenerComunas(agregar){
        if(agregar) var r = this.regionAgrega;
        else var r = this.region;
        this.axios.get(`/provincias/${r}`)
          .then(res => {
            this.provincias = res.data;        
            if(agregar) this.provinciaAgrega = res.data[0].provincia;
            else this.provincia = res.data[0].provincia;
          })
          .catch(e => {
            this.alerta('danger', 'No se han podido cargar las provincias');
          })
      },*/

      //Función que determina la vista de edición de una dependencia
      Acteditar(){
        this.pestaña = 'editar'
        $('#dependencias').DataTable().destroy();
        $('#historialdependencias').DataTable().destroy();
        $("#actualesdependencias").DataTable().destroy();
      },
      //Función que determina la vista del historial de una dependencia
      ActHistorial(){
        $('#dependencias').DataTable().destroy();
        $("#actualesdependencias").DataTable().destroy();
        $('#historialdependencias').DataTable()
        this.pestaña = 'historial'
      },
      //Función que determina la vista de los equipos actuales de una dependencia
      EquiposActuales(){
        $('#dependencias').DataTable().destroy();
        $("#historialdependencias").DataTable().destroy();
        $('#actualesdependencias').DataTable()
        this.pestaña = 'actuales'
      },
      //Función que determina la vista de agregar
      agregar(){
        $('#dependencias').DataTable().destroy();
        $('#historialdependencias').DataTable().destroy();
        $("#actualesdependencias").DataTable().destroy();
        this.pestaña = 'agregar'
      }, //Funciones de la vista agregar
      agregarDependencia(){
        console.log("Agregaaa")
      },
      //Se reinicia la ruta para regresar a la pantalla Principal
      Volver(){
        location.reload();
      }, //Vista de editar
       //Función que permite editar a una dependencia
      editarDependencia(){
        console.log('Editateee')
      },
      //Funcion que quita un equipo a una dependencia
      quitar(){
        console.log("holaxd")
      },
      //Funciones de la alerta
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
      },
      alerta(color, texto){
        this.mensaje.color = color;
        this.mensaje.texto = texto;
        this.showAlert();
      },
    },
    mounted(){
      //Se cargan las tablas como Datatables del Jquery
      $('#dependencias').DataTable();
      $('#historialdependencias').DataTable();
      $("#actualesdependencias").DataTable()
    },
    watch: {
      dependencias(val) {
        if(this.pestaña === 'dependencias'){
          $('#dependencias').DataTable().destroy();
          this.$nextTick(()=> {
            $('#dependencias').DataTable()
          });
        }
      },
      historial(val) {
        if(this.pestaña === 'historial'){
          $('#historialdependencias').DataTable().destroy();
          this.$nextTick(()=> {
            $('#historialdependencias').DataTable()
          });
        }
      },
      equiposAct(val) {
        if(this.pestaña === 'actuales'){
          $('#actualesdependencias').DataTable().destroy();
          this.$nextTick(()=> {
            $('#actualesdependencias').DataTable()
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

  .botonAgregar{
    margin: 20px;
    position: relative;
    left: -18px;
  }
</style>