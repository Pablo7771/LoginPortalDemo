import Vue                        from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import LoginView                  from "@/views/LoginView.vue";
import Registro                   from "@/views/Registro.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/registro",
    name: "registro",
    component: Registro,
  }
];

const router = new VueRouter({
  mode: "history",
  base: "/login",
  routes,
});

export default router;
