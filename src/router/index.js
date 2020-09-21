import Vue from "vue";
import VueRouter from "vue-router";
import Calendar from "../views/Calendar.vue";
import NewEvent from "../views/NewEvent.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Calendar",
    component: Calendar
  },
  {
    path: "/NewEvent",
    name: "NewEvent",
    component: NewEvent
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
