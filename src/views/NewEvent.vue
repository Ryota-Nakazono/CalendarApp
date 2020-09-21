<template>
  <v-container>
    <v-form @submit.prevent="addEvent">
      <v-text-field
        v-model="name"
        type="text"
        label="イベント名を入力"
      ></v-text-field>
      <v-text-field v-model="details" type="text" label="詳細"></v-text-field>
      <v-text-field v-model="start" type="date" label="start"></v-text-field>
      <v-text-field v-model="end" type="date" label="end"></v-text-field>
      <v-text-field
        v-model="color"
        type="color"
        label="color (click to open color menu)"
      ></v-text-field>
      <v-btn @click="creatEvent" type="submit" color="primary" class="mr-4">
        create event
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    name: null,
    details: null,
    start: null,
    end: null,
    color: "#1976D2"
  }),
  methods: {
    createEvent: () => {
      console.log("イベントが作成されました");
    }
  }
};
</script>
