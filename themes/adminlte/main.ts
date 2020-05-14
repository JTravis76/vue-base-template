import Vue from "vue";
import router from "@/router/index";
import store from "@/store/index";
import App from "@/App.vue";

import "@/filters";
import "./scss/index.scss";

import UserRoles from "./plugins/user-in-role";
import MenuTree from "./plugins/menu-tree";
import BoxWidget from "./plugins/box-widget";
import Toast from "./plugins/toast-notification";

Vue.use(UserRoles);
Vue.use(MenuTree);
Vue.use(BoxWidget);
Vue.use(Toast, { position: "top", duration: 5000 });

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    created() {
        // let vm = this as Vue;
        // vm.$store.commit("profile/Info", {});
        // vm.$store.commit("profile/User", {});
        // vm.$store.commit("profile/Role", {});
    },
    render: h => h(App)
}).$mount("#app");
