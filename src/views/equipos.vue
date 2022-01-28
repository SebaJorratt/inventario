<template>
  <div class="about">
    <navbar />
    <b-container>
        <div class="menu">
            <h1>Listado de Equipos</h1>
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <br/>
                    <div>
                        <b-table striped hover :items="items"></b-table>
                    </div>
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
        items: [
          { código: 403223, modelo: 'Pavilion Laptop 15-cc5xx', serie: '123123', tipo: 'Notebook', memoriaRam: '8 Gb', marca: 'HP', jardin: 'Ricitos de oro',  region:'Coquimbo', zona:'1A'},
          { código: 412310, modelo: 'modelo', serie: '1223', tipo: 'Notebook', memoriaRam: '4 Gb', marca: 'Acer', jardin: 'Ricitos de oro',  region:'Coquimbo', zona:'1A'},
          { código: 12314210, modelo: 'modelo', serie: '123143', tipo: 'Notebook', memoriaRam: '8 Gb', marca: 'Samsung', jardin: 'Ricitos de oro',  region:'Coquimbo', zona:'1A'}
        ]
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
</style>