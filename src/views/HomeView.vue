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
            label="Cerca una ricetta..."
            variant="solo"
            hide-details
            single-line
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <!-- Card Section -->
    <h2 class= "my-4 ml-4"> Scegli la tua cucina preferita!</h2>
    <div class="container__ricerca">
      <v-row justify="space-evenly" align="center" class="py-2">
  <v-col
    v-for="(cuisine, index) in cuisines"
    :key="index"
    cols="12"
    sm="4"
    md="3"
  >
    <v-card
      class="mx-auto my-2"
      max-width="300"
      @click="$router.push({ path: '/ricerca', query: { cuisine: cuisine.name } })"
    >
      <v-img :src="cuisine.image" height="200px" cover></v-img>
      <v-card-title class="text-h6 text-center">
        {{ cuisine.label }}
      </v-card-title>
    </v-card>
  </v-col>
</v-row>
    </div>
  </main>
</template>

<script lang="ts">
import MyNavbar from "../components/navbar.vue";
import axios from "axios";

axios.get("https://jsonplaceholder.typicode.com/todos/1")
  .then(response => console.log(response.data))
  .catch(error => console.error(error));

export default {
  name: "HomeView",
  components: {
    MyNavbar,
  },
  data() {
    return {
      // Array statico delle cucine
      cuisines: [
        { name: "italian", label: "Italiana", image: "https://th.bing.com/th/id/OIP._UqMm9j0SF5pzduU9Y-lMwHaDO?rs=1&pid=ImgDetMain" },
        { name: "american", label: "Americana", image: "https://staticcookist.akamaized.net/wp-content/uploads/sites/21/2022/06/cheeseburger-ricette-americane.jpg" },
        { name: "mexican", label: "Messicana", image: "https://www.samtell.com/hs-fs/hubfs/Blogs/Four-Scrumptous-Tacos-Lined-up-with-ingredients-around-them-1.jpg?width=1800&name=Four-Scrumptous-Tacos-Lined-up-with-ingredients-around-them-1.jpg" },
        { name: "japanese", label: "Giapponese", image: "https://img.freepik.com/premium-photo/ramen-noodle-wallpaper-very-cool_1012508-9.jpg" },
        { name: "french", label: "Francese", image: "https://static.wixstatic.com/media/720a92_ead3f871ba16409da6bf74d45911b062~mv2.jpg/v1/fill/w_1000,h_667,al_c,q_85/720a92_ead3f871ba16409da6bf74d45911b062~mv2.jpg" },
        { name: "spanish", label: "Spagnola", image: "https://2.bp.blogspot.com/-WJnEGU0YJ2U/UOhu0EVXEVI/AAAAAAAAAVw/Q6o20jtdZBA/s1600/paella.jpg" },
      ],
    };
  },
};
</script>

<style scoped>

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

.container__ricerca {
  display: flex;
  flex-wrap: wrap; /* Permette di andare a capo */
  justify-content: center; /* Centra gli elementi orizzontalmente */
  max-width: 1400px;
  margin: 20px auto;
  gap: 20px; /* Spazi tra gli elementi */
}

@media only screen and (max-width: 800px) {
  .container__ricerca {
    flex-direction: column; /* Dispone gli elementi in una colonna */
    align-items: center; /* Centra gli elementi nella colonna */
  }
}
</style>
