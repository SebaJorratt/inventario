<template>
  <div class="about">
    <navbar />
      <div class="menu">
        <h1>Sistema de inventario informatico</h1>
        <b-container><br><br>
          <div class="card" style="border-color: black;">
            <div class="cardmenu card-body">
              <b-row>
                    <b-col cols="12" md="6">
                      <img src="../assets/inventario.jpg" alt="" width="150px" class="imagenGrande">  
                    </b-col>
                    <b-col cols="12" md="6" style="text-align: left;">
                          <p id="parrafo" style="margin-top: 25px;">Este sistema de inventario tiene como funcionalidad poder facilitar la gestion de todos los equipos pertenecientes a la Junji, 
                            en la pestaña Lista de equipos se puedes visualizar todos los equipos que estan ingresados en el sistema, los cuales se puedes clasificar, 
                            tanto como por si tienen dueño o por su estado, tambien se pueden observar las caracteristicas que definen a cada equipo y adminitrar a los dueños
                            de cada uno. La pestaña "Agregar Equipo" tal como dice su nombre permite agregar un nuevo equipo al sistema el cual luego podra ser definido a un dueño 
                            en la pestaña "Listar Equipos". Por otro lado tambien es importante gestionar a los dueños registrados en el sistema y verificar que equipos han sido
                            ocupados por estos y cuales ocupan en la actualidad, para esto existen las pestañas "Funcionarios" y "Dependencia" las cuales permiten revisar 
                            y editar sus datos y visualizar su historial registrado en la plataforma.
                          </p>  
                    </b-col>
              </b-row>
            </div>
          </div>
        </b-container>
      </div>
  </div>
</template>

<script>
import navbar from "../components/navbar.vue";
export default {
  name: "about",
  components: {
    navbar,
  },
};
</script>

<style>
  .menu{
    padding: 30px;
  }

  body{
    background-color: #eee;
  }

  .imagenGrande{
    width: 100%;
  }

  .parrafo{
    font-size: small;
    text-align: left;
  }
  
  .cardmenu{
    padding: 30px;
  }

  .card-body{
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .boton{
    margin: 20px;
    width: 90%;
    border-radius: 12px;
    border-color: black;
  }
</style>

