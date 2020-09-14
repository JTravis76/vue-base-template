import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
//import store from "@/store/index";
// Default Home Section
import Home from "../views/home/index.vue";
import About from "../views/home/about.vue";
import NotFound from "../views/home/not-found.vue";
import ErrorPage from "../views/home/error.vue";
// Account Management Section
import UserProfile from "../views/account/user-profile.vue";
import NCManager from "../views/account/nc-manager.vue";
// Administrative Section
import Config from "../views/admin/config.vue";
import EmailGroup from "../views/admin/group.vue";
import OnlineUser from "../views/admin/online-users.vue";

Vue.use(VueRouter);

let routes: RouteConfig[] = [
    { path: "/", redirect: "/home" },
    { path: "*", name: "Not Found", component: NotFound },
    { path: "/home", name: "Home", component: Home, meta: { description: "Home Sweet Home" } },
    { path: "/about", name: "About", component: About, meta: { description: "Details about this application" } },
    { path: "/error", name: "Error", component: ErrorPage, meta: { description: "" } },
    { path: "/userprofile", name: "User Profile", component: UserProfile, meta: { description: "Little something about me"} },
    { path: "/ncmanager", name: "NC Manager", component: NCManager, meta: { description: "Manage users and roles"} },
    { path: "/settings", name: "Configurations", component: Config, meta: { description: "Site-wide appplication settings"} },
    { path: "/emailgroups", name: "Email Groups", component: EmailGroup, meta: { description: "Collection of Email Groups"} },
    { path: "/onlineusers", name: "Who's Online", component: OnlineUser, meta: { description: "List of users using the application"} }
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