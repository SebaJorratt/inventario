<template>
    <div class="hello"> 
        <div id="navegador">
            <b-navbar toggleable="md" type="dark" variant="danger">
                <b-container>
                    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                    <img src="../assets/logoborde.png" alt="" width="50px" class="iconJunji">  
                    <router-link to="/menu"><b-navbar-brand > Inventario |</b-navbar-brand></router-link> 
                     <b-collapse id="nav-collapse" is-nav>
                         <b-navbar-nav>
                            <b-nav-item :to="{name:'equipos'}">Lista de equipos</b-nav-item>
                            <b-nav-item :to="{name:'agregar'}">Agregar Equipo</b-nav-item>
                            <b-nav-item :to="{name:'estado'}">Edicion de equipos</b-nav-item>
                            <b-nav-item :to="{name:'funcionario'}">Funcionarios</b-nav-item>
                            <b-nav-item :to="{name:'dependencia'}">Dependencia</b-nav-item>
                        </b-navbar-nav>
                        <b-navbar-nav class="ml-auto">
                            <b-nav-form>
                                <div class="dropdown">
                                <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Usuario
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><router-link to="/configuracion"><a class="dropdown-item" href="#">Ver perfil</a></router-link> </li>
                                    <li><router-link to="/agregaUsuario"><a class="dropdown-item" href="#">Agregar Nuevo Usuario</a></router-link> </li>
                                    <li><router-link to="/"><a class="dropdown-item" href="#">Cerrar sesión</a></router-link></li>
                                </ul>
                                </div>
                            </b-nav-form>
                        </b-navbar-nav>
                     </b-collapse>  
                </b-container>
            </b-navbar>
        </div>
    </div>
</template>

<style>
    #dropdownMenuButton1{
        color: #F8F8FF;
    }

    .iconJunji{
        padding: 5px;
        
    }
</style>

