<template>
    <div class="wrapper fadeInDown">
            <div class="card-body" id="formContent">
              <!-- Tabs Titles -->
          
              <!-- Icon -->
              <br>
              <div >
              
                  <img src="../assets/Logotipo_de_la_Junji.png" alt="" width="150px" class="imagen">  
              </div>
              <br>
              
              <!-- Login Form -->
              <form @submit.prevent="submit">
                <input type="email" id="login" class="second" name="login" placeholder="Ingrese su email" v-model="$v.email.$model" :class="{'is-invalid': $v.email.$error}">
                <p class="text-danger" v-if="$v.email.$error">Por favor ingrese un email</p>
                <input type="password" id="password" class="third" name="login" placeholder="Contraseña" v-model="$v.password.$model" :class="{'is-invalid': $v.password.$error}">
                <p class="text-danger" v-if="!$v.password.minLength">Mínimo de 6 caracteres</p>
                <br>
                <router-link to="/menu"><input type="submit" class="fadeIn fourth" value="Inicio de sesión" width="70px" :disabled="$v.$invalid"></router-link> 
              </form>
              <!-- Remind Passowrd -->
              <div id="formFooter">
                <a class="underlineHover" href="#">¿Olvidaste tu contraseña?</a>
              </div>
            </div>
    </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
export default {
  name: 'inicio',
  data(){
    return{
      //Datos del Login
      email: '',
      password: ''
    }
  },
  validations:{
    //Se validan el email y la contraseña con un minimo de letras
    email:{required,email},
    password:{required, minLength: minLength(6)}
  },
  methods: {
    submit(){
      //Se revisa que se cumpla con los requerimientos y luego se busca al usuario en la base de datos
      this.$v.$touch()
      if(this.$v.$invalid){
        console.log('se genero un error')
      }else{
        console.log('todos los campos correctos')
      }
    }
  }
}
</script>

<style> 
      .logoJunji{
        max-width: 10%;
        max-height: 10%;
      }

/* BASIC */
body{
    background-color: #eee;
}

.abs-center {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.imagen{
    text-align: center;
}

a {
  color: #92badd;
  display:inline-block;
  text-decoration: none;
  font-weight: 400;
}

h2 {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  display:inline-block;
  margin: 40px 8px 10px 8px; 
  color: #cccccc;
}



/* STRUCTURE */

.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column; 
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 150px;
}

#formContent {

  border-radius: 10px 10px 10px 10px;
  background: #fff;
  padding: 30px;
  width: 90%;
  max-width: 450px;
  padding: 0px;
  box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
  text-align: center;
}

#formFooter {
  background-color: #f6f6f6;
  border-top: 1px solid #dce8f1;
  padding: 25px;
  text-align: center;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
}



/* TABS */

h2.inactive {
  color: #cccccc;
}

h2.active {
  color: #0d0d0d;
  border-bottom: 2px solid #5fbae9;
}



input[type=button], input[type=submit], input[type=reset]{
  background-color: #56baed;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
  box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 40px 20px;
 
}

input[type=button]:hover, input[type=submit]:hover, input[type=reset]:hover  {
  background-color: #39ace7;
}



input[type=text], input[type=password], input[type=number], input[type=email]  {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
 
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}
/* OTHERS */

*:focus {
    outline: none;
} 

#icon {
  width:60%;
}

@media screen and (max-width: 480px){
    #formContent{
      border-radius: 10px 10px 10px 10px;
      background: #fff;
      padding: 30px;
      width: 400%;
      max-width: 350px;
      padding: 0px;
      box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
      text-align: center;
    }
}
</style>
    

