<template>
  <div class="about">
    <navbar />
    <b-container>
        <div class="menu">
          <h1 v-if="pestaña == 'editar'">Editar Equipo</h1>
          <h1 v-else-if="pestaña == 'enviar'">Enviar Equipo</h1>
          <h1 v-else>Listado de Equipos</h1>
            
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
            <table class="table table-striped table-dark table-responsive-lg table-responsive-md" v-if="pestaña === 'equiposact'">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">N° Serie</th>
                  <th scope="col">Codigo</th>
                  <th scope="col">Jardin</th>
                  <th scope="col">Codigo Jardin</th>
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
                  <th scope="col">ID</th>
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
                <tr>
                  <td scope="row">January</td>
                  <td>$10asd0</td>
                  <td>$10asd0</td>
                  <td>January</td>
                  <td>January</td>
                  <td>January</td>
                  <td>
                    <b-button @click="Enviar()" class="btn-success btn-sm">Enviar Equipo</b-button>
                  </td>
                  <td>
                    <b-button @click="Acteditar()" class="btn-warning btn-sm">Mostrar Mas</b-button>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- Tabla de equipos sin dueños que estan en MAL estado -->
            <table class="table table-striped table-dark table-responsive-lg table-responsive-md" v-if="pestaña === 'equiposBaja'">
              <thead>
                <tr>
                  <th scope="col">Tipo</th>
                  <th scope="col">N° Serie</th>
                  <th scope="col">Codigo</th>
                  <th scope="col">Marca</th>
                  <th scope="col">Modelo</th>
                  <th scope="col">Mostrar Equipo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td scope="row">January</td>
                  <td>$10asd0</td>
                  <td>January</td>
                  <td>January</td>
                  <td>January</td>
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
                  <b-col cols="12" md="4">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Numero del equipo</label>
                      <input disabled type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="$v.numero.$model">
                    </div>
                  </b-col>
                  <b-col cols="12" md="4">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Nombre del Jardin</label>
                      <select class="form-control" v-model="$v.nombre.$model">
                        <option disabled value="">Seleccione un estado posible</option>
                        <option>Bueno</option>
                        <option>Regular</option>
                        <option>Malo</option>
                        <option>Baja</option>
                      </select>
                    </div>
                  </b-col>
                  <b-col cols="12" md="4">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Dueño del equipo</label>
                      <select class="form-control" v-model="$v.dueño.$model">
                        <option disabled value="">Seleccione un estado posible</option>
                        <option>Bueno</option>
                        <option>Regular</option>
                        <option>Malo</option>
                        <option>Baja</option>
                      </select>
                    </div>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <b-button @click="EnviarEquipo()" class="btn-success botonmostrar">Enviar Equipo</b-button>
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
import { required} from "vuelidate/lib/validators";
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
        nombre: '',
        dueño: ''
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
      nombre:{required},
      dueño:{required},
    },
    created(){

    },
    methods: {
      Acteditar(){
        this.pestaña = 'editar'
        this.botones = 'no'
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
        this.botones = 'si'
      },
      Enviar(){
        this.pestaña = 'enviar'
        this.botones = 'no'
      },
      EnviarEquipo(){

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