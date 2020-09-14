import Vue from "vue";
import router from "@/router/index";
import store from "@/store/index";
import App from "@/App.vue";

import { IUserDto } from "../typings/application/netcenter";

import "@/filters";
import "./scss/index.scss";

import UserRoles from "./plugins/user-in-role";
import MenuTree from "./plugins/menu-tree";
import BoxWidget from "./plugins/box-widget";
import Toast from "./plugins/toast-notification";
import Dialog from "./plugins/dialog";

Vue.use(UserRoles);
Vue.use(MenuTree);
Vue.use(BoxWidget);
Vue.use(Toast, { position: "top", duration: 5000 });
Vue.use(Dialog);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    created() {
        // TODO: Fetch authenticed user's data
        let info = this.$store.state.fakeData.info;
        let user = this.$store.state.fakeData.user;
        let roles = this.$store.state.fakeData.roles;

        this.$store.commit("profile/Info", info);
        this.$store.commit("profile/User", user);
        this.$store.commit("profile/Role", roles);

    },
    render: h => h(App)
}).$mount("#app");
