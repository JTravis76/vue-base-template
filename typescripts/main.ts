import * as Vue from "vue"
import { router } from "routes"
import store from "./store/index"

import Http from "./plugins/Http"
import UserRoles from "./plugins/UserRoles"
import PanelWidget from "./plugins/PanelWidget"

import "./filters"

Vue.use(Http);
Vue.use(UserRoles);
Vue.use(PanelWidget);
Vue.config.productionTip = false;

new Vue({
    components: {},
    data() {
        return {
            message: "Yeah, it works!!! All I need now, is a theme."
        };
    },
    router,
    store,
    created() {
        this.$store.commit("profile/User", { Fullname: "Smith, John", Badge: "ABC001", Email: "john.smith@domain.net", Phone: "740-555-1234", NtUsername: "DOMAIN\\john.smith", HireDate: "2018-01-01"});
        this.$store.commit("profile/Role", ["Admin", "NCManager"]);
        this.$store.commit("profile/Info", { Title: "Software Developer", Bio: "This is my bio." });
    }
}).$mount("#app");