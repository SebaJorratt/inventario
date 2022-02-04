<template>
  <div>
    <navbar />
    <br />
    <h1 id="menu" v-if="pestaña === 'buscar'">Busca el equipo que desee editar</h1>
    <h1 id="menu" v-if="pestaña == 'editar'">Editar Equipo</h1>
    <div class="mt-5">
      <div id="centro"> 
        <b-container>
          <div class="card" v-if="pestaña === 'buscar'">
            <div class="card-body">
              <b-row>
                <b-col cols="12" md="6">
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Codigo equipo</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="$v.codigoInp.$model">
                    <p class="text-danger" v-if="$v.codigoInp.$error">Es necesario ingresar un codigo</p>
                  </div>
                </b-col>
                <b-col cols="12" md="6">
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">N° de Serie de equipo</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="$v.serieInp.$model">
                    <p class="text-danger" v-if="$v.serieInp.$error">Es necesario ingresar un numero de serie</p>
                  </div>
                </b-col>
              </b-row>
              <br>
              <button type="submit" @click="buscar()" class="btn btn-primary">Buscar Equipo</button>
            </div>
          </div>
          <!-- Editar un Equipo -->
          <div class="card" v-if="pestaña === 'editar'">
               <div class="card-body">
                 <b-row>
                  <b-col cols="12" md="4">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Codigo equipo</label>
                      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="$v.codigo.$model">
                      <p class="text-danger" v-if="$v.codigo.$error">Es necesario ingresar un codigo</p>
                    </div>
                  </b-col>
                  <b-col cols="12" md="4">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Modelo equipo</label>
                      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="$v.modelo.$model">
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
                      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="$v.serie.$model">
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
                <br>
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
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "../components/navbar.vue";
import {required} from "vuelidate/lib/validators";
export default {
  name: "about",
  components: {
    navbar,
  },
  data() {
      return {
        pestaña: 'buscar',
        botones: 'si',
        selected: '',
        codigoInp: '',
        serieInp: '',
        codigo: '',
        modelo: '',
        tipo: '',
        serie: '',
        marca: '',
        estado: '',
        condicion: ''
      }
    },
    validations:{
      codigoInp:{required},
      serieInp:{required},
      codigo:{required},
      modelo:{required},
      tipo:{required},
      serie:{required},
      marca:{required},
      estado:{required},
      condicion:{required}
    },
    created(){

    },
    methods: {
      buscar(){
        this.pestaña = 'editar'
      },
      EditarEquipo(){
        console.log("holaxd")
      },
      Volver(){
        this.pestaña = 'buscar'
      }
    }
}

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