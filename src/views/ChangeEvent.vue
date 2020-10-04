<template>
  <v-container>
    <v-form>
      <v-text-field v-model="name" type="text" label="予定のタイトル">
      </v-text-field>
      <v-text-field v-model="details" type="text" label="詳細"></v-text-field>
      <v-text-field v-model="start" type="date" label="開始時刻"></v-text-field>
      <v-text-field v-model="end" type="date" label="終了時刻"></v-text-field>
      <!-- <v-text-field
        v-model="color"
        label="color"
      ></v-text-field> -->
      <v-btn @click="updateEvent" color="primary" class="mr-3">
        update event
      </v-btn>
      <v-btn @click="deleteEvent" color="primary" class="mr-3">
        delete event
      </v-btn>
      <v-btn @click="calendar">戻る</v-btn>
    </v-form>
    <div>
      <h2>{{ name }}</h2>
      <h2>{{ details }}</h2>
      <h2>{{ start }}</h2>
      <h2>{{ end }}</h2>
    </div>
  </v-container>
</template>

<script>
import { API, graphqlOperation } from "aws-amplify";
import { updateEvent, deleteEvent } from "../graphql/mutations";
export default {
  created() {
    this.getEvents();
  },
  data: () => ({
    id: "",
    name: "",
    details: "",
    start: "",
    end: "",
    event: {}
  }),
  methods: {
    getEvents() {
      this.id = this.$store.getters.getEventId;
      this.name = this.$store.getters.getEventName;
      this.details = this.$store.getters.getEventDetails;
      this.start = this.$store.getters.getEventStart;
      this.end = this.$store.getters.getEventEnd;
    },
    async updateEvent() {
      const { id, name, details, start, end } = this;
      if (!name || !start || !end) return;
      this.event = { id, name, details, start, end };
      console.log(this.event);
      await API.graphql(graphqlOperation(updateEvent, { input: this.event }));
    },
    calendar() {
      this.$router.push({ path: "/" });
    },
    async deleteEvent() {
      console.log(this.id);
      await API.graphql(
        graphqlOperation(deleteEvent, {
          input: { id: this.$store.getters.getEventId }
        })
      );
    }
  }
};
</script>
