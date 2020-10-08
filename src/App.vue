<template>
  <v-app>
    <AfterLogin></AfterLogin>
  </v-app>
</template>

<script>
import AfterLogin from "./layouts/AfterLogin";
export default {
  name: "App",
  components: {
    AfterLogin
  }
};
</script>
