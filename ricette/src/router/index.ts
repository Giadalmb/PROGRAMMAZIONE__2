import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RicercaView from '@/views/RicercaView.vue'
import LoginView from '@/views/LoginView.vue'
import ProfiloView from '@/views/ProfiloView.vue'
import RicettaView from '@/views/RicettaView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/ricerca',
      name: 'ricerca',
      component: RicercaView,
    },
    
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    
    {
      path: '/profilo',
      name: 'profilo',
      component: ProfiloView,
    },
    
    {
      path: '/ricetta',
      name: 'ricetta',
      component: RicettaView,
    },
  ],
})

export default router
