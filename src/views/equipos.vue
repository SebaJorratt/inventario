<template>
  <div class="about">
    <navbar />
    <b-container>
        <div class="menu">
            <h1 v-if="pestaña !== 'editar'">Listado de Equipos</h1>
            <h1 v-if="pestaña == 'editar'">Editar Equipo</h1>
            <br>
            <b-row v-if="pestaña !== 'editar'">
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
            <table class="table table-striped table-dark table-responsive-lg table-responsive-md" v-if="pestaña === 'equiposact'">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">N° Serie</th>
                  <th scope="col">Codigo</th>
                  <th scope="col">Jardin</th>
                  <th scope="col">Codigo Jardin</th>
                  <th scope="col">Encargado</th>
                  <th scope="col">Dueño</th>
                  <th scope="col">Zona</th>
                  <th scope="col">Mostrar Equipo</th>
                  <th scope="col">Quitar Equipo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td scope="row">January</td>
                  <td>$100</td>
                  <td>$100</td>
                  <td>January</td>
                  <td>January</td>
                  <td>January</td>
                  <td>January</td>
                  <td>January</td>
                  <td>January</td>
                  <td>
                    <b-button @click="Acteditar()" class="btn-warning btn-sm">Mostrar Mas</b-button>
                  </td>
                  <td>
                    <b-button @click="quitar()" class="btn-danger btn-sm">Quitar</b-button>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- Tabla de equipos sin dueños que estan en buen estado -->
            <table class="table table-striped table-dark table-responsive-lg table-responsive-md" v-if="pestaña === 'equiposNoAct'">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">N° Serie</th>
                  <th scope="col">Codigo</th>
                  <th scope="col">Jardin</th>
                  <th scope="col">Codigo Jardin</th>
                  <th scope="col">Encargado</th>
                  <th scope="col">Dueño</th>
                  <th scope="col">Zona</th>
                  <th scope="col">Mostrar Equipo</th>
                  <th scope="col">Quitar Equipo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td scope="row">January</td>
                  <td>asdasd</td>
                  <td>$10asd0</td>
                  <td>January</td>
                  <td>January</td>
                  <td>January</td>
                  <td>January</td>
                  <td>January</td>
                  <td>January</td>
                  <td>
                    <b-button @click="Acteditar()" class="btn-warning btn-sm">Mostrar Mas</b-button>
                  </td>
                  <td>
                    <b-button @click="quitar()" class="btn-danger btn-sm">Quitar</b-button>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- Tabla de equipos sin dueños que estan en MAL estado -->
            <table class="table table-striped table-dark table-responsive-lg table-responsive-md" v-if="pestaña === 'equiposBaja'">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">N° Serie</th>
                  <th scope="col">Codigo</th>
                  <th scope="col">Jardin</th>
                  <th scope="col">Codigo Jardin</th>
                  <th scope="col">Encargado</th>
                  <th scope="col">Dueño</th>
                  <th scope="col">Zona</th>
                  <th scope="col">Mostrar Equipo</th>
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
                  <td>January</td>
                  <td>
                    <b-button @click="Acteditar()" class="btn-warning btn-sm">Mostrar Mas</b-button>
                  </td>
                  <td>
                    <b-button @click="quitar()" class="btn-danger btn-sm">Quitar</b-button>
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
                      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                    </div>
                  </b-col>
                  <b-col cols="12" md="4">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Modelo equipo</label>
                      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                    </div>
                  </b-col>
                  <b-col cols="12" md="4">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Tipo de equipo</label>
                      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                    </div>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">N° Serie Equipo</label>
                      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                    </div>
                  </b-col>
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Modelo equipo</label>
                      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                    </div>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Estado de Equipo</label>
                      <select v-model="selected" class="form-control">
                        <option disabled value="">Seleccione un estado posible</option>
                        <option>Bueno</option>
                        <option>Regular</option>
                        <option>Malo</option>
                        <option>Baja</option>
                      </select>
                    </div>
                  </b-col>
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Condicion Equipo</label>
                      <textarea type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></textarea>
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
        </div>
    </b-container>
  </div>
</template>

<script>
import navbar from "../components/navbar.vue";
export default {
  name: "about",
  components: {
    navbar,
  },
  data() {
      return {
        equiposAct: [],
        equiposBuenEstado: [],
        equiposMalEstado: [],
        pestaña: 'equiposact',
        selected: ''
      }
    },
    created(){

    },
    methods: {
      Acteditar(){
        this.pestaña = 'editar'
      },
      quitar(){
        console.log("holaxd")
      },
      MostrarEquiposAct(){
        this.pestaña = 'equiposact'
      },
      EquiposBuenEstado(){
        this.pestaña = 'equiposNoAct'
      },
      EquiposMalEstado(){
        this.pestaña = 'equiposBaja'
      },
      EditarEquipo(){
        console.log("holaxd")
      },
      Volver(){
        this.pestaña = 'equiposact'
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

  .botonmostrar{
    margin: 20px;
  }
</style>