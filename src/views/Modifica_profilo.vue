<template>
  <div class="container__generale__router">
    <div>
      <div style="display: flex">
        <div style="margin-right:4vw">
          <h1>Modifica profilo {{ this.arrayUtenti.username }}</h1>
          <h3 >{{ this.arrayUtenti.email }}</h3>
        </div>
        <button class="ods__mini__card__button" @click="logOut()">
          Logout
        </button>
      </div>
      <div class="sezione__alta">
        <div>
            <div :style="{ backgroundImage: 'url(' + imageUrl + ')' }" class="ods__previewImg" for="actual-btn">
                <label for="actual-btn"></label>
                <input hidden type="file" accept="image/*" id="actual-btn" @change="onFileChange" />
            </div>
            <div style="text-align:center">
                <button class="ods__mini__card__button" @click="uploadImage()"> Upload image </button>
            </div>
        </div>
      </div>
      <div class="ods__mini__card" style="margin: 6vh 0 6vh 0">
        <div>
          <v-form @submit.prevent="updateUtente" v-model="valid">
            <v-text-field
              class="ods__mini__card"
              v-model="this.arrayUtenti.username"
              :rules="rules"
              label="username"
            ></v-text-field>
            <!-- <v-text-field v-model="this.arrayUtenti.bio" label="bio"></v-text-field> -->

            <button class="ods__mini__card__button" type="submit" block>
              Salva modifiche
            </button>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { ref as refFire } from "firebase/storage";
import { onMounted } from "vue";
import { ref as refVue } from "vue";
import {
  collection,
  query,
  where,
  getFirestore,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  and,
  writeBatch,
  setDoc,
  getDoc,
} from "firebase/firestore";
import DataService from "../dataservice";
export default {
  data() {
    return {
      bio: "",
      email: "",
      idutente: "",
      profile_picture_url: "",
      username: "",
      arrayUtenti: ({} = {}),
      image: null,
      imageUrl: null,
    };
  },
  methods: {
    takeUsers: async function () {
      const querySnapshot = await getDocs(
        collection(DataService.dbEx(), "utenti_giari")
      );
      querySnapshot.forEach((doc) => {
        if (doc.id == this.$route.query.id) {
          this.arrayUtenti = { id: doc.id, ...doc.data() };
          this.imageUrl = doc.data().profile_picture_url;
        }
      });
    },
    updateUtente: function () {
      setDoc(doc(DataService.dbEx(), "utenti_giari", this.$route.query.id), {
        bio: this.arrayUtenti.bio,
        email: this.arrayUtenti.email,
        idutente: this.arrayUtenti.idutente,
        profile_picture_url: this.arrayUtenti.profile_picture_url,
        username: this.arrayUtenti.username,
      });
    },

    logOut: function () {
      DataService.logout();
      window.location.reload();
    },

    onFileChange(e) {
      const file = e.target.files[0];
      this.image = file;
      this.imageUrl = URL.createObjectURL(file);
    },
    async uploadImage() {
      if (!this.image) {
        alert("Scegli una immagine");
        return;
      }

      const storage = getStorage();
      const storageRef = ref(storage, "profile_images/" + this.$route.query.id);

      const uploadTask = uploadBytesResumable(storageRef, this.image);
      uploadTask.on(
        "state_changed",

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setDoc(doc(DataService.dbEx(), "utenti_giari", this.$route.query.id), {
              bio: this.arrayUtenti.bio,
              email: this.arrayUtenti.email,
              idutente: this.arrayUtenti.idutente,
              profile_picture_url: downloadURL,
              username: this.arrayUtenti.username,
            });
          });
        }
      );
    },
  },
  mounted() {
    this.takeUsers();
  },
};
</script>

<style>
.ods__previewImg {
  background-size: cover;
  border: 1px solid var(--root__green);
  width: 200px;
  height: 200px;
  border-radius: 200px;
}

.ods__previewImg label {
  display: block;
  width: 200px;
  height: 200px;
  border-radius: 200px;
}

.sezione__alta{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin:6vh 0 6vh 0
}
</style>
