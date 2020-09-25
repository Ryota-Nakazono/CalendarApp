import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import NewEvent from "../views/NewEvent.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
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
