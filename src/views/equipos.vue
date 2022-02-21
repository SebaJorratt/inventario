<template>
  <div class="about">
    <navbar />
    <b-container>
        <div class="menu">
          <h1 v-if="pestaña == 'editar'">Editar Equipo</h1>
          <h1 v-else-if="pestaña == 'enviar'">Asignar Equipo</h1>
          <h1 v-else-if="pestaña == 'equiposact'">Listado de Equipos con Usuario</h1>
          <h1 v-else-if="pestaña == 'equiposNoAct'">Listado de Equipos sin Usuario</h1>
          <h1 v-else-if="pestaña == 'equiposBaja'">Listado de Equipos Dados de Baja</h1>
          <h1 v-else-if="pestaña == 'historial'">Historial del Equipo</h1>
          <h1 v-else-if="pestaña == 'word'">Exportar a Documanto Word</h1>
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
                <div class="mb-1">
                  <b-button @click="MostrarEquiposAct()" class="btn-success boton">Equipos con Usuario</b-button>
                </div>
              </b-col>
              <b-col cols="12" md="4">
                <div class="mb-1">
                  <b-button @click="EquiposBuenEstado()" class="btn-warning boton">Equipos sin Usuario</b-button>
                </div>
              </b-col>
              <b-col cols="12" md="4">
                <div class="mb-1">
                  <b-button @click="EquiposMalEstado()" class="btn-danger boton">Equipos dados de Baja</b-button>
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
                  <th scope="col">Usuario</th>
                  <th scope="col">Zona</th>
                  <th scope="col">Fecha Asignación</th>
                  <th scope="col">Mostrar Equipo</th>
                  <th scope="col">Historial</th>
                  <th scope="col" v-if="activo">Quitar Equipo</th>
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
                  <td>{{i.nombre}}</td>
                  <td>{{i.zona}}</td>
                  <td>{{i.fechaInicio}}</td>
                  <td>
                    <b-button @click="Acteditar(i.codHistorial, true)" class="btn-warning btn-sm" style="border-color: white;">Mostrar Mas</b-button>
                  </td>
                  <td>
                    <b-button @click="ActHistorial(i.codHistorial, true)" class="btn-sm" style="border-color: white;">Historial</b-button>
                  </td>
                  <td v-if="activo">
                    <b-button @click="quitar(i.codHistorial, i.estado)" class="btn-danger btn-sm" style="border-color: white;">Quitar</b-button>
                  </td>
                </tr>
              </tbody>
            </table>
            <br v-if="pestaña === 'equiposact'"><div class="mb-1">
              <b-button @click="exportar(1)" v-if="pestaña === 'equiposact'" class="btn-success boton">Exportar</b-button>
            </div>
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
                  <th scope="col">Historial</th>
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
                    <b-button @click="Enviar(i.corrEquipo)" class="btn-success btn-sm" style="border-color: white;">Asignar Equipo</b-button>
                  </td>
                  <td>
                    <b-button @click="ActHistorial(i.corrEquipo, false)" class="btn-sm" style="border-color: white;">Historial</b-button>
                  </td>
                  <td>
                    <b-button @click="Acteditar(i.corrEquipo, false)" class="btn-warning btn-sm" style="border-color: white;">Mostrar Mas</b-button>
                  </td>
                </tr>
              </tbody>
            </table>
            <br v-if="pestaña === 'equiposNoAct'"><div class="mb-1">
              <b-button @click="exportar(2)" v-if="pestaña === 'equiposNoAct'" class="btn-success boton">Exportar</b-button>
            </div>
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
                  <th scope="col">Historial</th>
                  <th scope="col">Exportar</th>
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
                    <b-button @click="Acteditar(i.corrEquipo, false)" class="btn-warning btn-sm" style="border-color: white;">Mostrar Mas</b-button>
                  </td>
                  <td>
                    <b-button @click="ActHistorial(i.corrEquipo, false)" class="btn-sm" style="border-color: white;">Historial</b-button>
                  </td>
                  <td>
                    <b-button @click="Export2Doc('exportContent', 'Informe' + i.codEquipo)" class="btn-success btn-sm" style="border-color: white;">Exportar</b-button>
                  </td>
                </tr>
              </tbody>
            </table>
            <br v-if="pestaña === 'equiposBaja'"><div class="mb-1">
              <b-button @click="exportar(3)" v-if="pestaña === 'equiposBaja'" class="btn-success boton">Exportar</b-button>
            </div>
            <!-- Editar un Equipo -->
              <div class="card" v-if="pestaña === 'editar'" style="border-color: black;">
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
                      <input type="text" class="form-control" id="serieEdita" aria-describedby="emailHelp" v-model="$v.serie.$model">
                      <p class="text-danger" v-if="$v.serie.$error">Es necesario ingresar un número de serie</p>
                    </div>
                  </b-col>
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Marca equipo</label>
                      <label @click="CambioTipo()" for="exampleInputEmail1" v-if="tipoMostrar === 'si'" style="color: #35ACF1;" class="form-label">&nbsp; (Crear Nueva Marca?)</label>
                      <label @click="CambioTipo()" for="exampleInputEmail1" v-if="tipoMostrar === 'no'" style="color: #35ACF1;" class="form-label">&nbsp; (Revisar ya existentes)</label>
                      <select class="form-control" v-model="$v.marca.$model"  v-if="tipoMostrar === 'si'">
                        <option v-for="i in marcas" :key="i.nomMarca">{{i.nomMarca}}</option>
                      </select>
                      <input type="text" class="form-control" id="marcanewEdita" aria-describedby="emailHelp" v-if="tipoMostrar === 'no'" v-model="$v.marcaNew.$model">
                      <div v-if="tipoMostrar === 'no'">
                        <p class="text-danger" v-if="$v.marcaNew.$error" >Es necesario ingresar el nombre de la marca</p>
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
                <b-row v-if="tipoMostrar === 'si'">
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <b-button @click="EditarEquipo()" class="btn-success botonmostrar boton">Editar Equipo</b-button>
                    </div>
                  </b-col>  
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <b-button @click="Volver()" class="botonmostrar boton">Volver</b-button>
                    </div>
                  </b-col>  
                </b-row>
                <b-row v-if="tipoMostrar === 'no'">
                  <b-col cols="12" md="4">
                    <div class="mb-3">
                      <b-button @click="agregaTipo()" class="btn-success botonmostrar boton">Agregar Tipo</b-button>
                    </div>
                  </b-col>
                  <b-col cols="12" md="4">
                    <div class="mb-3">
                      <b-button @click="agregaMarca()" class="btn-success botonmostrar boton">Agregar Marca</b-button>
                    </div>
                  </b-col>
                  <b-col cols="12" md="4">
                    <div class="mb-3">
                      <b-button @click="Volver()" class="botonmostrar boton">Volver</b-button>
                    </div>
                  </b-col>  
                </b-row>
              </div>
            </div>
            <!-- Enviar un Equipo -->
            <div class="card" v-if="pestaña === 'enviar'" style="border-color: black;">
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
                      <b-button @click="Volver()" href="#" class="botonmostrar boton">Volver al listado</b-button>
                    </div>
                  </b-col>  
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <b-button @click="EnviarEquipo()" class="btn-success botonmostrar boton">Enviar Equipo</b-button>
                    </div>
                  </b-col>  
                </b-row>
              </div>
            </div>
            <!-- Historial de un Equipo -->
            <div class="row">
              <b-button @click="Volver()" class="botonAgregar" v-if="pestaña === 'historial'" style="border-color: black;">Volver al listado de Equipos</b-button>
            </div>  <br v-if="pestaña === 'historial'">
            <div class="row">
                <table class="table table-striped table-dark table-responsive-lg table-responsive-md" id="historialEquipo" v-if="pestaña === 'historial'">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Codigo Equipo</th>
                      <th scope="col">Zona</th>
                      <th scope="col">Jardin</th>
                      <th scope="col">Usuario</th>
                      <th scope="col">Desde</th>
                      <th scope="col">Hasta</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="i in historial" :key="i.codHistorial">
                      <td scope="row">{{i.codHistorial}}</td>
                      <td>{{i.codEquipo}}</td>
                      <td>{{i.zona}}</td>
                      <td>{{i.nomJardin}}</td>
                      <td>{{i.nombre}}</td>
                      <td>{{i.fechaInicio}}</td>
                      <td>{{i.fecha}}</td>
                    </tr>
                  </tbody>
                </table>
                <br><div class="mb-1">
                  <b-button @click="exportar(4)" v-if="pestaña === 'historial'" class="btn-success boton">Exportar</b-button>
                </div>
            </div>
            <!-- Vista de Exportación -->
            <div class="card" style="border-color: black;" v-if="pestaña === 'word'">
                <div class="card-body">
                 <b-row>
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Tipo del equipo</label>
                      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="$v.tipoExportar.$model">
                      <p class="text-danger" v-if="$v.tipoExportar.$error" >Es necesario ingresar el tipo del equipo</p>
                    </div>
                  </b-col>
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Clasificación</label>
                      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="$v.clasificacionExportar.$model">
                      <p class="text-danger" v-if="$v.clasificacionExportar.$error" >Es necesario ingresar la clasificación del equipo</p>
                    </div>
                  </b-col>
                 </b-row>
                 <b-row>
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Ubicación del Equipo</label>
                      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="$v.ubicacionExportar.$model">
                      <p class="text-danger" v-if="$v.ubicacionExportar.$error" >Es necesario ingresar la ubicación del equipo</p>
                    </div>
                  </b-col>
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Encargado del Informe</label>
                      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="$v.duenoExportar.$model">
                      <p class="text-danger" v-if="$v.duenoExportar.$error" >Es necesario ingresar al usuario del equipo</p>
                    </div>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="12" md="12">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Introducción</label>
                      <textarea type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="$v.Introduccion.$model"></textarea>
                      <p class="text-danger" v-if="$v.Introduccion.$error" >Es necesario ingresar una introduccion de mínimo 500 caracteres</p>
                    </div>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="12" md="12">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Objetivo</label>
                      <textarea type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="$v.objetivo.$model"></textarea>
                      <p class="text-danger" v-if="$v.objetivo.$error" >Es necesario ingresar una introduccion de mínimo 500 caracteres</p>
                    </div>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="12" md="12">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Deficiencias generales observadas</label>
                      <textarea type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="$v.deficiencias.$model"></textarea>
                      <p class="text-danger" v-if="$v.deficiencias.$error" >Es necesario ingresar una introduccion de mínimo 500 caracteres</p>
                    </div>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Usuario del Equipo</label>
                      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="$v.Usuario.$model">
                      <p class="text-danger" v-if="$v.Usuario.$error" >Es necesario indicar al usuario</p>
                    </div>
                  </b-col>
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Dirección del Usuario</label>
                      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="$v.Direccion.$model">
                      <p class="text-danger" v-if="$v.Direccion.$error">Es necesario indicar la dirección del usuario</p>
                    </div>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <b-button @click="Volver()" href="#" class="botonmostrar boton">Volver al listado</b-button>
                    </div>
                  </b-col>  
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <b-button @click="Exportar()" class="btn-success botonmostrar boton">Generar Informe</b-button>
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

