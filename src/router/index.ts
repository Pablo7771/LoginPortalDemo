import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import LoginForm from "@/views/LoginForm.vue";
import RegisterForm from "@/views/RegisterForm.vue";
import Templates from "@/views/Templates.vue";

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
        path: "/templates",
        name: "templates",
        component: Templates
    },
    {
        path: "*",
        redirect: "/",
    }

];

const router = new VueRouter({
    mode: "hash",
    routes,
});

export default router;