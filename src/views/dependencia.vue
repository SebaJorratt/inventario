<template>
  <div class="about">
    <navbar />
    <b-container>
        <div class="menu">
            <h1 v-if="pestaña === 'dependencias'">Listado de Dependencias</h1>
            <h1 v-if="pestaña === 'agregar'">Agrega una Dependencia</h1>
            <h1 v-if="pestaña === 'historial'">Historial de la Dependencia</h1>
            <h1 v-if="pestaña === 'actuales'">Equipos actuales de la Dependencia</h1>
            <h1 v-if="pestaña === 'editar'">Editar Dependencia</h1>
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
              <b-button @click="agregar()" class="btn-success botonAgregar" v-if="pestaña === 'dependencias'" style="border-color: black;">Agregar Dependencia</b-button>
            </div><br v-if="pestaña === 'dependencias'">
            <!-- Listado de Funcionarios -->
            <div class="row">
                <table class="table table-striped table-dark table-responsive-lg table-responsive-md" id="dependencias" v-if="pestaña === 'dependencias'">
                  <thead>
                    <tr>
                      <th scope="col">Codigo Dependencia</th>
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
                        <b-button @click="Acteditar(i.codJardin)" class="btn-warning btn-sm" style="border-color: white;">Editar</b-button>
                      </td>
                      <td>
                        <b-button @click="ActHistorial(i.codJardin)" class="btn-sm" style="border-color: white;">Historial</b-button>
                      </td>
                      <td>
                        <b-button @click="EquiposActuales(i.codJardin)" class="btn-success btn-sm" style="border-color: white;">Equipos Actuales</b-button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br v-if="pestaña === 'dependencias'"><div class="mb-1">
                  <b-button @click="exportar(3)" v-if="pestaña === 'dependencias'" class="btn-success boton">Exportar</b-button>
                </div>
            </div>
          <!-- Agregar una dependencia -->
          <div class="card" v-if="pestaña === 'agregar'" style="border-color: black;">
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
                          <option v-for="i in comunas" :key="i.comuna">{{i.comuna}}</option>
                        </select>
                      </div>
                    </b-col>
                    <b-col cols="12" md="6">
                      <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Provincia del Jardin</label>
                        <select @change="cambioProvincia(true)" class="form-control" v-model="$v.provinciaAgrega.$model">
                          <option v-for="i in provincias" :key="i.provincia">{{i.provincia}}</option>
                      </select>
                      </div>
                    </b-col>
                </b-row>
                <br>
                <b-row>
                  <b-col cols="12" md="6">
                    <button type="submit" @click="agregarDependencia()" class="btn btn-success m-3 boton">Agregar Dependencia</button>
                  </b-col>
                  <b-col cols="12" md="6">
                    <button type="submit" @click="Volver()" class="btn btn-primary boton">Volver al Listado</button>
                  </b-col>
                </b-row>
            </div>
          </div>
          <!-- Editar una dependencia-->
          <div class="card" v-if="pestaña === 'editar'" style="border-color: black;">
               <div class="card-body">
                 <b-row>
                  <b-col cols="12" md="12">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Nombre del Jardin/Dependencia</label>
                      <input type="text" class="form-control" id="nomJardinEdita" aria-describedby="emailHelp" v-model="$v.nomJardin.$model">
                      <p class="text-danger" v-if="$v.nomJardin.$error">Es necesario ingresar un nombre</p>
                    </div>
                  </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12" md="4">
                      <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Region del Jardin</label>
                        <select class="form-control" @change="cambioRegion(false)" v-model="$v.region.$model">
                          <option v-for="i in regiones" :key="i.region">{{i.region}}</option>
                        </select>
                      </div>
                    </b-col>
                    <b-col cols="12" md="4">
                      <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Comuna del Jardin</label>
                        <select class="form-control" v-model="$v.comuna.$model">
                          <option v-for="i in comunas" :key="i.comuna">{{i.comuna}}</option>
                      </select>
                      </div>
                    </b-col>
                    <b-col cols="12" md="4">
                      <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Provincia del Jardin</label>
                        <select class="form-control" @change="cambioProvincia(false)" v-model="$v.provincia.$model">
                          <option v-for="i in provincias" :key="i.provincia">{{i.provincia}}</option>
                      </select>
                      </div>
                    </b-col>
                </b-row>
                <br>
                <b-row>
                  <b-col cols="12" md="6">
                    <button type="submit" @click="editarDependencia()" class="btn btn-success m-3 boton">Editar Dependencia</button>
                  </b-col>
                  <b-col cols="12" md="6">
                    <button type="submit" @click="Volver()" class="btn btn-primary boton">Volver al Listado</button>
                  </b-col>
                </b-row>
            </div>
          </div>
          <!-- Historial del funcionario -->
          <div class="row">
            <b-button @click="Volver()" class="botonAgregar" v-if="pestaña === 'historial'" style="border-color: black;">Volver al listado de las Dependencias</b-button>
          </div>  <br>
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
                      <th scope="col">Desde</th>
                      <th scope="col">Hasta</th>
                      <th scope="col">Zona</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="i in historial" :key="i.codHistorial">
                      <td scope="row">{{i.codHistorial}}</td>
                      <td>{{i.codEquipo}}</td>
                      <td>{{i.tipoEquipo}}</td>
                      <td>{{i.serie}}</td>
                      <td>{{i.modelo}}</td>
                      <td>{{i.nomMarca}}</td>
                      <td>{{i.nombre}}</td>
                      <td>{{i.fechaInicio}}</td>
                      <td>{{i.fecha}}</td>
                      <td>{{i.zona}}</td>
                    </tr>
                  </tbody>
                </table>
                <br v-if="pestaña === 'historial'"><div class="mb-1">
                  <b-button @click="exportar(2)" v-if="pestaña === 'historial'" class="btn-success boton">Exportar</b-button>
                </div>
            </div>
          <!-- Equipos Actuales del funcionario -->  
          <div class="row">
            <b-button @click="Volver()" class="botonAgregar" v-if="pestaña === 'actuales'" style="border-color: black;">Volver al listado de las Dependencias</b-button>
          </div><br>
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
                      <th scope="col">Fecha</th>
                      <th scope="col">Zona</th>
                      <th scope="col" v-if="activo">Quitar Equipo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="i in equiposAct" :key="i.codHistorial">
                      <td scope="row">{{i.codHistorial}}</td>
                      <td>{{i.codEquipo}}</td>
                      <td>{{i.tipoEquipo}}</td>
                      <td>{{i.serie}}</td>
                      <td>{{i.modelo}}</td>
                      <td>{{i.nomMarca}}</td>
                      <td>{{i.nombre}}</td>
                      <td>{{i.fechaInicio}}</td>
                      <td>{{i.zona}}</td>
                      <td v-if="activo">
                        <b-button @click="quitar(i.codHistorial)" class="btn-danger btn-sm" style="border-color: white;">Quitar</b-button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br v-if="pestaña === 'actuales'"><div class="mb-1">
                  <b-button @click="exportar(1)" v-if="pestaña === 'actuales'" class="btn-success boton">Exportar</b-button>
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

