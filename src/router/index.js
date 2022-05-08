import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Query from '../views/Query.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '主頁',
    component: Home
  },
  {
    path: '/Query',
    name: '資料查詢',
    component: Query
  },
  {
    path: '/Setting',
    name: '設定',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
