import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
//import store from "@/store/index";

import Home from "../views/Home.vue";
import About from "../views/About.vue";
import NotFound from "../views/not-found";

Vue.use(VueRouter);

let routes: RouteConfig[] = [
    { path: "/", redirect: "/home" },
    { path: "*", name: "Not Found", component: NotFound },
    { path: "/home", name: "Home", component: Home, meta: { description: "Home Sweet Home" } },
    { path: "/about", name: "About", component: About, meta: { description: "Details about this application" } }
]

const router = new VueRouter({
    routes,
    mode: "hash"
})

router.beforeEach((to, from, next) => {
    // Do Route Actions Here

    //if (store.state.pageLoading)
    //    store.commit('pageloader', false);

    // clear global errors
    //store.commit('validationSummary/Errors', []);

    next();
})

export default router;