<template>
  <MyNavbar />
  <div class="container__generale__router profilo__container">
    <div>
      <div class="profilo__upper">
        <div
          class="profilo__upper__sez__uno"
          :style="{
            backgroundImage:
              'url(' + this.arrayUtenti.profile_picture_url + ')',
          }"
        ></div>
        <div class="profilo__upper__sez__due">
          <div>
            <h1 style="margin-top: -20px">Bienvenido</h1>
            <h1 style="margin-top: -20px" class="h1__big">
              {{ this.arrayUtenti.username }}
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
      <div class="profilo__centro">
        <div class="gallery-image">
          <div
            v-for="cucina in this.arraySalvati"
            class="ods__card ods__card__little img-box"
          >
            <div
              v-for="piatto in cucina"
              @click="
                $router.push({
                  path: '/ricetta',
                  query: { cuisine: piatto.title, id: piatto.id },
                })
              "
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
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
  border: 1px solid var(--color-text);
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
import MyNavbar from "../components/navbar.vue";
import { collection, getDocs } from "firebase/firestore";
export default {
  name: "ProfiloView",
  components: {
    MyNavbar,
  },
  data() {
    return {
      commentotxt: "",
      arrayUtenti: ({} = {}),
      arraySalvati: [[], [], []],
      user: this.$route.params.userId,
      user__local: localStorage.getItem("login"),
    };
  },
  methods: {
    async takeUsers() {
      console.log("entrato");
      const querySnapshot = await getDocs(collection(DataService.dbEx(), "utenti"));
       querySnapshot.forEach((doc:any) => {
        if (doc.id == this.$route.params.userId) {
          this.arrayUtenti = { id: doc.id, ...doc.data() };
        }
      });
    },

    async takeUserPost() {
      let pasti = ["breakfast", "lunch", "dinner"];
      for(let i = 0; i<pasti.length; i++){
        const querySnapshot = await getDocs(
          collection(DataService.dbEx(), "likes_" + pasti[i])
        );
        querySnapshot.forEach((doc) => {
          if (doc.data().userId == this.$route.params.userId) {
            this.artworkData(doc.data().postId, pasti[i]);
          }
        });
      }
    },
    async artworkData(title:any, pasto:any) {
      // Chiamata API per la riceamp-§ormale
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${title}/information?apiKey=1333d6e03cb34a15bd64e7ad984cb3a2`
      );
      const data = await response.json();
      if (pasto == "breakfast") {
        this.arraySalvati[0].append(data.results);
      } else if (pasto == "lunch") {
        this.arraySalvati[1].append(data.results);
      } else {
        this.arraySalvati[2].append(data.results);
      }
    },

    mounted() {
      this.takeUsers();
      this.takeUserPost();
    },
  },
};
</script>
