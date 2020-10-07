<template>
  <v-container>
    <v-form>
      <v-text-field
        :value="getEventName"
        @input="updateName"
        type="text"
        label="予定のタイトル"
      >
      </v-text-field>
      <v-text-field
        :value="getEventDetails"
        @input="updateDetails"
        type="text"
        label="詳細"
      ></v-text-field>
      <v-text-field
        :value="getEventStart"
        @input="updateStart"
        type="date"
        label="開始時刻"
      ></v-text-field>
      <v-text-field
        :value="getEventEnd"
        @input="updateEnd"
        type="date"
        label="終了時刻"
      ></v-text-field>
      <v-select
        :value="getEventColor"
        @change="updateColor"
        :items="items"
        label="ラベルの色"
      ></v-select>
      <v-btn @click="updateEvent" color="primary" class="mr-3">
        update event
      </v-btn>
      <v-btn @click="deleteEvent" type="submit" color="primary" class="mr-3">
        delete event
      </v-btn>
      <v-btn @click="calendar">戻る</v-btn>
    </v-form>
    <div>
      <h2>{{ name }}</h2>
      <h2>{{ details }}</h2>
      <h2>{{ start }}</h2>
      <h2>{{ end }}</h2>
      <h2>{{ color }}</h2>
    </div>
  </v-container>
</template>

<script>
import { API, graphqlOperation } from "aws-amplify";
import { updateEvent, deleteEvent } from "../graphql/mutations";
export default {
  data: () => ({
    id: "",
    name: "",
    details: "",
    start: "",
    end: "",
    color: "",
    event: {},
    items: ["red", "blue", "黄色", "緑", "青", "グレイ"]
  }),
  computed: {
    getEventName() {
      return this.$store.getters.getEventName;
    },
    getEventDetails() {
      return this.$store.getters.getEventDetails;
    },
    getEventStart() {
      return this.$store.getters.getEventStart;
    },
    getEventEnd() {
      return this.$store.getters.getEventEnd;
    },
    getEventColor() {
      return this.$store.getters.getEventColor;
    }
  },
  methods: {
    updateName(name) {
      this.$store.dispatch("updateName", name);
    },
    updateDetails(details) {
      this.$store.dispatch("updateDetails", details);
    },
    updateStart(start) {
      this.$store.dispatch("updateStart", start);
    },
    updateEnd(end) {
      this.$store.dispatch("updateEnd", end);
    },
    updateColor(color) {
      this.$store.dispatch("updateColor", color);
      console.log(color);
    },
    async updateEvent() {
      this.id = this.$store.getters.getEventId;
      this.name = this.$store.getters.getEventName;
      this.details = this.$store.getters.getEventDetails;
      this.start = this.$store.getters.getEventStart;
      this.end = this.$store.getters.getEventEnd;
      this.color = this.$store.getters.getEventColor;
      const { id, name, details, start, end, color } = this;
      if (!name || !start || !end) return;
      this.event = { id, name, details, start, end, color };
      console.log(this.event);
      await API.graphql(graphqlOperation(updateEvent, { input: this.event }));
    },
    calendar() {
      this.$router.push({ path: "/" });
    },
    async deleteEvent() {
      await API.graphql(
        graphqlOperation(deleteEvent, {
          input: { id: this.$store.getters.getEventId }
        })
      );
    }
  }
};
</script>
