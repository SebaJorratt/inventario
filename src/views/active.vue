<template>
  <div class="about">
    <navbar />
    <b-container>
        <div class="menu">
            <h1>Active</h1>
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
  .menu{
    padding: 30px;
  }

  body{
    background-color: #eee;
  }
</style>