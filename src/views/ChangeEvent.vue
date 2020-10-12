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
      <v-row>
        <v-col cols="6">
          <v-text-field
            :value="getEventStart"
            @input="updateStart"
            type="date"
            label="開始日"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            :value="getEventStartTime"
            @input="updateStartTime"
            type="time"
            label="開始時間"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field
            :value="getEventEnd"
            @input="updateEnd"
            type="date"
            label="終了日"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            :value="getEventEndTime"
            @input="updateEndTime"
            type="time"
            label="終了時間"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-select
        :value="getEventColor"
        @change="updateColor"
        :items="items"
        label="ラベルの色"
      ></v-select>
      <v-btn @click="updateEvent" color="primary" class="mr-3">
        update event
      </v-btn>
      <v-btn @click="deleteEvent" color="primary" class="mr-3">
        delete event
      </v-btn>
      <v-btn @click="calendar">戻る</v-btn>
    </v-form>
    <!-- updateEventのダイアログ -->
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">
          Success!
        </v-card-title>
        <v-card-text>
          予定を変更しました。
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="calendar">
            戻る
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- DeleteEventのダイアログ -->
    <v-dialog v-model="dialog2" max-width="290">
      <v-card>
        <v-card-title class="headline">
          Success!
        </v-card-title>
        <v-card-text>
          予定を削除しました。
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="calendar">
            戻る
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { API, graphqlOperation } from "aws-amplify";
import { updateEvent, deleteEvent } from "../graphql/mutations";
export default {
  data: () => ({
    dialog: false,
    dialog2: false,
    id: "",
    name: "",
    details: "",
    start: "",
    startTime: "",
    end: "",
    endTime: "",
    color: "",
    event: {},
    items: [
      { text: "赤", value: "red" },
      { text: "オレンジ", value: "orange" },
      { text: "黄色", value: "yellow" },
      { text: "緑", value: "green" },
      { text: "青", value: "blue" }
    ]
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
    getEventStartTime() {
      return this.$store.getters.getEventStartTime;
    },
    getEventEnd() {
      return this.$store.getters.getEventEnd;
    },
    getEventEndTime() {
      return this.$store.getters.getEventEndTime;
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
    updateStartTime(startTime) {
      this.$store.dispatch("updateStartTime", startTime);
    },
    updateEnd(end) {
      this.$store.dispatch("updateEnd", end);
    },
    updateEndTime(endTime) {
      this.$store.dispatch("updateEndTime", endTime);
    },
    updateColor(color) {
      this.$store.dispatch("updateColor", color);
    },
    async updateEvent() {
      this.id = this.$store.getters.getEventId;
      this.name = this.$store.getters.getEventName;
      this.details = this.$store.getters.getEventDetails;
      this.start = this.$store.getters.getEventStart;
      this.startTime = this.$store.getters.getEventStartTime;
      this.end = this.$store.getters.getEventEnd;
      this.endTime = this.$store.getters.getEventEndTime;
      this.color = this.$store.getters.getEventColor;
      let { id, name, details, start, startTime, end, endTime, color } = this;
      if (!name || !start) return;
      if (!end) {
        end = start;
      }
      this.event = { id, name, details, start, startTime, end, endTime, color };
      console.log(this.event);
      await API.graphql(graphqlOperation(updateEvent, { input: this.event }));
      this.dialog = true;
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
      this.dialog2 = true;
    }
  }
};
</script>
