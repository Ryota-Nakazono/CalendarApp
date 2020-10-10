<template>
  <v-container>
    <v-form>
      <v-text-field v-model="name" type="text" disabled></v-text-field>
      <v-text-field
        v-model="start"
        type="date"
        label="１当務目の日付"
      ></v-text-field>
      <v-btn @click="createEvent" color="primary" class="mr-4">
        一括登録
      </v-btn>
      <v-btn @click="deleteEvent" color="primary" class="mr-4">
        一括削除
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
          2交代制の勤務日をカレンダーに一括で出力しました。
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
          勤務日の予定を全て削除しました。
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
import { createEvent, deleteEvent } from "../graphql/mutations";
import { listEvents } from "../graphql/queries";
export default {
  async created() {
    this.getEvents();
  },
  data() {
    return {
      dialog: false,
      dialog2: false,
      name: "勤務日",
      start: "",
      end: "",
      event: {},
      color: "grey"
    };
  },
  methods: {
    async createEvent() {
      let { name, start, end, color } = this;
      if (!name || !start) return;
      for (let d = 1; d <= 5; d++) {
        start = new Date(this.start);
        console.log(this.start);
        start.setDate(start.getDate() - 6);
        start.setDate(start.getDate() + 6 * d);
        start = start.toISOString().split("T")[0];
        end = start;
        this.event = { name, start, end, color };
        await API.graphql(graphqlOperation(createEvent, { input: this.event }));
      }
      for (let d = 1; d <= 5; d++) {
        start = new Date(this.start);
        start.setDate(start.getDate() - 4);
        start.setDate(start.getDate() + 6 * d);
        start = start.toISOString().split("T")[0];
        end = start;
        this.event = { name, start, end, color };
        await API.graphql(graphqlOperation(createEvent, { input: this.event }));
      }
      this.dialog = true;
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
      this.dialog2 = true;
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
