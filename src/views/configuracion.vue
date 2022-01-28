<template>
  <div class="configuracion">
    <navbar />
    <b-container>
        <div class="config">
            <h1>Mi Perfil</h1>
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