<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat>
          <v-btn outlined class="mr-2 hidden-xs-only">
            <router-link to="/newEvent">新規作成</router-link>
          </v-btn>
          <v-btn outlined class="mr-2 hidden-xs-only">
            <router-link to="/workDay">勤務日登録・削除</router-link>
          </v-btn>
          <v-btn
            outlined
            class="mr-2 hidden-xs-only"
            color="grey darken-2"
            @click="setToday"
          >
            Today
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="450">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-btn icon>
                <v-icon v-on:click="changeEvent">mdi-pencil</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <h3 v-if="startTime">{{ startTime }} ～ {{ endTime }}</h3>
              <p>{{ this.selectedEvent.details }}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false">
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import { API } from "aws-amplify";
import { listEvents } from "../graphql/queries";
export default {
  async created() {
    this.getEvents();
  },
  data: () => ({
    isActive: false,
    workDay: "",
    start: "",
    startTime: "",
    end: "",
    endTime: "",
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days"
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    defaultColor: "grey darken-4"
  }),
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      if (event.color) {
        return event.color;
      } else {
        return this.defaultColor;
      }
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        console.log(event);
        this.start = this.selectedEvent.start;
        this.startTime = this.selectedEvent.startTime;
        this.end = this.selectedEvent.end;
        this.endTime = this.selectedEvent.endTime;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => {
          this.selectedOpen = true;
        }, 10);
      };
      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }
      nativeEvent.stopPropagation();
    },
    changeEvent() {
      this.$store.dispatch("todayEventId", this.selectedEvent.id);
      this.$store.dispatch("todayEventName", this.selectedEvent.name);
      this.$store.dispatch("todayEventDetails", this.selectedEvent.details);
      this.$store.dispatch("todayEventAllDay", this.selectedEvent.allDay);
      this.$store.dispatch(
        "todayEventStart",
        this.selectedEvent.start.slice(0, 10)
      );
      this.$store.dispatch("todayEventStartTime", this.selectedEvent.startTime);
      this.$store.dispatch(
        "todayEventEnd",
        this.selectedEvent.end.slice(0, 10)
      );
      console.log(this.selectedEvent.end.slice(0, 10));
      this.$store.dispatch("todayEventEndTime", this.selectedEvent.endTime);
      this.$store.dispatch("todayEventColor", this.selectedEvent.color);
      this.$router.push({ name: "changeEvent", path: "/changeEvent" });
    },
    async getEvents() {
      const events = [];
      const allGetEvents = await API.graphql({
        query: listEvents
      });
      const eventItems = allGetEvents.data.listEvents.items;
      for (let i = 0; i < eventItems.length; i++) {
        events.push({
          id: eventItems[i].id,
          name: eventItems[i].name,
          start: eventItems[i].start,
          startTime: eventItems[i].start.slice(11, 16),
          end: eventItems[i].end,
          endTime: eventItems[i].end.slice(11, 16),
          details: eventItems[i].details,
          color: eventItems[i].color,
          timed: !eventItems[i].allDay,
          allDay: eventItems[i].allDay
        });
        console.log(events[i].timed);
      }
      this.events = events;
    }
  }
};
</script>
