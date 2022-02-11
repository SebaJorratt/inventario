import Vue from 'vue'
import VueRouter from 'vue-router'
import inicio from '../views/inicio.vue'

//Importamos nuestra store
import store from '../store/index.js'

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
    component: () => import('../views/menu.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '/equipos',
    name: 'equipos',
    component: () => import('../views/equipos.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '/agregar',
    name: 'agregar',
    component: () => import('../views/agregar.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '/configuracion',
    name: 'configuracion',
    component: () => import('../views/configuracion'),
    meta: {requireAuth: true}
  },
  {
    path: '/funcionario',
    name: 'funcionario',
    component: () => import('../views/funcionario.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '/dependencia',
    name: 'dependencia',
    component: () => import('../views/dependencia.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '/agregaUsuario',
    name: 'agregaUsuario',
    component: () => import('../views/agregarUsuario.vue'),
    meta: {requireAuth: true}
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const rutaProtegida = to.matched.some(record => record.meta.requireAuth)
  if(rutaProtegida && store.state.token === ''){
    next({name: 'inicio'})
  }else{
    next();
  }
});

export default router;
