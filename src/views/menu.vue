<template>
  <div class="about">
    <navbar />
      <div class="menu">
        <h1>Sistema de inventario informatico</h1>
        <b-container><br><br>
          <div class="card">
            <div class="cardmenu card-body">
              <b-row>
                    <b-col cols="12" md="6">
                      <img src="../assets/inventario.jpg" alt="" width="150px" class="imagenGrande">  
                    </b-col>
                    <b-col cols="12" md="6">
                      
                          <p id="parrafo">Este sistema tiene como finalidad poder listar todos los equipos de la junji
                              e indicar que funcionario esta utilizando cada uno de estos, en que jardin se esta utilizando e indicando las caracteristicas de cada equipo.
                              Además se podra ingresar nuevos equipos y dejarlos a nombre de un nuevo funcionario.</p>  
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
    width: 80%;
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
</style>

