<template>
  <main>
    <MyNavbar/>
    
  <v-container fluid>
    <!-- Barra di ricerca sopra l'immagine di sfondo -->
    <v-row justify="center" class="search-bar">
      <v-col cols="12" md="4">
        
      <v-text-field
        append-inner-icon="mdi-magnify"
        density="compact"
        label="Cerca una ricetta..."
        variant="solo"
        hide-details
        single-line
      ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
  <div>
    <div class="container__ricerca" v-for="recipe in recipes">
      <h1>{{ recipe.food.calories }}</h1>
    </div>
  </div>
    <div>
      <a>ciao: {{ recipes }}</a>
    </div>
  </main>
</template>

<script lang="ts">
  import MyNavbar from "../components/navbar.vue";
  import axios from "axios";

export default {
  name: "HomeView",
  components: {
    MyNavbar,
  },
  data() {
    return {
      searchQuery: '',
      recipes: null,
      error: null,
    };
  },
  methods: {
    fetchRecipes() {
      axios
        .get('https://api.edamam.com/api/recipes/v2', {
          params: {
            type: 'public',
            beta: true,
            app_id: 'fed994cd',
            app_key: 'af0e83d2d10db0905af45dcedcba81f0',
            cuisineType: 'American',
              random: true,
          },
          headers: {
            'accept': 'application/json',
            'Edamam-Account-User': 'Giada',
            'Accept-Language': 'en',
          },
        })
        .then(response => {
          this.recipes = response.data.hits.map((hit:any) => hit.recipe);
          console.log(this.recipes);
        })
        .catch(error => {
          this.error = error;
          console.error('Error fetching recipes:', error);
        });
    },
  },
  mounted() {
    this.fetchRecipes();
  },
};
</script>

<style scoped>
.search-bar {
  position: relative;
  z-index: 2; /* Assicurati che la barra di ricerca si sovrapponga all'immagine */
  color: #ffffff;
  opacity: 0.9;
}

.v-container {
  background-image: url('../assets/International-Recipes-1170x780.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100vw; /*100% della larghezza*/
  height: 50vh;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>


