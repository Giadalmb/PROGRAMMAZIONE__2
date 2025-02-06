<template>
  <v-app-bar color="secondary" >
    <!-- <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->

    <v-toolbar-title style="cursor: pointer;" @click="$router.push({ path: '/'})">giari</v-toolbar-title>

    <v-spacer></v-spacer>
      <!-- Cambia il testo del bottone in base allo stato di autenticazione -->
      <v-btn @click="$router.push({ path: '/profilo', query: { id:  user} })">
        profile
      </v-btn>
  </v-app-bar>

<!--   <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'left' : undefined" temporary>
    <v-list :items="items"></v-list>
  </v-navigation-drawer> -->
</template>

<script>
import DataService from "../dataservice";
export default {
  data: () => ({
    drawer: false,
    group: null,
    user: localStorage.getItem("login"),
    items: [
      {
        title: 'Profilo',
        value: 'foo',
      },
      {
        title: 'Bar',
        value: 'bar',
      },
      {
        title: 'Fizz',
        value: 'fizz',
      },
      {
        title: 'Buzz',
        value: 'buzz',
      },
    ],
  }),

  
  methods: {
  },

  mounted(){
  },

  watch: {
    group() {
      this.drawer = false
    },
  },
}
</script>