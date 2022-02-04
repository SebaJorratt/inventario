import Vue from 'vue'
import VueRouter from 'vue-router'
import inicio from '../views/inicio.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: inicio
  },
  {
    path: '/menu',
    name: 'menu',
    component: () => import('../views/menu.vue')
  },
  {
    path: '/equipos',
    name: 'equipos',
    component: () => import('../views/equipos.vue')
  },
  {
    path: '/agregar',
    name: 'agregar',
    component: () => import('../views/agregar.vue')
  },
  {
    path: '/configuracion',
    name: 'configuracion',
    component: () => import('../views/configuracion')
  },
  {
    path: '/estado',
    name: 'estado',
    component: () => import('../views/estado.vue')
  },
  {
    path: '/funcionario',
    name: 'funcionario',
    component: () => import('../views/funcionario.vue')
  },
  {
    path: '/dependencia',
    name: 'dependencia',
    component: () => import('../views/dependencia.vue')
  },
  {
    path: '/agregaUsuario',
    name: 'agregaUsuario',
    component: () => import('../views/agregarUsuario.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
