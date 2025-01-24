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

import DataService from "./dataservice";

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import LoginView from './views/LoginView.vue'
import ProfiloView from './views/ProfiloView.vue'
import Modifica_profilo from './views/Modifica_profilo.vue'
import RicettaView from './views/RicettaView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    
    {
      path: '/profilo',
      name: 'profilo',
      component: ProfiloView,
    },
    
    {
      path: '/modifica_profilo',
      name: 'modifica_profilo',
      component: Modifica_profilo,
    },
    
    {
      path: '/ricetta',
      name: 'ricetta',
      component: RicettaView,
    },
  ],
});

router.beforeEach(async (to:any, from:any) => {
  if (!DataService.isAuthenticated() && to.name !== "login") {
      return { name: "login" };
  }
  if (DataService.isAuthenticated() && to.name === "login") {
    return { name: "home" };
  }
});

const app = createApp(App)

registerPlugins(app)

app.use(router)
app.mount('#app')
