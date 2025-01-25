<template>
  <v-app>
    <v-main>
  <MyNavbar/>
  <RouterView />
    </v-main>
  </v-app>
</template>

<script  lang="ts">
import { RouterView } from 'vue-router'
import MyNavbar from "./components/navbar.vue";

export default {
  components: {
    MyNavbar,
  },
}

</script>
