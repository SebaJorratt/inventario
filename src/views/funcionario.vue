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
            <br>
            <!-- Boton para ir a agregar un Funcionario -->
            <div class="row">
              <b-button @click="agregar()" class="btn-success botonAgregar" v-if="pestaña === 'funcionarios'">Agregar Funcionario</b-button>
            </div>
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
                      <label for="exampleInputEmail1" class="form-label">Codigo Principal del Funcionario</label>
                      <input type="text" class="form-control" id="codigoAgrega" aria-describedby="emailHelp" v-model="$v.codigo.$model">
                      <p class="text-danger" v-if="$v.codigo.$error">Es necesario ingresar un codigo</p>
                    </div>
                  </b-col>
                 </b-row>
                 <b-row>
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Codigo Funcionario</label>
                      <input type="text" class="form-control" id="codFuncionarioAgrega" aria-describedby="emailHelp" v-model="$v.codigoFuncionarioAgregar.$model">
                      <p class="text-danger" v-if="$v.codigoFuncionarioAgregar.$error">Es necesario ingresar un codigo</p>
                    </div>
                  </b-col>
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Nombre del Funcionario</label>
                      <input type="text" class="form-control" id="nomFuncionarioAgrega" aria-describedby="emailHelp" v-model="$v.nomFuncionarioAgregar.$model">
                      <p class="text-danger" v-if="$v.nomFuncionarioAgregar.$error">Es necesario ingresar un nombre</p>
                    </div>
                  </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12" md="6">
                      <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Correo del Funcionario</label>
                        <input type="email" class="form-control" id="correoAgrega" aria-describedby="emailHelp" v-model="$v.correoAgregar.$model">
                        <p class="text-danger" v-if="$v.correoAgregar.$error">Por favor ingrese un email</p>
                      </div>
                    </b-col>
                    <b-col cols="12" md="6">
                      <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Rut del Funcionario</label>
                        <input type="text" class="form-control" id="rutAgrega" aria-describedby="emailHelp" v-model="$v.rutAgregar.$model">
                        <p class="text-danger" v-if="$v.rutAgregar.$error">Es necesario ingresar un rut</p>
                      </div>
                    </b-col>
                </b-row>
                <br>
              <button type="submit" @click="agregarFuncionario()" class="btn btn-success m-3">Agregar Funcionario</button>
              <button type="submit" @click="Volver()" class="btn btn-primary">Volver al Listado</button>
            </div>
          </div>
          <!-- Editar un funcionario -->
          <div class="card" v-if="pestaña === 'editar'">
               <div class="card-body">
                 <b-row>
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Codigo Funcionario</label>
                      <input type="text" class="form-control" id="codFuncionarioEdita" aria-describedby="emailHelp" v-model="$v.codigoFuncionario.$model">
                      <p class="text-danger" v-if="$v.codigoFuncionario.$error">Es necesario ingresar un codigo</p>
                    </div>
                  </b-col>
                  <b-col cols="12" md="6">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Nombre del Funcionario</label>
                      <input type="text" class="form-control" id="nomFuncionarioEdita" aria-describedby="emailHelp" v-model="$v.nomFuncionario.$model">
                      <p class="text-danger" v-if="$v.nomFuncionario.$error">Es necesario ingresar un nombre</p>
                    </div>
                  </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12" md="6">
                      <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Correo del Funcionario</label>
                        <input type="email" class="form-control" id="correoEdita" aria-describedby="emailHelp" v-model="$v.correoAgregar.$model">
                        <p class="text-danger" v-if="$v.correo.$error">Por favor ingrese un email</p>
                      </div>
                    </b-col>
                    <b-col cols="12" md="6">
                      <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Rut del Funcionario</label>
                        <input type="text" class="form-control" id="rutEdita" aria-describedby="emailHelp" v-model="$v.rutAgregar.$model">
                        <p class="text-danger" v-if="$v.rutAgregar.$error">Es necesario ingresar un rut</p>
                      </div>
                    </b-col>
                </b-row>
                <br>
              <button type="submit" @click="editarFuncionario()" class="btn btn-success m-3">Editar Funcionario</button>
              <button type="submit" @click="Volver()" class="btn btn-primary">Volver al Listado</button>
            </div>
          </div>
          <!-- Historial del funcionario -->
          <div class="row">
            <b-button @click="Volver()" class="botonAgregar" v-if="pestaña === 'historial'">Volver al listado de Funcionarios</b-button>
          </div>
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
            </div>
          <!-- Equipos Actuales del funcionario -->  
          <div class="row">
              <b-button @click="Volver()" class="botonAgregar" v-if="pestaña === 'actuales'">Volver al listado de Funcionarios</b-button>
            </div>
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
import { required, email } from "vuelidate/lib/validators";
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
        pestaña: 'funcionarios',
        codigo: '',
        codigoFuncionarioAgregar: '',
        nomFuncionarioAgregar: '',
        correoAgregar: '',
        rutAgregar: '',
        codigoFuncionario: '',
        nomFuncionario: '',
        correo: '',
        rut: ''
      }
    },
    validations:{
      codigo:{required},
      codigoFuncionarioAgregar:{required},
      nomFuncionarioAgregar:{required},
      correoAgregar:{required, email},
      rutAgregar:{required},
      codigoFuncionario:{required},
      nomFuncionario:{required},
      correo:{required, email},
      rut:{required}
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
      agregarFuncionario(){
        console.log("Agregaaa")
      },
      Volver(){
        this.pestaña = 'funcionarios'
      }, //Vista de editar
      editarFuncionario(){
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