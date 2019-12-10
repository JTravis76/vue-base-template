import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import NotFound from "../views/not-found";

Vue.use(VueRouter);

let routes: RouteConfig[] = [
    { path: "/", redirect: "/home" },
    { path: "*", component: NotFound },
    { path: "/home", component: Home },
    { path: "/about", component: About }
]

const router = new VueRouter({
    routes,
    mode: "hash"
})

router.beforeEach((to, from, next) => {
    // Do Route Actions Here

    next();
})

export default router;