/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import RicercaView from './views/RicercaView.vue'
import LoginView from './views/LoginView.vue'
import ProfiloView from './views/ProfiloView.vue'
import RicettaView from './views/RicettaView.vue'
import CucinaView from './views/CucinaView.vue'

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
      path: '/cucina:id',
      name: 'cucina',
      component: CucinaView,
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

const app = createApp(App)

registerPlugins(app)

app.use(router)
app.mount('#app')
