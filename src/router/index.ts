import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import LoginForm from "@/views/LoginForm.vue";
import RegisterForm from "@/views/RegisterForm.vue";
import Templates from "@/views/Templates.vue";

Vue.use(VueRouter); 

const routes: Array<RouteConfig> = [
    {
        path: "/login",
        name: "login",
        component: LoginForm,
    },
    {
        path: "/register",
        name: "register",
        component: RegisterForm,
    },
    {
        path: "/no-signed-up",
        name: "no-signed-up",
        component: Templates
    },
    {
        path: "*",
        redirect: "/login",
    }

];

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;