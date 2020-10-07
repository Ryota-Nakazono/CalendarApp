<template>
  <v-container>
    <v-form>
      <v-text-field v-model="name" type="text" label="勤務日"></v-text-field>
      <v-text-field
        v-model="start"
        type="date"
        label="勤務日を選択"
      ></v-text-field>
      <v-btn @click="createEvent" type="submit" color="primary" class="mr-4">
        パターンを登録する
      </v-btn>
      <v-btn @click="deleteEvent" color="primary" class="mr-4">
        パターンを削除する
      </v-btn>
      <v-btn @click="calendar">戻る</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { API, graphqlOperation } from "aws-amplify";
import { createEvent, deleteEvent } from "../graphql/mutations";
import { listEvents } from "../graphql/queries";
export default {
  async created() {
    this.getEvents();
  },
  data() {
    return {
      name: "",
      start: "",
      end: "",
      event: {},
      color: "grey"
    };
  },
  methods: {
    async createEvent() {
      let { name, start, color } = this;
      if (!name || !start) return;
      for (let d = 1; d <= 5; d++) {
        start = new Date(this.start);
        start.setDate(start.getDate() - 6);
        start.setDate(start.getDate() + 6 * d);
        start = start.toISOString().split("T")[0];
        this.event = { name, start, color };
        await API.graphql(graphqlOperation(createEvent, { input: this.event }));
      }
      for (let d = 1; d <= 5; d++) {
        start = new Date(this.start);
        start.setDate(start.getDate() - 4);
        start.setDate(start.getDate() + 6 * d);
        start = start.toISOString().split("T")[0];
        this.event = { name, start, color };
        await API.graphql(graphqlOperation(createEvent, { input: this.event }));
      }
    },
    calendar() {
      this.$router.push({ path: "/" });
    },
    async deleteEvent() {
      for (let i = 0; i < this.events.length; i++) {
        this.event = this.events[i];
        await API.graphql(
          graphqlOperation(deleteEvent, {
            input: { id: this.event.id }
          })
        );
      }
    },
    async getEvents() {
      const events = await API.graphql(
        graphqlOperation(listEvents, { filter: { color: { eq: "grey" } } })
      );
      this.events = events.data.listEvents.items;
    }
  }
};
</script>
