<template>
  <main>
    <div class="container__ricetta" v-if="ricercaPerQuery">
      <h1>{{ ricercaPerQuery["title"] }}</h1>
      <div class="container__ricetta__inside">
        <div>
          <div
            class="ods__mini__card"
            style="height: 60vh; background-size: cover"
            :style="{ backgroundImage: 'url(' + ricercaPerQuery['image'] + ')' }"
          ></div>
          <div class="ods__mini__card">
            <h3>Diet</h3>
            <v-sheet class="mx-auto" max-width="90vw">
              <v-slide-group show-arrows>
                <v-slide-group-item v-for="diet in ricercaPerQuery['diets']">
                  <v-btn class="ma-2" rounded>
                    <a>{{ diet }}</a>
                  </v-btn>
                </v-slide-group-item>
              </v-slide-group>
            </v-sheet>
          </div>
          <div class="ods__mini__card">
            <h3>Type of dish</h3>
            <v-sheet class="mx-auto" max-width="90vw">
              <v-slide-group show-arrows>
                <v-slide-group-item v-for="tipo in ricercaPerQuery['dishTypes']">
                  <v-btn class="ma-2" rounded>
                    <a>{{ tipo }}</a>
                  </v-btn>
                </v-slide-group-item>
              </v-slide-group>
            </v-sheet>
          </div>
          <div class="ods__mini__card">
            <h3>Description</h3>
            <div v-html="ricercaPerQuery['summary']"></div>
          </div>
        </div>
        <div class="navbar__laterale__post">
          <div class="navbar__laterale__post__inside ">
            <div>
              <div class="ods__mini__card">
                <h3  style="margin-bottom: 1vh;">Ingredients</h3>
                <div style="margin: .5vh;" v-for="(data, index) in ricercaPerQuery['extendedIngredients']">



                  <!-- Non ho usato le proprietà dell'oggetto "data" perchè mi da' errore che non trova la sezione 
                   interna dell'oggetto finchè non mi viene popolato post chiamata all'API. Quindi quello che faccio
                   è andare a cercare all'interno dell'oggetto sezione per sezione ogni volta, più brutto però almeno non da' errori
                   che poi vabbè sono errori che non mi fermano il funzionamento del codice perà danno fastidio da vedere. -->
                  
                  
                   <a
                    ><strong style="color: var(--root__green);">{{ ricercaPerQuery['extendedIngredients'][index]["name"] }}: </strong></a
                  >
                  <a>{{ ricercaPerQuery['extendedIngredients'][index]["original"]  }}</a>
                </div>
              </div>
              <div class="ods__mini__card">
                <h3>Add to your diet</h3>
                <a style="color: var(--root__green__trasparent);">click to add to your diet</a>
                <div
                  style="cursor: pointer"
                  class="ods__mini__card"
                  @click="likeScrittura('breakfast')"
                  :style="{
                    background: liked.breakfast
                      ? 'var(--root__green)'
                      : 'var(--color-text)',
                  }"
                >
                  <strong
                    :style="{ color: liked.breakfast ? '#ffffff' : '#000000' }"
                    >breakfast</strong
                  >
                </div>
                <div
                  style="cursor: pointer"
                  class="ods__mini__card"
                  @click="likeScrittura('lunch')"
                  :style="{
                    background: liked.lunch ? 'var(--root__green)' : 'var(--color-text)',
                  }"
                >
                  <strong
                    :style="{ color: liked.lunch ? '#ffffff' : '#000000' }"
                    >lunch</strong
                  >
                </div>
                <div
                  style="cursor: pointer"
                  class="ods__mini__card"
                  @click="likeScrittura('dinner')"
                  :style="{
                    background: liked.dinner ? 'var(--root__green)' : 'var(--color-text)',
                  }"
                >
                  <strong
                    :style="{ color: liked.dinner ? '#ffffff' : '#000000' }"
                    >dinner</strong
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import DataService from "../dataservice";

import { doc, deleteDoc, setDoc, getDoc } from "firebase/firestore";
export default {
  name: "HomeView",
  data() {
    return {
      // Ricerca normale
      ricercaPerQuery: null,
      query: "",
      ricetta: this.$route.query.cuisine,
      user: localStorage.getItem("login"),
      liked: { breakfast: false, lunch: false, dinner: false },
    };
  },

  methods: {
    async fetchNormalSearch() {
      this.ricercaPerQuery = null;
      // Chiamata API per la riceamp-§ormale
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${this.$route.query.id}/information?apiKey=1333d6e03cb34a15bd64e7ad984cb3a2`
      );
      const data = await response.json();
      this.ricercaPerQuery = data;
    },
    checkIfLiked: async function (pasto: string) {
      const docRefUt = doc(
        DataService.dbEx(),
        "likes_giari_" + pasto,
        this.user + "_oppla_" + this.$route.query.id
      );
      const docSnap = await getDoc(docRefUt);

      if (docSnap.exists()) {
        switch (pasto) {
          case "breakfast":
            this.liked.breakfast = true;
            break;
          case "lunch":
            this.liked.lunch = true;
            break;
          case "dinner":
            this.liked.dinner = true;
            break;
        }
      } else {
        switch (pasto) {
          case "breakfast":
            this.liked.breakfast = false;
            break;
          case "lunch":
            this.liked.lunch = false;
            break;
          case "dinner":
            this.liked.dinner = false;
            break;
        }
      }
    },
    likeScrittura: async function (pasto: string) {
      if (this.user) {
        console.log(this.liked);
        if (pasto == "breakfast") {
          if (this.liked.breakfast) {
            await this.unlikeImage(pasto);
          } else {
            await this.likeImage(pasto);
          }
        } else if (pasto == "dinner") {
          if (this.liked.dinner) {
            await this.unlikeImage(pasto);
          } else {
            await this.likeImage(pasto);
          }
        } else if (pasto == "lunch") {
          if (this.liked.lunch) {
            await this.unlikeImage(pasto);
          } else {
            await this.likeImage(pasto);
          }
        }
      }
    },
    unlikeImage: async function (pasto: string) {
      deleteDoc(
        doc(
          DataService.dbEx(),
          "likes_giari_" + pasto,
          this.user + "_oppla_" + this.$route.query.id
        )
      ).then(() => {
        this.checkIfLiked(pasto);
      });
    },
    likeImage: async function (pasto: string) {
      const docRef = await setDoc(
        doc(
          DataService.dbEx(),
          "likes_giari_" + pasto,
          this.user + "_oppla_" + this.$route.query.id
        ),
        {
          userId: this.user,
          postId: this.$route.query.id,
        }
      );
      this.checkIfLiked(pasto);
    },
  },

  mounted() {
    this.fetchNormalSearch();
    this.checkIfLiked("dinner");
    this.checkIfLiked("lunch");
    this.checkIfLiked("breakfast");
  },
};
</script>

<style>
@import "../assets/general.css";
.navbar__laterale__post__inside {
  position: fixed;
  height: 800px;
  overflow-y: scroll;
}

.container__ricetta__inside {
  display: grid;
  grid-template-columns: 1fr 0.5fr;
  grid-template-rows: 1fr;
  grid-template-areas: ". .";
}

.container__ricetta {
  margin: 4vh;
}
</style>
