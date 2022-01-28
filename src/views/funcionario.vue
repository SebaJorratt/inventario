<template>
  <div class="about">
    <navbar />
    <b-container>
        <div class="menu">
            <h1>Listado de funcionarios</h1>
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
          { funcionario: 'ANA DIAZ ALVAREZ', equipo: '16030397', serial: '8CG942D23W', modelo:'PROONE 840 G6', dependencia: 'SUBD. GDP'},
          { funcionario: 'INGRID VERA', equipo: '16029414', serial: '8CG942D23H', modelo:'PROONE 840 G6', dependencia: 'SUBD. GDP'},
          { funcionario: 'LILY VELIZ', equipo: '16029421', serial: '8CG942CNM8', modelo:'PROONE 840 G6', dependencia: 'SUBD. GDP'},
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