import { required, minLength} from "vuelidate/lib/validators";
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
        corrEquipos: [],
        equiposBuenEstado: [],
        equiposMalEstado: [],
        historial: [],
        //Pestaña que indica la vista actual
        pestaña: 'equiposact',
        tipoMostrar: 'si',
        botones: 'si',
        selected: '',
        //Datos de editar
        corr: '',
        codigo: '',
        modelo: '',
        tipo: '',
        tipos: [],
        tipoNew: '',
        serie: '',
        marca: '',
        marcaNew: '',
        marcas: [],
        estado: '',
        condicion: '',
        numero: '',
        zona: '',
        nombre: '',
        //Arreglo para añadir los datos a los select
        nombres: [],
        dueño: '',
        dueños: [],
        //Variables de las alertas
        dismissSecs: 5,
        dismissCountDown: 0,
        mensaje: {color: '', texto: ''},
        activo: true,
        //VARIABLES DE EXPORTACION
        tipoExportar: '',
        clasificacionExportar: '',
        ubicacionExportar: '',
        duenoExportar: '',
        Introduccion: '',
        objetivo: '',
        deficiencias: '',
        Usuario: '',
        Direccion: ''
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
      condicion:{required},
      numero:{required},
      zona:{required},
      nombre:{required},
      dueño:{required},
      tipoExportar: {required},
      clasificacionExportar: {required},
      ubicacionExportar: {required},
      duenoExportar: {required},
      Introduccion: {required, minLength: minLength(500)},
      objetivo: {required, minLength: minLength(500)},
      deficiencias: {required, minLength: minLength(500)},
      Usuario: {required},
      Direccion: {required},
    },
    computed: {
      ...mapState(['token', 'usuarioDB'])
    },
    created(){
      //Iniciamos las funciones que se encargan de cargar los datos apenas se inicie la ruta
      this.listarEquiposAct();
      this.nombresJardin();
      this.listarDueños();
      this.obtenerTipos();
      this.obtenerMarcas();
      this.verificar();
    },
    methods: {
      exportar(num) {
        let data = [];
        var filename = "planilla";
        if(num === 1){
          var arreglado = this.equiposAct.map( item => { 
            return { ID: item.codHistorial , Tipo : item.tipoEquipo, Serie : item.serie, Estado : item.estado, CodigoEquipo : item.codEquipo,  Dependencia : item.nomJardin, CodigoDependencia : item.codJardin, Usuario : item.nombre, Zona : item.zona}; 
          });
          data = XLSX.utils.json_to_sheet(arreglado);
          filename = 'Equipos con Usuario'
        }else if(num === 2){
          var arreglado = this.equiposBuenEstado.map( item => { 
            return { ID: item.corrEquipo , Tipo : item.tipoEquipo, Serie : item.serie, CodigoEquipo : item.codEquipo,  Marca : item.nomMarca, Modelo : item.modelo}; 
          });
          data = XLSX.utils.json_to_sheet(arreglado);
          filename = 'Equipos sin Usuario'
        }else if(num === 3){
          var arreglado = this.equiposMalEstado.map( item => { 
            return { ID: item.corrEquipo , Tipo : item.tipoEquipo, Serie : item.serie, CodigoEquipo : item.codEquipo,  Marca : item.nomMarca, Modelo : item.modelo}; 
          });
          data = XLSX.utils.json_to_sheet(arreglado);
          filename = 'Equipos dados de Baja'
        }else if(num === 4){
          var arreglado = this.historial.map( item => { 
            return { ID: item.codHistorial , Codigo : item.codEquipo, Zona : item.zona, Dependencia : item.nomJardin,  Usuario : item.nombre, Desde : item.fechaInicio, Hasta : item.fecha}; 
          });
          data = XLSX.utils.json_to_sheet(arreglado);
          if(arreglado[0]){
            filename = 'Historial Equipo ' + arreglado[0].Codigo
          }else{
            filename = 'Historial Equipo'
          }
        }
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, data, filename);
        XLSX.writeFile(workbook, `${filename}.xlsx`);
      },
      alerta(color, texto){
        this.mensaje.color = color;
        this.mensaje.texto = texto;
        this.showAlert();
      },
      verificar(){
        if(this.usuarioDB.data[0].tipoUsuario == 0){
          this.activo = false;
        }
      },
      //Activamos la vista de editar
      Acteditar(id, activo){
        this.pestaña = 'editar'
        this.botones = 'no'
        $('#tablaSinDueño').DataTable().destroy();
        $('#tablaBajas').DataTable().destroy();
        $('#tablaConDueño').DataTable().destroy();
        //Obtenemos el correlativo del equipo, si estamos en la vista de Equipos con dueño (activo=true) tendremos que buscarlo en el arreglo paralelo por la posición
        if(activo){
          const index = this.equiposAct.findIndex(item => item.codHistorial == id);
          var corrEqp = this.corrEquipos[index]
        }else{
          var corrEqp = id;
        }
        //Llamamos a la función que nos permite cargar los datos del equipo a editar
        this.obtenerEqpEditar(corrEqp)
      },
      //Activamos la vista de historial
      ActHistorial(id, activo){
        this.pestaña = 'historial'
        this.botones = 'no'
        $('#tablaSinDueño').DataTable().destroy();
        $('#tablaBajas').DataTable().destroy();
        $('#tablaConDueño').DataTable().destroy();
        $("#historialEquipo").DataTable()
        //Obtenemos el correlativo del equipo, si estamos en la vista de Equipos con dueño (activo=true) tendremos que buscarlo en el arreglo paralelo por la posición
        if(activo){
          const index = this.equiposAct.findIndex(item => item.codHistorial == id);
          this.corr = this.corrEquipos[index]
        }else{
          this.corr = id;
        }
        //Llamamos a la función que nos permite cargar los datos del equipo a editar
        this.obtHistorial()
      },

      //Función que permite cargar el historial de un equipo
      obtHistorial(){
        let config = {
          headers: {
            token: this.token
          }
        }
        this.axios.get(`api/HistEquipo/${this.corr}`, config)
          .then(res => {
            this.historial = res.data;
          })
          .catch(e => {
            this.alerta('danger', 'No se ha podido cargar el historial');
        })
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
          })
          .catch(e => {
            this.alerta('danger', 'No se han podido cargar las marcas');
        })
      },
      //Funcion que obtiene los datos del equipo a editar
      obtenerEqpEditar(id){
        let config = {
          headers: {
            token: this.token
          }
        }
        this.axios.get(`api/datosEqp/${id}`, config)
          .then(res => {
            this.corr = res.data[0].corrEquipo;
            this.codigo = res.data[0].codEquipo;
            this.modelo = res.data[0].modelo;
            this.tipo = res.data[0].tipoEquipo;
            this.serie = res.data[0].serie;
            this.marca = res.data[0].nomMarca;
            this.estado = res.data[0].estado;
            this.condicion = res.data[0].condicion;
          })
          .catch(e => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No se ha podido ingresar a los datos de este equipo',
              footer: 'Posible error del sistema'
            })
            this.botones = 'si';
            this.pestaña = 'equiposact';
          })
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
                this.corrEquipos.splice(index, 1)
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
        });
      },
      //Muestra la vista de los equipos con un dueño actual
      MostrarEquiposAct(){
        $('#tablaSinDueño').DataTable().destroy();
        $('#tablaBajas').DataTable().destroy();
        $('#tablaConDueño').DataTable();
        this.pestaña = 'equiposact'
        this.listarEquiposAct();
      },
      //Ingresa los datos al arreglo que utilizara la tabla de Equipo con dueños
      listarEquiposAct(){
        let config = {
          headers: {
            token: this.token
          }
        }
        this.axios.get('api/equiposConDueno', config)
          .then(res => {
            this.equiposAct = res.data;
            this.llenarCorrelativos();
          })
          .catch(e => {
            this.alerta('danger', 'No se han podido cargar los equipos con Dueño');
          })
      },
      //Llena el arreglo paralelo de correlativos de Equipos con dueño
      llenarCorrelativos(){
        for(var i = 0; i<this.equiposAct.length; i++){
          this.corrEquipos.push(this.equiposAct[i].corrEquipo)
        }
      },
      //Define la vista de Equipos sin un dueño actual
      EquiposBuenEstado(){
        $('#tablaConDueño').DataTable().destroy();
        $('#tablaBajas').DataTable().destroy();
        $('#tablaSinDueño').DataTable();
        this.pestaña = 'equiposNoAct'
        this.listarEquiposBuenEstado();
      },
      //Ingresa los datos al arreglo que utilizara la tabla de Equipo sin dueños
      listarEquiposBuenEstado(){
        let config = {
          headers: {
            token: this.token
          }
        }
         this.axios.get('api/equiposSinDueno', config)
          .then(res => {
            this.equiposBuenEstado = res.data;
          })
          .catch(e => {
            this.alerta('danger', 'No se han podido cargar los equipos sin Dueño');
          })
      },
      //Define la vista de Equipos dados de baja
      EquiposMalEstado(){
        $('#tablaConDueño').DataTable().destroy();
        $('#tablaSinDueño').DataTable().destroy();
        $('#tablaBajas').DataTable()
        this.pestaña = 'equiposBaja'
        this.listarEquiposMalEstado();
      },
      //Ingresa los datos al arreglo que utilizara la tabla de Equipo dados de baja
      listarEquiposMalEstado(){
        let config = {
          headers: {
            token: this.token
          }
        }
        this.axios.get('api/equiposBaja', config)
          .then(res => {
            this.equiposMalEstado = res.data;
          })
          .catch(e => {
            this.alerta('danger', 'No se han podido cargar los equipos dados de baja');
        })
      },
      //Función que agrega un nuevo Tipo y retorna true o false
      agregaTipo(){
        let config = {
          headers: {
            token: this.token
          }
        }
        this.$v.$touch()
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
                text: 'No se ha creado este nuevo tipo',
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
        this.$v.$touch()
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
      //Función que permite editar un equipo algunos datos son requeridos se usa Vualidate ($v.) para verificar si cumplen las condiciones
      EditarEquipo(){
        let config = {
          headers: {
            token: this.token
          }
        }
        this.$v.$touch()
        if(!this.$v.codigo.$invalid && !this.$v.modelo.$invalid && !this.$v.serie.$invalid && !this.$v.condicion.$invalid){
          this.axios.put(`api/actualizaEquipo/${this.corr}`, {codEquipo: this.codigo, modelo: this.modelo, serie: this.serie, estado: this.estado, condicion: this.condicion, tipoEquipo: this.tipo, nomMarca: this.marca}, config)
            .then(res => {
              if(!res.data.sqlMessage){
                Swal.fire(
                  'Se ha editado al equipo satisfactoriamente',
                  'Seleccione Ok para continuar',
                  'success'
                )
              }else{
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'No se ha actualizado el equipo',
                  footer: 'Dato repetido asegurese de que el codigo o n° de serie no existan'
                })
              }
            })
            .catch(e => {
              this.alerta('danger', 'No se ha logrado editar al equipo');
          })
        }else{
          this.alerta('danger', 'Porfavor ingrese todos los datos requeridos');
        }
      },
      //Se reinicia la ruta para regresar a la pantalla Principal
      Volver(){
        $('#historialEquipo').DataTable().destroy();
        this.pestaña = 'equiposact'
        this.botones = 'si'
        this.listarEquiposAct();
      },
      //Determina la vista para enviar un equipo a un nuevo dueño, recibe la id del equipo en cuestion
      Enviar(id){
        this.pestaña = 'enviar'
        this.botones = 'no'
        this.numero = id
        $('#tablaSinDueño').DataTable().destroy();
        $('#tablaBajas').DataTable().destroy();
        $('#tablaConDueño').DataTable().destroy();
      },
      //Carga todos los jardines de la base de datos
      nombresJardin(){
        let config = {
          headers: {
            token: this.token
          }
        }
        this.axios.get('api/dependencias', config)
          .then(res => {
            this.nombres = res.data;
            this.nombre = res.data[0].nomJardin
          })
          .catch(e => {
            this.alerta('danger', 'No se han podido cargar los nombres de los jardines');
        })
      },
      //Carga todos los funcionarios de la base de datos
      listarDueños(){
        let config = {
          headers: {
            token: this.token
          }
        }
        this.axios.get('api/funcionarios', config)
          .then(res => {
            this.dueños = res.data;
            this.dueño = res.data[0].nombre
          })
          .catch(e => {
            this.alerta('danger', 'No se han podido cargar los nombres de los Funcionarios');
        })
      },
      //Función que envia un equipo con un nuevo dueño
      EnviarEquipo(){
        var dt = this.convertDateMysql(new Date())
        swal.fire({
            title: '¿Seguro que desea asignar este equipo al usuario ' + this.dueño + '?',
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
            this.axios.post('api/agregaHistorial', {zona: this.zona, nombre: this.dueño, nomJardin: this.nombre, corrEquipo: this.numero, fechaInicio: dt}, config)
              .then(res => {
                Swal.fire(
                  'Se ha asignado un equipo al funcionario ' + this.dueño +'!',
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
            }
          })
      },
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
      },
      //Funcion que cambiara entre un tipo existente y uno nuevo
      CambioTipo(){
        if(this.tipoMostrar === 'no'){
          this.tipoMostrar = 'si'
        }else{
          this.tipoMostrar = 'no'
        }
      },
      Export2Doc(){
        this.pestaña = 'word'
        this.botones = 'no'
        $('#tablaSinDueño').DataTable().destroy();
        $('#tablaBajas').DataTable().destroy();
        $('#tablaConDueño').DataTable().destroy();
      }
    },
    //Prepara las tablas como Datatables de JQuery
    async mounted(){
      await $('#tablaConDueño').DataTable()
      await $('#tablaSinDueño').DataTable();
      await $("#tablaBajas").DataTable()
      await $("#historialEquipo").DataTable()
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
      historial(val) {
        if(this.pestaña === 'historial'){
          $('#historialEquipo').DataTable().destroy();
          this.$nextTick(()=> {
            $('#historialEquipo').DataTable()
          });
        }
      }
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