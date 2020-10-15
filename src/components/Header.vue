<template>
  <v-app-bar app color="primary" dark>
    <v-spacer></v-spacer>
    <v-app-bar-nav-icon class="hidden-sm-and-up" @click.stop="drawer = !drawer">
    </v-app-bar-nav-icon>
    <v-navigation-drawer v-model="drawer" app absolute temporary right>
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" :to="item.link">
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <amplify-sign-out @click="reload"></amplify-sign-out>
      </v-list>
    </v-navigation-drawer>
  </v-app-bar>
</template>

<script>
export default {
  data: () => {
    return {
      drawer: false,
      items: [
        { title: "ホーム", link: "/" },
        { title: "予定の作成", link: "/newEvent" },
        { title: "勤務日登録・削除", link: "/workDay" }
      ]
    };
  },
  methods: {
    reload() {
      location.reload(true);
    }
  }
};
</script>
