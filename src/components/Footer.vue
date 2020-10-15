<template>
  <v-card class="hidden-sm-and-up" dark>
    <v-footer fixed class="pa-0">
      <v-card flat tile width="100%" color="primary" class="text-center">
        <v-card-text>
          <v-btn
            v-for="item in items"
            :key="item.title"
            :to="item.link"
            class="mx-3"
            text
          >
            {{ item.title }}
          </v-btn>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: "ホーム", link: "/" },
      { title: "新規作成", link: "/newEvent" },
      { title: "勤務日", link: "/workDay" }
    ]
  })
};
</script>