import * as XLSX from 'xlsx/xlsx.mjs';

/* load 'fs' for readFile and writeFile support */
import * as fs from 'fs';
XLSX.set_fs(fs);

/* load the codepage support library for extended support with older formats  */
import * as cpexcel from 'xlsx/dist/cpexcel.full.mjs';
XLSX.set_cptable(cpexcel);

import { mapState } from 'vuex'

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
        //Variables para edición
        codigoEditar: '',
        nomJardin: '',
        region: '',
        comuna: '',
        provincia: '',
        //Variables de las alertas
        dismissSecs: 5,
        dismissCountDown: 0,
        mensaje: {color: '', texto: ''},
        activo: true
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
    computed: {
      ...mapState(['token', 'usuarioDB'])
    },
    created(){
      //Iniciamos las funciones que se encargan de cargar los datos apenas se inicie la ruta
      this.listarDependencias();
      this.obtenerRegiones(true);
      this.verificar();
    },
    methods: { 
      exportar(num) {
        let data = [];
        var filename = "planilla";
        if(num === 1){
          var arreglado = this.equiposAct.map( item => { 
            return { ID: item.codHistorial , CodigoEquipo : item.codEquipo, Tipo : item.tipoEquipo, Serie : item.serie, Modelo : item.modelo, Marca : item.nomMarca, Funcionario : item.nombre, Zona : item.zona};
          });
          data = XLSX.utils.json_to_sheet(arreglado);
          filename = 'EqpsDep' + this.codigoEditar
        }else if(num === 2){
          var arreglado = this.historial.map( item => { 
            return { ID: item.codHistorial , CodigoEquipo : item.codEquipo, Tipo : item.tipoEquipo, Serie : item.serie, Modelo : item.modelo, Marca : item.nomMarca, Funcionario : item.nombre, Desde : item.fechaInicio, Hasta : item.fecha, Zona : item.zona};
          });
          data = XLSX.utils.json_to_sheet(arreglado);
          filename = 'HistDep' + this.codigoEditar
        }else if(num === 3){
          var arreglado = this.dependencias.map( item => { 
            return { Codigo: item.codJardin , Nombre : item.nomJardin, Encargado : item.nombre, Región : item.region, Provincia : item.provincia, Comuna : item.comuna}; 
          });
          data = XLSX.utils.json_to_sheet(arreglado);
          filename = 'Dependencias'
        }
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, data, filename);
        XLSX.writeFile(workbook, `${filename}.xlsx`);
      },

      verificar(){
        if(this.usuarioDB.data[0].tipoUsuario == 0){
          this.activo = false;
        }
      },
    //Función que obtiene los datos de las dependencias y los enviar al arreglo que cargara la tabla
      listarDependencias(){
        let config = {
          headers: {
            token: this.token
          }
        }
        this.axios.get('api/dependenciasTabla', config)
          .then(res => {
            this.dependencias = res.data;
          })
          .catch(e => {
            this.alerta('danger', 'No se han podido cargar a las dependencias');
          })
      },
      //Muestra el historial de equipos de una dependencia
      listarHistorial(){
        let config = {
          headers: {
            token: this.token
          }
        }
        this.axios.get(`api/Histdependencia/${this.codigoEditar}`, config)
          .then(res => {
            this.historial = res.data;
          })
          .catch(e => {
            this.alerta('danger', 'No se ha logrado obtener el historial deseado');
          })
      },
      //Lista los datos de los equipos de los que una dependencia es dueño
      listarActuales(){
        let config = {
          headers: {
            token: this.token
          }
        }
        this.axios.get(`api/Actdependencia/${this.codigoEditar}`, config)
          .then(res => {
            this.equiposAct = res.data;
          })
          .catch(e => {
            this.alerta('danger', 'No se ha logrado obtener los equipos que ocupa el funcionario');
          })
      },
      //Función que obtiene todas las regiones
      obtenerRegiones(agregar){
        let config = {
          headers: {
            token: this.token
          }
        }
        this.axios.get('api/regiones', config)
          .then(res => {
            this.regiones = res.data;
            this.regionAgrega = res.data[0].region;
            if(agregar)this.obtenerProvincias(true);
          })
          .catch(e => {
            this.alerta('danger', 'No se han podido cargar las regiones');
          })
      },
      //Funcion que permite indicar cuando se cambia una region
      cambioRegion(agregar){
        if(agregar)this.obtenerProvincias(true);
        else this.obtenerProvincias(false);
      },
      //Funcion que permite indicar cuando se cambia una provincia
      cambioProvincia(agregar){
        if(agregar)this.obtenerComunas(true);
        else this.obtenerComunas(false);
      },
      //Funcion que carga las provincias de una region, si agregar es true carga las provincias de la vista agregar
      obtenerProvincias(agregar,provincia,comuna){
        if(agregar) var r = this.regionAgrega;
        else var r = this.region;
        let config = {
          headers: {
            token: this.token
          }
        }
        this.axios.get(`api/provincias/${r}`, config)
          .then(res => {
            this.provincias = res.data;        
            if(agregar){
              this.provinciaAgrega = res.data[0].provincia;
              this.obtenerComunas(true)
            }
            else{
              if(provincia){
                this.provincia = provincia;
                this.obtenerComunas(false,comuna)
              }else{
                this.provincia = res.data[0].provincia;
                this.obtenerComunas(false)
              }
            }
          })
          .catch(e => {
            this.alerta('danger', 'No se han podido cargar las provincias');
          })
      },
      //Funcion que carga las comunas de una provincia, si agregar es true carga las comunas de la vista agregar
      obtenerComunas(agregar,comuna){
        if(agregar) var r = this.provinciaAgrega;
        else var r = this.provincia;
        let config = {
          headers: {
            token: this.token
          }
        }
        this.axios.get(`api/comunas/${r}`, config)
          .then(res => {
            this.comunas = res.data;        
            if(agregar) this.comunaAgrega = res.data[0].comuna;
            else {
              if(comuna){
                this.comuna = comuna;
              }else{
                this.comuna = res.data[0].comuna;
              }
            }
          })
          .catch(e => {
            this.alerta('danger', 'No se han podido cargar las comunas');
          })
      },
      //Función que determina la vista de edición de una dependencia
      Acteditar(codigo){
        this.pestaña = 'editar'
        this.codigoEditar = codigo;
        $('#dependencias').DataTable().destroy();
        $('#historialdependencias').DataTable().destroy();
        $("#actualesdependencias").DataTable().destroy();
        this.cargarDependencia();
      },
      //Función que determina la vista del historial de una dependencia
      ActHistorial(codigo){
        $('#dependencias').DataTable().destroy();
        $("#actualesdependencias").DataTable().destroy();
        $('#historialdependencias').DataTable()
        this.pestaña = 'historial'
        this.codigoEditar = codigo;
        this.listarHistorial();
      },
      //Función que determina la vista de los equipos actuales de una dependencia
      EquiposActuales(codigo){
        $('#dependencias').DataTable().destroy();
        $('#actualesdependencias').DataTable()
        this.pestaña = 'actuales'
        this.codigoEditar = codigo;
        this.listarActuales();
      },
      //Función que determina la vista de agregar
      agregar(){
        $('#dependencias').DataTable().destroy();
        this.pestaña = 'agregar'
      }, //Funciones de la vista agregar
      agregarDependencia(){
        let config = {
          headers: {
            token: this.token
          }
        }
        this.$v.$touch()
        if(!this.$v.codigo.$invalid && !this.$v.nomJardinAgrega.$invalid){
          this.axios.post('api/agregaDependencia', {codJardin: this.codigo, nomJardin: this.nomJardinAgrega, region: this.regionAgrega, comuna: this.comunaAgrega, provincia: this.provinciaAgrega}, config)
            .then(res => {
              if(res.data.sqlMessage){
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'No se ha podido crear la dependencia ' + this.nomJardinAgrega,
                  footer: 'Ya existe una dependencia con algun dato repetido revise la lista de dependencias'
                })
              }else{
              Swal.fire(
                'Se ha creado una nueva dependencia, ' + this.nomJardinAgrega + ' se agrego al sistema!',
                'Seleccione Ok para continuar',
                'success'
              )}
              //location.reload();
            })
            .catch(e => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se ha podido crear la dependencia ' + this.nomJardinAgrega,
                footer: 'Posible error del sistema'
              })
          })
        }else{
          this.alerta('danger', 'Porfavor ingrese todos los datos requeridos');
        }
      },
      //Se reinicia la ruta para regresar a la pantalla Principal
      Volver(){
        $("#historialdependencias").DataTable().destroy();
        $("#actualesdependencias").DataTable().destroy();
        this.pestaña = 'dependencias'
        this.listarDependencias();
        this.obtenerRegiones(true);
      }, 
      //Vista de editar
      //Función que se encarga de cargar los datos de la Dependencia a editar
      async cargarDependencia(){
        let config = {
          headers: {
            token: this.token
          }
        }
        await this.axios.get(`api/dependencia/${this.codigoEditar}`, config)
          .then(res => {
            this.nomJardin = res.data[0].nomJardin;
            this.region = res.data[0].region;
            this.obtenerProvincias(false,res.data[0].provincia,res.data[0].comuna);
          })
          .catch(e => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No se ha podido ingresar a los datos de esta dependencia',
              footer: 'Posible error del sistema'
            })
            this.pestaña = 'dependencia';
          })
      },
       //Función que permite editar a una dependencia
      editarDependencia(){
        let config = {
          headers: {
            token: this.token
          }
        }
        this.$v.$touch()
        if(!this.$v.nomJardin.$invalid){
          this.axios.put(`api/actualizaDependencia/${this.codigoEditar}`, {codJardin: this.codigo, nomJardin: this.nomJardin, region: this.region, comuna: this.comuna, provincia: this.provincia}, config)
            .then(res => {
              if(res.data.sqlMessage){
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'No se ha podido actualizar la dependencia ' + this.nomJardin,
                  footer: 'Ya existe una dependencia con este nombre'
                })
              }else{
              Swal.fire(
                'Se registraron los cambios de la Dependencia, ' + this.nomJardin + ' actualización Realizada!',
                'Seleccione Ok para continuar',
                'success'
              )}
              //location.reload();
            })
            .catch(e => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se ha podido actualizar la Dependencia ' + this.nomJardin,
                footer: 'Posible error del sistema'
              })
            })
        }else{
          this.alerta('danger', 'Ingrese un nombre valido');
        }
      },
      convertDateMysql(yourDate){
        yourDate.toISOString().split('T')[0]
        const offset = yourDate.getTimezoneOffset()
        yourDate = new Date(yourDate.getTime() - (offset*60*1000))
        return yourDate.toISOString().split('T')[0]
		  },
      //Funcion que quita un equipo a una dependencia
      quitar(id){
        var dt = this.convertDateMysql(new Date())
        swal.fire({
            title: '¿Seguro que desea quitar el equipo?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: '¡Si!'
        }).then((result) => {
          if (result.value) {
            let config = {
              headers: {
                token: this.token
              }
            }
            this.axios.put(`api/actualizaHistorial/${id}`, {fecha: dt}, config)
              .then(res => {
                const index = this.equiposAct.findIndex(item => item.codHistorial == res.data);
                this.equiposAct.splice(index, 1)
                Swal.fire(
                  'Se ha quitado un equipo a la Dependencia!',
                  'Seleccione Ok para continuar',
                  'success'
                )
              })
              .catch(e => {
                var mensaje = 'Posible error del sistema';
                if(e.response.data.mensaje){
                  mensaje = e.response.data.mensaje;
                }
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'No se ha podido quitar el equipo a la Dependencia',
                  footer: mensaje
                })
              })
          }
        })
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

  .boton{
    margin: 20px;
    width: 90%;
    border-radius: 12px;
    border-color: black;
  }
</style>