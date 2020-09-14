import Vue from "vue";
import router from "@/router/index";
import store from "@/store/index";
import App from "@/App.vue";

import "@/filters";
import "./scss/index.scss";

import Dialog from "@/plugins/dialog";
import UserInRoles from "./plugins/user-in-role";

Vue.use(Dialog);
Vue.use(UserInRoles)
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    created() {
        // TODO: Fetch authenticed user's data
        let info = { title: "", bio: "" };
        let user = { Fullname: "Smith, Joe" };
        let roles = ["Admin", "NCManager"];

        this.$store.commit("profile/Info", info);
        this.$store.commit("profile/User", user);
        this.$store.commit("profile/Role", roles);

    },
    render: h => h(App)
}).$mount("#app");
