<template>
  <v-app-bar color="secondary" prominent>
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

    <v-toolbar-title>MyRicette</v-toolbar-title>

    <v-spacer></v-spacer>

    <template v-if="$vuetify.display.mdAndUp">
      <!-- Cambia il testo del bottone in base allo stato di autenticazione -->
      <v-btn @click="handleAuth">
        {{ isAuthenticated ? 'Profilo' : 'Accedi' }}
      </v-btn>
    </template>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'left' : undefined" temporary>
    <v-list :items="items"></v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    isAuthenticated: false, // Stato di autenticazione inizialmente impostato su "non autenticato"
    items: [
      {
        title: 'Foo',
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
    handleAuth() {
      if (!this.isAuthenticated) {
        // Logica per accedere (ad esempio, aprire la finestra di login)
        // Qui simula l'accesso impostando isAuthenticated a true
        this.isAuthenticated = true;
      } else {
        // Logica per andare alla pagina del profilo
        console.log("Vai alla pagina del profilo");
      }
    },
  },

  watch: {
    group() {
      this.drawer = false
    },
  },
}
</script>