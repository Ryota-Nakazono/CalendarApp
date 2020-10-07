<template>
  <v-app-bar app color="primary" dark>
    <v-spacer></v-spacer>
    <v-app-bar-nav-icon class="hidden-sm-and-up" @click.stop="drawer = !drawer">
    </v-app-bar-nav-icon>
    <v-toolbar-items class="hidden-xs-only">
      <v-btn v-for="item in items" :key="item.title" :to="item.link" text small>
        {{ item.title }}
      </v-btn>
    </v-toolbar-items>
    <v-navigation-drawer v-model="drawer" absolute temporary right>
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" :to="item.link">
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
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
        { title: "アプリの使い方", link: "/" },
        { title: "利用情報", link: "/" },
        { title: "お問い合わせ", link: "./contact" },
        { title: "ログアウト", link: "./logout" }
      ]
    };
  }
};
</script>
