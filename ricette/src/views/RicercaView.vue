<template>
    <div>
      <h1>Ricetta</h1>
      <div v-if="recipe">
        <h2>{{ recipe.label }}</h2>
        <img :src="recipe.image" alt="Image of recipe">
        <ul>
          <li v-for="ingredient in recipe.ingredientLines" :key="ingredient">{{ ingredient }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        recipe: null
      };
    },
    methods: {
      fetchRecipe() {
        const apiKey = 'af0e83d2d10db0905af45dcedcba81f0';
        const appId = 'fed994cd'; // Inserisci qui il tuo app ID
        const query = 'chicken'; // Cambia con l'ingrediente che preferisci
  
        const url = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${apiKey}&from=0&to=1`;
  
        axios.get(url)
          .then(response => {
            this.recipe = response.data.hits[0].recipe;
          })
          .catch(error => {
            console.error("Errore durante il recupero della ricetta: ", error);
          });
      }
    },
    mounted() {
      this.fetchRecipe();
    }
  };
  </script>
  
  <style scoped>
    img {
      max-width: 300px;
      height: auto;
    }
  </style>