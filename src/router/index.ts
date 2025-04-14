import Vue from "vue";
import VueRouter from "vue-router";
import LoginLayout from "@/layouts/LoginLayout.vue";
import LoginForm from "@/components/LoginForm.vue";
import RegisterForm from "@/components/RegisterForm.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: LoginLayout,
    children: [
      {
        path: "",
        name: "login-layout",
        component: LoginLayout,
      }
    ],
  },
  {
    path: "*",
    redirect: "/login",
  },
  {
    path: "/register-form",
    name: "register",
    component: RegisterForm,
  },
  {
    path: "/login-form",
    name: "login",
    component: LoginForm,
  }
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});

export default router;
