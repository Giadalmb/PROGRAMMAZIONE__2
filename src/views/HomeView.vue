<template>
  <main>
    <!-- Navbar -->
    <MyNavbar />
    <!-- Search Bar -->
    <v-container fluid>
      <!-- Barra di ricerca sopra l'immagine di sfondo -->
      <v-row justify="center" class="search-bar">
        <v-col cols="12" md="4">
          <v-text-field
            append-inner-icon="mdi-magnify"
            density="compact"
            label="Search recipe..."
            variant="solo"
            hide-details
            single-line
            type="text"
            v-model="query"
            @input="fetchNormalSearch(query)"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <!-- Card Section -->
    <div class="container__ricerca">
      <div v-if="ricercaPerQuery.length == 0">
        <div style="margin-bottom: 4vh;">
          <h1>Cuisines from the world</h1>
          <p style="color: var(--root__green__trasparent)">
            Create a personal diet with dishes from all aroud the world
          </p>
        </div>
        <v-row justify="space-evenly" align="center" class="py-2">
          <v-col v-for="cucina in cucine" cols="12" md="4">
            <v-card
              class="mx-auto my-2 ods__mini__card"
              max-width="300"
              @click="fetchQuickSearch(cucina.label)"
            >
              <v-img
                class="ods__mini__card"
                :src="cucina.image"
                height="200px"
                cover
              ></v-img>
              <v-card-title class="text-h6 text-center">
                {{ cucina.label }}
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div v-if="ricercaPerQuery.length != 0">
        <v-sheet class="mx-auto" max-width="90vw">
          <v-slide-group show-arrows>
            <v-slide-group-item v-for="cucina in cucine">
              <v-btn
                :color="query == cucina.label ? 'primary' : undefined"
                class="ma-2"
                rounded
                @click="fetchQuickSearch(cucina.label)"
              >
                {{ cucina.label }}
              </v-btn>
            </v-slide-group-item>
          </v-slide-group>
        </v-sheet>

        <v-row justify="space-evenly" align="center" class="py-2">
          <v-col v-for="ricetta in ricercaPerQuery" cols="12" md="3">
            <v-card
              class="mx-auto my-2 ods__mini__card"
              max-width="300"
              @click="
                $router.push({
                  path: '/ricetta',
                  query: { cuisine: ricetta.title, id: ricetta.id },
                })
              "
            >
              <v-img
                class="ods__mini__card"
                :src="ricetta.image"
                height="200px"
                cover
              ></v-img>
              <v-card-title class="text-h6 text-center">
                {{ ricetta.title }}
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
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
      // Ricerca normale
      ricercaPerQuery: [],
      query: "",

      // Piano giornaliero
      pianoGiornaliero: [
        { mealType: "Colazione", recipe: { title: "Pancakes" } },
        { mealType: "Pranzo", recipe: { title: "Spaghetti al pomodoro" } },
        { mealType: "Cena", recipe: { title: "Insalata di pollo" } },
      ],

      // Array statico delle cucine
      cucine: [
        {
          name: "italian",
          label: "italian",
          image:
            "https://th.bing.com/th/id/OIP._UqMm9j0SF5pzduU9Y-lMwHaDO?rs=1&pid=ImgDetMain",
        },
        {
          name: "american",
          label: "american",
          image:
            "https://staticcookist.akamaized.net/wp-content/uploads/sites/21/2022/06/cheeseburger-ricette-americane.jpg",
        },
        {
          name: "mexican",
          label: "mexican",
          image:
            "https://www.samtell.com/hs-fs/hubfs/Blogs/Four-Scrumptous-Tacos-Lined-up-with-ingredients-around-them-1.jpg?width=1800&name=Four-Scrumptous-Tacos-Lined-up-with-ingredients-around-them-1.jpg",
        },
        {
          name: "japanese",
          label: "japanese",
          image:
            "https://img.freepik.com/premium-photo/ramen-noodle-wallpaper-very-cool_1012508-9.jpg",
        },
        {
          name: "french",
          label: "french",
          image:
            "https://static.wixstatic.com/media/720a92_ead3f871ba16409da6bf74d45911b062~mv2.jpg/v1/fill/w_1000,h_667,al_c,q_85/720a92_ead3f871ba16409da6bf74d45911b062~mv2.jpg",
        },
        {
          name: "spanish",
          label: "spanish",
          image:
            "https://2.bp.blogspot.com/-WJnEGU0YJ2U/UOhu0EVXEVI/AAAAAAAAAVw/Q6o20jtdZBA/s1600/paella.jpg",
        },
      ],
    };
  },

  methods: {
    async fetchQuickSearch(cucina: any) {
      this.query = "";
      this.ricercaPerQuery = [];
      // Chiamata API per la ricerca veloce
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=1333d6e03cb34a15bd64e7ad984cb3a2&cuisine=${cucina}`
      );
      const data = await response.json();
      this.ricercaPerQuery = data.results;
      this.query = cucina;
    },

    async fetchNormalSearch(query: any) {
      this.ricercaPerQuery = [];
      // Chiamata API per la ricerca normale
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=1333d6e03cb34a15bd64e7ad984cb3a2&query=${query}`
      );
      const data = await response.json();
      this.ricercaPerQuery = data.results;
    },
  },

  mounted() {},
};
</script>

<style scoped>
@import "../assets/general.css";
.text-center {
  text-align: center;
}

.search-bar {
  position: relative;
  z-index: 2; /* La barra di ricerca si sovrappone all'immagine */
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
</style>
