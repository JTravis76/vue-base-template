import * as Vue from 'vue'
import * as VueRouter from "vue-router"
import store from "./store/index"
import Home from "./home/home"
import NotFound from "./home/NotFound"
import Error from "./home/Error"
import About from "./home/About"
import Profile from "./account/UserProfile"
import NCManager from "./account/NCManager"
import Settings from "./admin/Config"
import GroupType from "./admin/GroupType"
import EmailGroup from "./admin/Group"

Vue.use(VueRouter);

/* Breadcrumb: array of objects with name, link, and icon(optional) of ONLY the parent routes
 * Do NOT add current route, it will be picked up automatically */
let routes: RouteConfig[] = [
    { path: "/", redirect: "/home" },
    { path: "*", name: "Not Found", component: NotFound, meta: {breadcrumb: [{ name: "Home", link: "/home", icon: "fa fa-home" }]} },
    { path: "/home", name: "Home", component: Home, meta: { description: "Home Sweet Home" }},
    { path: "/about", name: "About", component: About, meta: { description: "Details about this application", breadcrumb: [{ name: "Home", link: "/home", icon: "fa fa-home" }] } },
    { path: "/error", name: "Error", component: Error, meta: { description: "", breadcrumb: [{ name: "Home", link: "/home", icon: "fa fa-home" }] } },
    { path: "/profile", name: "My Profile", component: Profile, meta: { description: "All things about me", breadcrumb: [{ name: "Home", link: "/home", icon: "fa fa-home" }, { name: "Account", link: "/account", icon: "" }] } },
    { path: "/ncmanager", name: "NC Manager", component: NCManager, meta: { description: "Manage users and roles", breadcrumb: [{ name: "Home", link: "/home", icon: "fa fa-home" }] } },
    { path: "/settings", name: "Configurations", component: Settings, meta: { description: "Global settings", breadcrumb: [{ name: "Home", link: "/home", icon: "fa fa-home" }, { name: "Admin", link: "/admin", icon: "" }] } },
    { path: "/grouptypes", name: "Group Type", component: GroupType, meta: { description: "Collection of Group Types", breadcrumb: [{ name: "Home", link: "/dashboard", icon: "fa fa-home" }, { name: "Admin", link: "/admin", icon: "" }] } },
    { path: "/emailgroups", name: "Email Groups", component: EmailGroup, meta: { description: "Collection of Email Groups", breadcrumb: [{ name: "Home", link: "/dashboard", icon: "fa fa-home" }, { name: "Admin", link: "/admin", icon: "" }] } }
];

export const router = new VueRouter({
    mode: "hash",
    linkActiveClass: "active",
    routes
});

router.beforeEach((to, from, next) => {
    if (store.state.pageLoading)
        store.commit('pageloader', false);

    //clear global errors
    store.commit('vaildation/errors', []);

    next();
  })