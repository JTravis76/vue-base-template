import Vue from "vue";
import router from "@/router/index";
import store from "@/store/index";
import App from "@/App.vue";

import "@/filters";
import "./assets/scss/index.scss";

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
