import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Query from '../views/Query.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Query',
    name: 'Query',
    component: Query
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
