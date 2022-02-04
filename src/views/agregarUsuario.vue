<template>
  <div class="configuracion">
    <navbar />
      <div class="config">
        <h1>Crear un nuevo usuario</h1>
        <div class="mt-5">
          <div id="centro"> 
            <b-container>
              <div class="card">
                  <div class="card-body">
                    <b-row>
                      <b-col cols="12" md="6">
                        <div class="mb-3">
                          <label for="exampleInputEmail1" class="form-label">Nombre de Usuario</label>
                          <input type="text" class="form-control" id="newnombreUsuario" aria-describedby="emailHelp" v-model="$v.nombre.$model">
                          <p class="text-danger" v-if="!$v.nombre.required">Es necesario ingresar un nombre</p>
                          <p class="text-danger" v-if="!$v.nombre.minLength">El nombre debe tener un mínimo de 10 caracteres</p>
                        </div>
                      </b-col>
                      <b-col cols="12" md="6">
                        <div class="mb-3">
                          <label for="exampleInputEmail1" class="form-label">Correo de Usuario</label>
                          <input type="email" class="form-control" id="newcorreoUsuario" aria-describedby="emailHelp" v-model="$v.email.$model">
                          <p class="text-danger" v-if="$v.email.$error">Por favor ingrese un email</p>
                        </div>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12" md="6">
                        <div class="mb-3">
                          <label for="exampleInputEmail1" class="form-label">Contraseña de Usuario</label>
                          <input type="password" class="form-control" id="newserieAgrega" aria-describedby="emailHelp" v-model="$v.password.$model">
                          <p class="text-danger" v-if="!$v.password.minLength">Mínimo de 6 caracteres</p>
                        </div>
                      </b-col>
                      <b-col cols="12" md="6">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Tipo de usuario</label>
                            <select class="form-control" v-model="$v.tipo.$model">
                            <option disabled value="">Tipo de usuario</option>
                                <option value="1">Administrador</option>
                                <option value="0">Normal</option>
                            </select>
                        </div>
                      </b-col>
                    </b-row><br>
                    <b-row>
                        <b-container>
                          <b-button @click="agregarUsuario()" class="btn-success botonmostrar">Agregar</b-button>
                        </b-container>
                    </b-row>
                </div>
              </div>
            </b-container>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import navbar from "../components/navbar.vue";
import { required, email, minLength } from "vuelidate/lib/validators";
export default {
  name: "about",
  components: {
    navbar,
  },
  data() {
      return {
        nombre: '',
        email: '',
        password: '',
        tipo: ''
      }
    },
    validations:{
      nombre:{required, minLength: minLength(10)},
      email:{required,email},
      password:{required, minLength: minLength(6)},
      tipo:{required}
    },
    created(){

    },
    methods: {
      agregarUsuario(){
        console.log('enviar usuario agregado')
      }
    }
};
</script>

<style>
  .config{
    padding: 30px;
  }

  body{
    background-color: #eee;
  }
</style>