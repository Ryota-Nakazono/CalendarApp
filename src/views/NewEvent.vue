<template>
  <v-container>
    <v-form>
      <v-text-field
        v-model="name"
        type="text"
        label="予定のタイトル"
      ></v-text-field>
      <v-text-field v-model="details" type="text" label="詳細"></v-text-field>
      <v-text-field v-model="start" type="date" label="開始時刻"></v-text-field>
      <v-text-field v-model="end" type="date" label="終了時刻"></v-text-field>
      <v-select v-model="color" :items="items" label="ラベルの色"></v-select>
      <v-btn @click="createEvent" type="submit" color="primary" class="mr-4">
        create event
      </v-btn>
      <v-btn @click="calendar">戻る</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { API, graphqlOperation } from "aws-amplify";
import { createEvent } from "../graphql/mutations";
import { listEvents } from "../graphql/queries";
export default {
  async created() {
    this.getEvents();
  },
  data() {
    return {
      name: "",
      details: "",
      start: "",
      end: "",
      event: {},
      color: "",
      items: [
        { text: "赤", value: "red" },
        { text: "オレンジ", value: "orange" },
        { text: "黄色", value: "yellow" },
        { text: "緑", value: "green" },
        { text: "青", value: "blue" }
      ]
    };
  },
  methods: {
    async createEvent() {
      const { name, details, start, end, color } = this;
      console.log(color);
      if (!name || !start || !end) return;
      this.event = { name, details, start, end, color };
      await API.graphql(graphqlOperation(createEvent, { input: this.event }));
    },
    calendar() {
      this.$router.push({ path: "/" });
    },
    async getEvents() {
      const events = await API.graphql({
        query: listEvents
      });
      this.events = events.data.listEvents.items;
      for (let i = 0; i < this.events.length; i++) {
        this.event = this.events[i];
      }
    }
  }
};
</script>
