<template>
  <amplify-authenticator>
    <v-app>
      <AfterLogin></AfterLogin>
    </v-app>
    <amplify-sign-out></amplify-sign-out>
  </amplify-authenticator>
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
