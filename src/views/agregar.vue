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
                <b-col cols="12" md="6">
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Codigo equipo</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                  </div>
                </b-col>
                <b-col cols="12" md="6">
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Modelo equipo</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" md="6">
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Número de serie</label>
                    <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                  </div>
                </b-col>
                <b-col cols="12" md="6">
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Memoria Ram</label>
                    <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" md="6">
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Tipo de equipo</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                  </div>
                </b-col>
                <b-col cols="12" md="6">
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Marca del equipo</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                  </div>
                </b-col>
              </b-row><br>
              <button type="submit" class="btn btn-primary">Agregar equipo</button>
            </div>
          </div>
        </b-container>
      </div>
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