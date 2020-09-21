<template>
  <v-card class="hidden-sm-and-up">
    <v-footer fixed class="pa-0">
      <v-card flat tile width="100%" color="primary" class="text-center" dark>
        <v-card-text>
          <v-btn v-for="icon in icons" :key="icon" class="mx-5" icon>
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    icons: ["mdi-home", "mdi-email", "mdi-calendar", "mdi-delete"]
  })
};
</script>
