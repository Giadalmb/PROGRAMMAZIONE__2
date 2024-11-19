<template>
  <MyNavbar/>

  <div>
    
  </div>

  <div>
  </div>
    <div class="container__ricerca" v-for="recipe in recipes">
      <h1>{{ recipe.food.label }}</h1>
      <img style="width: 3cm;" :src="recipe.food.image">
    </div>
</template>

<script>
import axios from 'axios';
  import MyNavbar from "../components/navbar.vue";


export default {
  components: {
    MyNavbar,
  },
  data() {
    return {
      recipes: null
    };
  },
  methods: {
    fetchRecipe() {
      const apiKey = 'ef50efae742db215d15376d1c9e9f784';
      const appId = '04a5caee'; // Inserisci qui il tuo app ID
      const query = 'chicken'; // Cambia con l'ingrediente che preferisci

      const url = `https://api.edamam.com/api/food-database/v2/parser?app_id=${appId}&app_key=${apiKey}&ingr=${query}&nutrition-type=cooking`;

      axios.get(url)
        .then(response => {
          this.recipes = response.data.hints;
        })
        .catch(error => {
          console.log(error)
          console.error("Errore durante il recupero della ricetta: ", error);
        });
    }
  },
   // nuova api -> nomeapi(){...} -> dentro a {...} scrivo la api nuova

  mounted() {
    this.fetchRecipe();
    //nomeapi();
  }
};
</script>

<style scoped>
img {
  max-width: 300px;
  height: auto;
}
</style>