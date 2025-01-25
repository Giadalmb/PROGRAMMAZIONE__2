<template>
  <div class="profilo__container__generale">
  <div class="profilo__upper" v-if="arrayUtenti">
    <div
      class="profilo__upper__sez__uno"
      :style="{
        backgroundImage: 'url(' + arrayUtenti['profile_picture_url'] + ')',
      }"
    ></div>
    <div class="profilo__upper__sez__due">
      <div>
        <h1>Bienvenido</h1>
        <h1 style="margin-top: -20px" class="h1__big">
          {{ arrayUtenti["username"] }}
        </h1>
      </div>
      <div>
        <h4
          v-if="user == ':' + user__local"
          @click="$router.push({ name: 'modificaProfilo' })"
          style="cursor: pointer"
        >
          Modifica profilo
        </h4>
      </div>
      <!--           <div>
        <h3>{{ this.arrayUtenti.bio }}</h3>
      </div> -->
    </div>
  </div>
  <div class="profilo__container">
    <div>
      <div class="profilo__centro">
        <div>
          <div class="gallery-image">
            <div
              class="ods__mini__card" style="cursor:pointer"
              v-for="(pasti,i) in arrayPasti"
              @click="sezioneSalvati = i"
            >
              <h3>{{ pasti }}</h3>
            </div>
          </div>
          <div>
            <v-row>
              <v-col cols="12" md="3" v-for="ricetta in arraySalvati[sezioneSalvati]">
                <v-card
                  class="mx-auto my-2 ods__mini__card"
                  max-width="300"
                  @click="
                    $router.push({
                      path: '/ricetta',
                      query: { cuisine: ricetta['title'], id: ricetta['id'] },
                    })
                  "
                >
                  <v-img
                    class="ods__mini__card"
                    :src="ricetta['image']"
                    height="200px"
                    cover
                  ></v-img>
                  <v-card-title class="text-h6 text-center">
                    {{ ricetta["title"] }}
                  </v-card-title>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </div>
      </div>
    </div>
    <div class="ods__mini__card">
        <h2>Salvati</h2>
    </div>
  </div>
</div>
</template>

<style>

.profilo__container__generale{
  margin:8vh 5vh 8vh 5vw
}

.gallery-image {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
}

.img-box {
  box-sizing: content-box;
  margin: 10px;
  height: 250px;
  width: 350px;
  position: relative;
}

.profilo__upper {
  display: flex;
}

.profilo__upper div {
  margin: 1vw;
}

.profilo__container {
  display: grid;
  grid-template-columns: 1fr 0.5fr;
  grid-template-rows: 1fr;
  grid-template-areas: ". .";
  margin-top: 3vw;
}

.profilo__upper__sez__uno {
  background-size: cover;
  border: 1px solid var(--root__green__trasparent);
  width: 100px;
  height: 100px;
  border-radius: 100px;
}

@media only screen and (max-width: 600px) {
  .profilo__upper__sez__due div:first-of-type {
    display: block;
    align-items: center;
  }
}

@media only screen and (max-width: 1200px) {
  .profilo__upper__sez__due span {
    margin-left: 0vw !important;
  }

  .profilo__uppersez__due div:first-of-type {
    display: block;
    align-items: center;
  }
}
</style>

<script lang="ts">
import DataService from "../dataservice";
import { collection, getDocs } from "firebase/firestore";

export default {
  name: "ProfiloView",
  data() {
    return {
      commentotxt: "",
      arrayUtenti: null,
      arraySalvati: [[] as any[], [] as any[], [] as any[]],
      arrayPasti: ["breakfast", "lunch", "dinner"],
      user: this.$route.query.id,
      sezioneSalvati: 0,
      user__local: localStorage.getItem("login"),
    };
  },
  methods: {
    async takeUsers() {
      const querySnapshot = await getDocs(
        collection(DataService.dbEx(), "utenti")
      );
      querySnapshot.forEach((doc: any) => {
        if (doc.id == this.$route.query.id) {
          this.arrayUtenti = { id: doc.id, ...doc.data() };
        }
      });
    },

    async takeUserPost() {
      this.arrayPasti = ["breakfast", "lunch", "dinner"];
      for (let i = 0; i < this.arrayPasti.length; i++) {
        const querySnapshot = await getDocs(
          collection(DataService.dbEx(), "likes_" + this.arrayPasti[i])
        );
        querySnapshot.forEach((doc) => {
          if (doc.data().userId == this.$route.query.id) {
            this.artworkData(doc.data().postId, this.arrayPasti[i]);
          }
        });
      }
      console.log(this.arraySalvati);
    },
    async artworkData(title: any, pasto: any) {
      // Chiamata API per la riceamp-§ormale
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${title}/information?apiKey=1333d6e03cb34a15bd64e7ad984cb3a2`
      );
      const data = await response.json();
      if (pasto == "breakfast") {
        this.arraySalvati[0].push(data);
      } else if (pasto == "lunch") {
        this.arraySalvati[1].push(data);
      } else {
        this.arraySalvati[2].push(data);
      }
    },
  },

  mounted() {
    this.takeUsers();
    this.takeUserPost();
  },
};
</script>
