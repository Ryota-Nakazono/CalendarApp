<template>
  <v-main>
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </v-main>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
export default {
  components: {
    Header,
    Footer
  }
};
</script>
