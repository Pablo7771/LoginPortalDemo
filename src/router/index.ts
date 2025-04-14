import Vue                        from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import LoginForm                 from "@/components/LoginForm.vue";
import RegisterForm              from "@/components/RegisterForm.vue";
import Templates                 from "@/views/Templates.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "login",
    component: LoginForm,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterForm,
  },
  {
    path: "/no-signed",
    name: "no-signed",
    component: Templates
  }
  
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
