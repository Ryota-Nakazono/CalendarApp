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
      <!-- <v-text-field
        v-model="color"
        type="color"
        label="color (click to open color menu)"
      ></v-text-field> -->
      <v-btn @click="createEvent" type="submit" color="primary" class="mr-4">
        create event
      </v-btn>
      <v-btn @click="deleteEvent" type="submit" color="primary" class="mr-4">
        delete event
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
      details: "",
      start: "",
      end: "",
      event: {},
      events: []
    };
  },
  methods: {
    async createEvent() {
      const { name, details, start, end } = this;
      if (!name || !start || !end) return;
      this.event = { name, details, start, end };
      this.events = [...this.events, this.event];
      await API.graphql(graphqlOperation(createEvent, { input: this.event }));
    },
    calendar() {
      this.$router.push({ path: "/" });
    },
    async deleteEvent() {
      await API.graphql(
        graphqlOperation(deleteEvent, {
          input: { id: this.events[0].id }
        })
      );
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
