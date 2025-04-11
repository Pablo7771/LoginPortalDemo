import Vue from "vue";
import VueRouter from "vue-router";
import LoginForm from "@/components/LoginForm.vue";
import RegisterForm from "@/components/RegisterForm.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: LoginForm,
    children: [
      {
        path: "",
        name: "login-form",
        component: LoginForm,
      },
      {
        path: "/register-form",
        name: "register-form",
        component: RegisterForm,
      },
    ],
  },
  {
    path: "*",
    redirect: "/login",
  }
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});

export default router;
