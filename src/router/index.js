import Vue from "vue";
import VueRouter from "vue-router";
import Calendar from "../views/Calendar.vue";
import NewEvent from "../views/NewEvent.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "calendar",
    component: Calendar
  },
  {
    path: "/newEvent",
    name: "newEvent",
    component: NewEvent
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
