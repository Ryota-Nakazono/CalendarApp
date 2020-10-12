<template>
  <div class="authenticator">
    <amplify-authenticator>
      <div class="authenticated-container">
        <v-app>
          <AfterLogin></AfterLogin>
        </v-app>
      </div>
    </amplify-authenticator>
  </div>
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
<style lang="scss" scoped>
div.authenticator {
  margin-top: 50px;
  text-align: center;
}
div.authenticated-container {
  margin-top: -45px;
  text-align: initial;
}
</style>
