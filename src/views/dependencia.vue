<template>
  <div class="about">
    <navbar />
    <b-container>
        <div class="menu">
            <h1 v-if="pestaña === 'dependencias'">Listado de Dependencias</h1>
            <h1 v-if="pestaña === 'agregar'">Agrega una Dependencia</h1>
            <h1 v-if="pestaña === 'historial'">Historial de la Dependencia</h1>
            <h1 v-if="pestaña === 'actuales'">Equipos actuales de la Dependencia</h1>
            <br>
            <!-- Boton para ir a agregar un Funcionario -->
            <div class="row">
              <b-button @click="agregar()" class="btn-success botonAgregar" v-if="pestaña === 'dependencias'">Agregar Dependencia</b-button>
            </div>
            <!-- Listado de Funcionarios -->
            <div class="row">
                <table class="table table-striped table-dark table-responsive-lg table-responsive-md" v-if="pestaña === 'dependencias'">
                  <thead>
                    <tr>
                      <th scope="col">Codigo Jardin</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Region</th>
                      <th scope="col">Comuna</th>
                      <th scope="col">Providencia</th>
                      <th scope="col">Editar</th>
                      <th scope="col">Historial</th>
                      <th scope="col">Equipos Actuales</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td scope="row">January</td>
                      <td>1324343324</td>
                      <td>$10asd0</td>
                      <td>January</td>
                      <td>January</td>
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
          <!-- Agregar un funcionario -->
          <div class="card" v-if="pestaña === 'agregar'">
               <div class="card-body">
                 <b-row>
                   <b-col cols="12" md="12">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Codigo perteneciente al Jardin</label>
                      <input type="text" class="form-control" id="codJardinAgrega" aria-describedby="emailHelp">
                    </div>
                  </b-col>
                 </b-row>
                 <b-row>
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Nombre del Jardin</label>
                      <input type="text" class="form-control" id="nomJardinAgrega" aria-describedby="emailHelp">
                    </div>
                  </b-col>
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Region del Jardin</label>
                      <input type="text" class="form-control" id="regionAgrega" aria-describedby="emailHelp">
                    </div>
                  </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12" md="6">
                      <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Comuna del Jardin</label>
                        <input type="text" class="form-control" id="comunaAgrega" aria-describedby="emailHelp">
                      </div>
                    </b-col>
                    <b-col cols="12" md="6">
                      <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Providencia del Jardin</label>
                        <input type="text" class="form-control" id="provinciaAgrega" aria-describedby="emailHelp">
                      </div>
                    </b-col>
                </b-row>
                <br>
              <button type="submit" @click="agregarDependencia()" class="btn btn-success m-3">Agregar Dependencia</button>
              <button type="submit" @click="Volver()" class="btn btn-primary">Volver al Listado</button>
            </div>
          </div>
          <!-- Editar un funcionario -->
          <div class="card" v-if="pestaña === 'editar'">
               <div class="card-body">
                 <b-row>
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Nombre del Jardin</label>
                      <input type="text" class="form-control" id="nomJardinEdita" aria-describedby="emailHelp">
                    </div>
                  </b-col>
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Region del Jardin</label>
                      <input type="text" class="form-control" id="regionEdita" aria-describedby="emailHelp">
                    </div>
                  </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12" md="6">
                      <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Comuna del Jardin</label>
                        <input type="text" class="form-control" id="comunaEdita" aria-describedby="emailHelp">
                      </div>
                    </b-col>
                    <b-col cols="12" md="6">
                      <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Providencia del Jardin</label>
                        <input type="text" class="form-control" id="provinciaEdita" aria-describedby="emailHelp">
                      </div>
                    </b-col>
                </b-row>
                <br>
              <button type="submit" @click="editarDependencia()" class="btn btn-success m-3">Editar Dependencia</button>
              <button type="submit" @click="Volver()" class="btn btn-primary">Volver al Listado</button>
            </div>
          </div>
          <!-- Historial del funcionario -->
          <div class="row">
              <b-button @click="Volver()" class="botonAgregar" v-if="pestaña === 'historial'">Volver al listado de las Dependencias</b-button>
            </div>
          <div class="row">
                <table class="table table-striped table-dark table-responsive-lg table-responsive-md" v-if="pestaña === 'historial'">
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
          <div class="row">
              <b-button @click="Volver()" class="botonAgregar" v-if="pestaña === 'actuales'">Volver al listado de las Dependencias</b-button>
            </div>
          <div class="row">
                <table class="table table-striped table-dark table-responsive-lg table-responsive-md" v-if="pestaña === 'actuales'">
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
export default {
  name: "about",
  components: {
    navbar,
  },
  data() {
      return {
        equiposAct: [],
        historial: [],
        funcionarios: [],
        pestaña: 'dependencias',
      }
    },
    created(){

    },
    methods: { //Vista inicial
      Acteditar(){
        this.pestaña = 'editar'
      },
      ActHistorial(){
        this.pestaña = 'historial'
      },
      EquiposActuales(){
        this.pestaña = 'actuales'
      },
      agregar(){
        this.pestaña = 'agregar'
      }, //Funciones de la vista agregar
      agregarDependencia(){
        console.log("Agregaaa")
      },
      Volver(){
        this.pestaña = 'dependencias'
      }, //Vista de editar
      editarDependencia(){
        console.log('Editateee')
      },
      quitar(){
        console.log("holaxd")
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

  .botonAgregar{
    margin: 20px;
    position: relative;
    left: -18px;
  }
</style>