<template>
    <MyNavbar />
    <div style="
  margin: 4vh 8vw 1vh 8vw;">
        <h1>{{ (this.$route.params.id).substring(1) }} Plates</h1>
    </div>
    <div class="container__ricerca">
      <div v-for="recipe in recipes">
        <v-card class="mx-auto" max-width="344" @click="$router.push({path: '/cucina:' + recipe.recipe.cuisineType[0]})">
          <v-img height="200px" v-bind:src="recipe.recipe.image" cover></v-img>

          <v-card-title>
            <h4>{{ recipe.recipe.label }}</h4>
                <h5 style="color:rgb(85, 85, 85);">KJ: {{ Math.floor(recipe.recipe.calories) }} </h5>
                <h5 style="color:rgb(85, 85, 85);" >Type of diet:</h5>
                <div style="display: flex;" v-if="recipe.recipe.dietLabels.length == 0">
                    <h6 style="box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;color:rgb(85, 85, 85);margin: 1vh; padding: 1vh;">General diet</h6>
                </div>
                <div style="display: flex;">
                    <h6 style="box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;color:rgb(85, 85, 85);margin: 1vh; padding: 1vh;" v-for="dl in recipe.recipe.dietLabels">{{ dl }}</h6>
                </div>
          </v-card-title>

          <v-card-actions>
            <v-btn color="orange-lighten-2" text="Explore"></v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
</template>

<script>
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
      recipes:[] = [],
      error: null,
    };
  },
  methods: {
    fetchRecipes() {

      axios
        .get("https://api.edamam.com/api/recipes/v2", {
          params: {
            type: "public",
            beta: true,
            app_id: "fed994cd",
            app_key: "af0e83d2d10db0905af45dcedcba81f0",
            cuisineType: (this.$route.params.id).substring(1),
            random: true,
          },
          headers: {
            accept: "application/json",
            "Edamam-Account-User": "Giada",
            "Accept-Language": "en",
          },
        })
        .then((response) => {
          this.recipes = JSON.parse(JSON.stringify(response.data.hits));
          console.log( this.recipes);
        })
        .catch((error) => {
          this.error = error;
          console.error("Error fetching recipes:", error);
        });
    },
  },
  mounted() {
    this.fetchRecipes();
  },
};
</script>

<style>

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