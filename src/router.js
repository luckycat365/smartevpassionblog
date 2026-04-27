import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import BrandPage from './pages/BrandPage.vue'
import SubBrandPage from './pages/SubBrandPage.vue'
import GamePage from './pages/GamePage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/game', component: GamePage },
  { path: '/:brandId', component: BrandPage },
  { path: '/:brandId/:subBrandId', component: SubBrandPage }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
