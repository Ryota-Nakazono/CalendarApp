<template>
  <v-container>
    <v-form>
      <v-text-field
        v-model="name"
        type="text"
        label="予定のタイトル"
      ></v-text-field>
      <v-text-field v-model="details" type="text" label="詳細"></v-text-field>
      <v-switch v-model="allDay" label="終日" color="primary"></v-switch>
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="start" type="date" label="開始日">
          </v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field
            v-if="!allDay"
            v-model="startTime"
            label="開始時刻"
            type="time"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="end" type="date" label="終了日"></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field
            v-if="!allDay"
            v-model="endTime"
            label="終了時刻"
            type="time"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-select v-model="color" :items="items" label="ラベルの色"></v-select>
      <v-btn @click="createEvent" color="primary" class="mr-4">
        create event
      </v-btn>
      <v-btn @click="calendar">戻る</v-btn>
    </v-form>
    <!-- CreateEventのダイアログ -->
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">
          Success!
        </v-card-title>
        <v-card-text>
          予定を作成しました。
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
import { createEvent } from "../graphql/mutations";
export default {
  data() {
    return {
      dialog: false,
      name: "",
      details: "",
      allDay: "",
      start: "",
      startTime: "",
      end: "",
      endTime: "",
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
      let {
        name,
        details,
        allDay,
        start,
        startTime,
        end,
        endTime,
        color
      } = this;
      if (!name || !start) return;
      if (!end) {
        end = start;
      }
      if (startTime) {
        start = start + "T" + startTime;
      }
      if (endTime) {
        end = end + "T" + endTime;
      }
      this.event = { name, details, allDay, start, end, color };
      await API.graphql(graphqlOperation(createEvent, { input: this.event }));
      console.log(this.event);
      this.dialog = true;
    },
    calendar() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>
