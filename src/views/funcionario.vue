<template>
  <div class="about">
    <navbar />
    <b-container>
        <div class="menu">
            <h1 v-if="pestaña === 'funcionarios'">Listado de funcionarios</h1>
            <h1 v-if="pestaña === 'agregar'">Agrega un Funcionario</h1>
            <h1 v-if="pestaña === 'historial'">Historial del Funcionario</h1>
            <h1 v-if="pestaña === 'actuales'">Equipos actuales del Funcionario</h1>
            <h1 v-if="pestaña === 'editar'">Editar Funcionario</h1>
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
              <b-button @click="agregar()" class="btn-success botonAgregar" style="border-color: black;" v-if="pestaña === 'funcionarios'">Agregar Funcionario</b-button>
            </div><br>
            <!-- Listado de Funcionarios -->
            <div class="row">
                <table id='funcionarios' class="table table-striped table-dark table-responsive-lg table-responsive-md" v-if="pestaña === 'funcionarios'">
                  <thead>
                    <tr>
                      <th scope="col">Codigo</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Codigo de Funcionario</th>
                      <th scope="col">Rut</th>
                      <th scope="col">Correo</th>
                      <th scope="col">Editar</th>
                      <th scope="col">Historial</th>
                      <th scope="col">Equipos Actuales</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="i in funcionarios" :key="i.codigo">
                      <td scope="row">{{i.codigo}}</td>
                      <td>{{i.nombre}}</td>
                      <td>{{i.codFuncionario}}</td>
                      <td>{{i.rut}}</td>
                      <td>{{i.correo}}</td>
                      <td>
                        <b-button @click="Acteditar(i.codigo)" class="btn-warning btn-sm" style="border-color: white;">Editar</b-button>
                      </td>
                      <td>
                        <b-button @click="ActHistorial(i.codigo)" class="btn-sm" style="border-color: white;">Historial</b-button>
                      </td>
                      <td>
                        <b-button @click="EquiposActuales(i.codigo)" class="btn-success btn-sm" style="border-color: white;">Equipos Actuales</b-button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br v-if="pestaña === 'funcionarios'"><div class="mb-1">
                  <b-button @click="exportar(3)" v-if="pestaña === 'funcionarios'" class="btn-success boton">Exportar</b-button>
                </div>
            </div>
          <!-- Agregar un funcionario -->
          <div class="card" v-if="pestaña === 'agregar'" style="border-color: black;">
               <div class="card-body">
                 <b-row>
                   <b-col cols="12" md="12">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Codigo Principal del Funcionario</label>
                      <input type="text" class="form-control" id="codigoAgrega" aria-describedby="emailHelp" v-model="$v.codigo.$model">
                      <p class="text-danger" v-if="$v.codigo.$error">Es necesario ingresar un codigo</p>
                    </div>
                  </b-col>
                 </b-row>
                 <b-row>
                  <b-col cols="12" md="3">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Codigo Funcionario</label>
                      <input type="text" class="form-control" id="codFuncionarioAgrega" aria-describedby="emailHelp" v-model="$v.codigoFuncionarioAgregar.$model">
                      <p class="text-danger" v-if="$v.codigoFuncionarioAgregar.$error">Es necesario ingresar un codigo</p>
                    </div>
                  </b-col>
                  <b-col cols="12" md="4">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Nombre del Funcionario</label>
                      <input type="text" class="form-control" id="nomFuncionarioAgrega" aria-describedby="emailHelp" v-model="$v.nomFuncionarioAgregar.$model">
                      <p class="text-danger" v-if="$v.nomFuncionarioAgregar.$error">Es necesario ingresar un nombre mínimos 10 caracteres</p>
                    </div>
                  </b-col>
                  <b-col cols="12" md="3">
                    <label for="exampleInputEmail1" class="form-label">Dependencia</label>
                    <select class="form-control" @change="cambiaJardin()" v-model="dependenciaAgregar">
                      <option v-for="i in dependencias" :key="i.codJardin" :value="i.nomJardin">{{i.nomJardin}}</option>
                    </select>
                  </b-col>
                  <b-col cols="12" md="2">
                    <label for="exampleInputEmail1" class="form-label">Codigo Jardín</label>
                    <input disabled type="text" class="form-control" id="nomFuncionarioAgrega" aria-describedby="emailHelp" v-model="codigoJardinAgregar">
                  </b-col>
                </b-row>
                  <b-row>
                    <b-col cols="12" md="4">
                      <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Correo del Funcionario</label>
                        <input type="email" class="form-control" id="correoAgrega" aria-describedby="emailHelp" v-model="$v.correoAgregar.$model">
                        <p class="text-danger" v-if="$v.correoAgregar.$error">Por favor ingrese un email</p>
                      </div>
                    </b-col>
                    <b-col cols="12" md="4">
                      <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Rut del Funcionario</label>
                        <input type="text" class="form-control" id="rutAgrega" aria-describedby="emailHelp" v-model="$v.rutAgregar.$model">
                        <p class="text-danger" v-if="$v.rutAgregar.$error">Es necesario ingresar un rut</p>
                      </div>
                    </b-col>
                    <b-col cols="12" md="4">
                      <label for="exampleInputEmail1" class="form-label">Encargado de Dependencia</label>
                      <select class="form-control" v-model="encargadoAgregar">
                        <option disabled value="">Tipo de funcionario</option>
                        <option value="1">Encargado</option>
                        <option value="0">Normal</option>
                      </select>
                    </b-col>
                  </b-row>
                <br>
                <b-row>
                  <b-col cols="12" md="6">
                    <button type="submit" @click="agregarFuncionario()" class="btn btn-success m-3 boton">Agregar Funcionario</button>
                  </b-col>
                  <b-col cols="12" md="6">
                    <button type="submit" @click="Volver()" class="btn btn-primary boton">Volver al Listado</button>
                  </b-col>
                </b-row>
            </div>
          </div>
          <!-- Editar un funcionario -->
          <div class="card" v-if="pestaña === 'editar'" style="border-color: black;">
               <div class="card-body">
                 <b-row>
                  <b-col cols="12" md="3">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Codigo Funcionario</label>
                      <input type="text" class="form-control" id="codFuncionarioEdita" aria-describedby="emailHelp" v-model="$v.codigoFuncionario.$model">
                      <p class="text-danger" v-if="$v.codigoFuncionario.$error">Es necesario ingresar un codigo</p>
                    </div>
                  </b-col>
                  <b-col cols="12" md="4">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Nombre del Funcionario</label>
                      <input type="text" class="form-control" id="nomFuncionarioEdita" aria-describedby="emailHelp" v-model="$v.nomFuncionario.$model">
                      <p class="text-danger" v-if="$v.nomFuncionario.$error">Es necesario ingresar un nombre mínimos 10 caracteres</p>
                    </div>
                  </b-col>
                  <b-col cols="12" md="3">
                    <label for="exampleInputEmail1" class="form-label">Dependencia</label>
                    <select class="form-control" @change="cambiaJardinEditar()" v-model="dependenciaEditar">
                      <option v-for="i in dependencias" :key="i.codJardin" :value="i.nomJardin">{{i.nomJardin}}</option>
                    </select>
                  </b-col>
                  <b-col cols="12" md="2">
                    <label for="exampleInputEmail1" class="form-label">Codigo Jardín</label>
                    <input disabled type="text" class="form-control" id="nomFuncionarioAgrega" aria-describedby="emailHelp" v-model="codigoJardin">
                  </b-col>
                </b-row>
                  <b-row>
                    <b-col cols="12" md="4">
                      <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Correo del Funcionario</label>
                        <input type="email" class="form-control" id="correoEdita" aria-describedby="emailHelp" v-model="$v.correo.$model">
                        <p class="text-danger" v-if="$v.correo.$error">Por favor ingrese un email</p>
                      </div>
                    </b-col>
                    <b-col cols="12" md="4">
                      <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Rut del Funcionario</label>
                        <input type="text" class="form-control" id="rutEdita" aria-describedby="emailHelp" v-model="$v.rut.$model">
                        <p class="text-danger" v-if="$v.rut.$error">Es necesario ingresar un rut</p>
                      </div>
                    </b-col>
                    <b-col cols="12" md="4">
                      <label for="exampleInputEmail1" class="form-label">Encargado de Dependencia</label>
                      <select class="form-control" v-model="encargadoEditar">
                        <option disabled value="">Tipo de funcionario</option>
                        <option value="1">Encargado</option>
                        <option value="0">Normal</option>
                      </select>
                    </b-col>
                </b-row>
                <br>
                <b-row>
                  <b-col cols="12" md="6">
                    <button type="submit" @click="editarFuncionario()" class="btn btn-success m-3 boton">Editar Funcionario</button>
                  </b-col>
                  <b-col cols="12" md="6">
                    <button type="submit" @click="Volver()" class="btn btn-primary boton">Volver al Listado</button>
                  </b-col>
                </b-row>
            </div>
          </div>
          <!-- Historial del funcionario -->
          <div class="row">
            <b-button @click="Volver()" class="botonAgregar" v-if="pestaña === 'historial'" style="border-color: black;">Volver al listado de Funcionarios</b-button>
          </div><br v-if="pestaña === 'historial'">
          <div class="row">
              <div class="table-responsive">
                  <table id='historialfuncionarios' class="table table-striped table-dark table-responsive-lg table-responsive-md" v-if="pestaña === 'historial'">
                    <thead>
                      <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Codigo Equipo</th>
                        <th scope="col">Tipo de Equipo</th>
                        <th scope="col">N° Serie</th>
                        <th scope="col">Modelo</th>
                        <th scope="col">Marca</th>
                        <th scope="col">Dependencia</th>
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
                        <td>{{i.nomJardin}}</td>
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
            </div>
          <!-- Equipos Actuales del funcionario -->  
          <div class=row>
            <b-button @click="Volver()" class="botonAgregar" v-if="pestaña === 'actuales'" style="border-color: black;">Volver al listado de Funcionarios</b-button>
          </div><br v-if="pestaña === 'actuales'">
          <div class="row">
                <table id='actualesfuncionarios' class="table table-striped table-dark table-responsive-lg table-responsive-md" v-if="pestaña === 'actuales'">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Codigo Equipo</th>
                      <th scope="col">Tipo de Equipo</th>
                      <th scope="col">N° Serie</th>
                      <th scope="col">Modelo</th>
                      <th scope="col">Marca</th>
                      <th scope="col">Dependencia</th>
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
                      <td>{{i.nomJardin}}</td>
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
import { required, email, minLength } from "vuelidate/lib/validators";
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
        funcionarios: [],
        dependencias: [],
        //Pestaña que indica la vista actual
        pestaña: 'funcionarios',
        //Variables para agregar un nuevo funcionario con v-model
        codigo: '',
        codigoFuncionarioAgregar: '',
        nomFuncionarioAgregar: '',
        correoAgregar: '',
        rutAgregar: '',
        dependenciaAgregar: '',
        encargadoAgregar: 1,
        codigoJardinAgregar: '',
        //Variables para editar un funcionario con v-model
        codigoEditar: '',
        codigoFuncionario: '',
        nomFuncionario: '',
        correo: '',
        rut: '',
        dependenciaEditar: '',
        codigoJardin: '',
        encargadoEditar: 1,
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
      codigoFuncionarioAgregar:{required},
      nomFuncionarioAgregar:{required, minLength: minLength(10)},
      correoAgregar:{required, email},
      rutAgregar:{required},
      codigoFuncionario:{required},
      nomFuncionario:{required, minLength: minLength(10)},
      correo:{required, email},
      rut:{required}
    },
    computed: {
      ...mapState(['token', 'usuarioDB'])
    },
    created(){
      //Iniciamos las funciones que se encargan de cargar los datos apenas se inicie la ruta
      this.listarFuncionarios();
      this.listarDependencias();
      this.verificar();
    },
    methods: {
      exportar(num) {
        let data = [];
        var filename = "planilla";
        if(num === 1){
          var arreglado = this.equiposAct.map( item => { 
            return { ID: item.codHistorial , CodigoEquipo : item.codEquipo, Tipo : item.tipoEquipo, Serie : item.serie, Modelo : item.modelo, Marca : item.nomMarca, Dependencia : item.nomJardin, Zona : item.zona}; 
          });
          data = XLSX.utils.json_to_sheet(arreglado);
          filename = 'Equipos del Usuario ' + this.codigoEditar
        }else if(num === 2){
          var arreglado = this.historial.map( item => { 
            return { ID: item.codHistorial , CodigoEquipo : item.codEquipo, Tipo : item.tipoEquipo, Serie : item.serie, Modelo : item.modelo, Marca : item.nomMarca, Dependencia : item.nomJardin, Desde : item.fechaInicio, Hasta : item.fecha, Zona : item.zona};
          });
          data = XLSX.utils.json_to_sheet(arreglado);
          filename = 'Historial del Usuario' + this.codigoEditar
        }else if(num === 3){
          var arreglado = this.funcionarios.map( item => { 
            return { Codigo: item.codigo , Nombre : item.nombre, CodigoFuncionario : item.codFuncionario, Rut : item.rut,  Correo : item.correo}; 
          });
          data = XLSX.utils.json_to_sheet(arreglado);
          filename = 'Funcionarios'
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
    //Función que obtiene los datos de los funcionarios y los enviar al arreglo que cargara la tabla
      listarFuncionarios(){
        let config = {
          headers: {
            token: this.token
          }
        }
        this.axios.get('api/funcionarios', config)
          .then(res => {
            this.funcionarios = res.data;
          })
          .catch(e => {
            this.alerta('danger', 'No se han podido cargar a los funcionarios');
          })
      },
      //Función que obtiene los datos de las dependencias
      listarDependencias(){
        let config = {
          headers: {
            token: this.token
          }
        }
        this.axios.get('api/dependenciasTabla', config)
          .then(res => {
            this.dependencias = res.data;
            this.dependenciaAgregar = res.data[0].nomJardin
            this.codigoJardinAgregar = res.data[0].codJardin
          })
          .catch(e => {
            this.alerta('danger', 'No se han podido cargar a las dependencias');
          })
      },
      //Muestra el historial de equipos del funcionario
      listarHistorial(){
        let config = {
          headers: {
            token: this.token
          }
        }
        this.axios.get(`api/Histfuncionario/${this.codigoEditar}`, config)
          .then(res => {
            this.historial = res.data;
          })
          .catch(e => {
            this.alerta('danger', 'No se ha logrado obtener el historial deseado');
          })
      },
      //Lista los datos de los equipos de los que un funcionario es dueño
      listarActuales(){
        let config = {
          headers: {
            token: this.token
          }
        }
        this.axios.get(`api/Actfuncionario/${this.codigoEditar}`, config)
          .then(res => {
            this.equiposAct = res.data;
          })
          .catch(e => {
            this.alerta('danger', 'No se ha logrado obtener los equipos que ocupa el funcionario');
          })
      },
      //Función que determina la vista de edición de funcionarios
      Acteditar(codigo){
        this.pestaña = 'editar'
        this.codigoEditar = codigo;
        $('#funcionarios').DataTable().destroy();
        $('#historialfuncionarios').DataTable().destroy();
        $("#actualesfuncionarios").DataTable().destroy();
        this.cargarFuncionario();
      },
      //Función que determina la vista del historial de un funcionario
      ActHistorial(codigo){
        $('#funcionarios').DataTable().destroy();
        $('#historialfuncionarios').DataTable()
        this.pestaña = 'historial'
        this.codigoEditar = codigo;
        this.listarHistorial();
      },
      //Función que determina la vista de los equipos actuales de un funcionario
      EquiposActuales(codigo){
        $('#funcionarios').DataTable().destroy();
        $('#actualesfuncionarios').DataTable()
        this.pestaña = 'actuales'
        this.codigoEditar = codigo;
        this.listarActuales();
      },
      //Función que determina la vista de agregar
      agregar(){
        $('#funcionarios').DataTable().destroy();
        $('#historialfuncionarios').DataTable().destroy();
        $("#actualesfuncionarios").DataTable().destroy();
        this.pestaña = 'agregar'
      }, //Funciones de la vista agregar
      agregarFuncionario(){
        let config = {
          headers: {
            token: this.token
          }
        }
        const index = this.dependencias.findIndex(item => item.nomJardin == this.dependenciaAgregar);
        var codJardinAct = this.dependencias[index].codJardin
        this.$v.$touch()
        if(!this.$v.codigo.$invalid && !this.$v.codigoFuncionarioAgregar.$invalid && !this.$v.nomFuncionarioAgregar.$invalid && !this.$v.correoAgregar.$invalid && !this.$v.rutAgregar.$invalid){
          this.axios.post('api/agregaFuncionario', {codigo: this.codigo, nombre: this.nomFuncionarioAgregar, codFuncionario: this.codigoFuncionarioAgregar, correo: this.correoAgregar, rut: this.rutAgregar, codJardin: codJardinAct, encargado: this.encargadoAgregar}, config)
            .then(res => {
              if(res.data.sqlMessage){
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'No se ha podido crear al funcionario ' + this.nomFuncionarioAgregar,
                  footer: 'Ya existe un funcionario con un dato repetido, revise la lista de funcionarios'
                })
              }else{
              Swal.fire(
                'Se ha creado un nuevo Funcionario, ' + this.nomFuncionarioAgregar + ' se agrego al sistema!',
                'Seleccione Ok para continuar',
                'success'
              )}
              //location.reload();
            })
            .catch(e => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se ha podido crear al funcionario ' + this.nomFuncionarioAgregar,
                footer: 'Posible error del sistema'
              })
          })
        }else if(!this.$v.correoAgregar.$invalid){
          this.alerta('danger', 'Porfavor ingrese todos los datos requeridos');
        }else{
          this.alerta('danger', 'Ingrese un correo valido');
        }
      },
      //Se reinicia la ruta para regresar a la pantalla Principal
      Volver(){
        $("#historialfuncionarios").DataTable().destroy();
        $("#actualesfuncionarios").DataTable().destroy();
        this.pestaña = 'funcionarios'
        this.listarFuncionarios();
      }, 
      cambiaJardin(){
        const index = this.dependencias.findIndex(item => item.nomJardin == this.dependenciaAgregar);
        this.codigoJardinAgregar = this.dependencias[index].codJardin
      },
      cambiaJardinEditar(){
        const index = this.dependencias.findIndex(item => item.nomJardin == this.dependenciaEditar);
        this.codigoJardin = this.dependencias[index].codJardin
      },
      //Carga los datos de un funcionario que se va a editar
      cargarFuncionario(){
        let config = {
          headers: {
            token: this.token
          }
        }
        this.axios.get(`api/funcionario/${this.codigoEditar}`, config)
          .then(res => {
            this.codigoFuncionario = res.data[0].codFuncionario;
            this.nomFuncionario = res.data[0].nombre;
            this.correo = res.data[0].correo;
            this.rut = res.data[0].rut;
            this.encargadoEditar = res.data[0].encargado
            const index = this.dependencias.findIndex(item => item.codJardin == res.data[0].codJardin);
            this.dependenciaEditar = this.dependencias[index].nomJardin
            this.codigoJardin = res.data[0].codJardin
          })
          .catch(e => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No se ha podido ingresar a los datos de este funcionario',
              footer: 'Posible error del sistema'
            })
            this.pestaña = 'funcionario';
          })
      },
      //Función que permite editar a un funcionario
      editarFuncionario(){
        let config = {
          headers: {
            token: this.token
          }
        }
        this.$v.$touch()
        if(!this.$v.codigoFuncionario.$invalid && !this.$v.nomFuncionario.$invalid && !this.$v.correo.$invalid && !this.$v.rut.$invalid){
          const index = this.dependencias.findIndex(item => item.nomJardin == this.dependenciaEditar);
          var codJardinAct = this.dependencias[index].codJardin
          this.axios.put(`api/actualizaFuncionario/${this.codigoEditar}`, {codigo: this.codigo, nombre: this.nomFuncionario, codFuncionario: this.codigoFuncionario, correo: this.correo, rut: this.rut, codJardin: codJardinAct, encargado: this.encargadoEditar}, config)
            .then(res => {
              if(res.data.sqlMessage){
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'No se ha podido actualizar al funcionario ' + this.nomFuncionario,
                  footer: 'Ya existe un funcionario con este codigo o correo o rut, revise la lista de funcionarios'
                })
              }else{
              Swal.fire(
                'Se registraron los cambios del Funcionario, ' + this.nomFuncionario + ' actualización Realizada!',
                'Seleccione Ok para continuar',
                'success'
              )}
              //location.reload();
            })
            .catch(e => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se ha podido actualizar al funcionario ' + this.nomFuncionario,
                footer: 'Posible error del sistema'
              })
            })
        }else if(!this.$v.correo.$invalid){
          this.alerta('danger', 'Porfavor ingrese todos los datos requeridos');
        }else{
          this.alerta('danger', 'Ingrese un correo valido');
        }
      },
      convertDateMysql(yourDate){
        yourDate.toISOString().split('T')[0]
        const offset = yourDate.getTimezoneOffset()
        yourDate = new Date(yourDate.getTime() - (offset*60*1000))
        return yourDate.toISOString().split('T')[0]
		  },
      //Funcion que quita un equipo a un funcionario
      quitar(id, estado){
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
                  'Se ha quitado un equipo al funcionario!',
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
                  text: 'No se ha podido quitar el equipo a su funcionario',
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
    //Se cargan las tablas como Datatables del Jquery
    mounted(){
      $('#funcionarios').DataTable();
      $('#historialfuncionarios').DataTable();
      $("#actualesfuncionarios").DataTable()
    },
    watch: {
      funcionarios(val) {
        if(this.pestaña === 'funcionarios'){
          $('#funcionarios').DataTable().destroy();
          this.$nextTick(()=> {
            $('#funcionarios').DataTable()
          });
        }
      },
      historial(val) {
        if(this.pestaña === 'historial'){
          $('#historialfuncionarios').DataTable().destroy();
          this.$nextTick(()=> {
            $('#historialfuncionarios').DataTable()
          });
        }
      },
      equiposAct(val) {
        if(this.pestaña === 'actuales'){
          $('#actualesfuncionarios').DataTable().destroy();
          this.$nextTick(()=> {
            $('#actualesfuncionarios').DataTable()
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