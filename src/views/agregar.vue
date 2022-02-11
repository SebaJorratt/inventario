<template>
  <div>
    <navbar />
    <br />
    <h1 id="menu">Agregar equipos</h1>

    <div class="mt-5">
      <div id="centro"> 
        <b-container>
          <div class="card">
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
                      <select class="form-control" v-model="$v.tipo.$model">
                        <option v-for="i in tipos" :key="i.tipoEquipo">{{i.tipoEquipo}}</option>
                      </select>
                      <p class="text-danger" v-if="$v.tipo.$error">Es necesario determinar el tipo del equipo</p>
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
                      <select class="form-control" v-model="$v.marca.$model">
                        <option v-for="i in marcas" :key="i.nomMarca">{{i.nomMarca}}</option>
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
                <br>
              <button type="submit" @click="agregarEquipo()" class="btn btn-primary">Agregar equipo</button>
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
        //Datos para agregar un nuevo equipo con v-model
        selected: '',
        codigo: '',
        modelo: '',
        tipo: '',
        tipos: [],
        serie: '',
        marca: '',
        marcas: [],
        estado: '',
        condicion: ''
      }
    },
    validations:{
      //Validaciones de los input
      codigo:{required},
      modelo:{required},
      tipo:{required},
      serie:{required},
      marca:{required},
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
      //Función que permite crear un nuevo equipo usa v-model y axios para enviar los datos al api
      //algunos datos son requeridos se usa Vualidate ($v.) para verificar si cumplen las condiciones
      agregarEquipo(){
        let config = {
          headers: {
            token: this.token
          }
        }
        this.$v.$touch()
        if(!this.$v.codigo.$invalid && !this.$v.modelo.$invalid && !this.$v.serie.$invalid){
          this.axios.post('api/agregaEquipo', {codEquipo: this.codigo, modelo: this.modelo, serie: this.serie, tipoEquipo: this.tipo, nomMarca: this.marca, estado: this.estado, condicion: this.condicion}, config)
            .then(res => {
              Swal.fire(
                'Se ha creado un nuevo equipo!',
                'Seleccione Ok para continuar',
                'success'
              )
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
            this.marca = res.data[0].nomMarca;
            this.estado = 'Bueno';
          })
          .catch(e => {
            this.alerta('danger', 'No se han podido cargar las marcas');
        })
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
</style>