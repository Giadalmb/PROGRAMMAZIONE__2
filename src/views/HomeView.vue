<template>
  <main>
    <MyNavbar />

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
    <div class="container__ricerca">
      <div v-for="recipe in recipes"><!-- 
        <v-card class="mx-auto" max-width="344">
          <v-img height="200px" v-bind:src="recipe.recipe.image" cover></v-img>

          <v-card-title>
            <h1>{{ recipe.recipe.cuisineType[0] }}</h1>
          </v-card-title>

          <v-card-actions>
            <v-btn color="orange-lighten-2" text="Esplora"></v-btn>
          </v-card-actions>
        </v-card> -->
      </div>
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
      searchQuery: "",
      recipes:[{}],
      error: null,
    };
  },
  methods: {
    fetchRecipes() {

      let ArrayStati = ["American", "Italian", "Mexican"]

      for(let i = 0; i < ArrayStati.length; i++){
      axios
        .get("https://api.edamam.com/api/recipes/v2", {
          params: {
            type: "public",
            beta: true,
            app_id: "fed994cd",
            app_key: "af0e83d2d10db0905af45dcedcba81f0",
            cuisineType: ArrayStati[i],
            random: true,
          },
          headers: {
            accept: "application/json",
            "Edamam-Account-User": "Giada",
            "Accept-Language": "en",
          },
        })
        .then((response) => {

          let oggettoMomentaneo = JSON.parse(JSON.stringify(response.data.hits[0]))
          this.recipes.push(JSON.parse(JSON.stringify(oggettoMomentaneo.recipe)));
          console.log(oggettoMomentaneo);
          console.log(this.recipes);
        })
        .catch((error) => {
          this.error = error;
          console.error("Error fetching recipes:", error);
        });

      }
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
  background-image: url("../assets/International-Recipes-1170x780.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100vw; /*100% della larghezza*/
  height: 50vh;

  display: flex;
  justify-content: center;
  align-items: center;
}

.container__ricerca {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas: ". . .";
  margin: 4vh 8vw 1vh 8vw;
}

.container__ricerca div {
  margin: 1vh;
}

@media only screen and (max-width: 800px) {
  .container__ricerca {
    grid-template-columns: 1fr;
    grid-template-areas: ".";
  }
}
</style>
