import Vue from "vue";
import router from "@/router/index";
import store from "@/store/index";
import App from "@/App.vue";

import Dialog from "@/plugins/dialog";
import "@/filters";
import "./scss/index.scss";

Vue.use(Dialog);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    mounted() {
        //window.localStorage.setItem("timerHeartbeat", Util.SignalHeartbeat(this).toString());
    },
    render: h => h(App)
}).$mount("#app");

///* Clean up between refresh and before shutdown */
//window.addEventListener('beforeunload', function () {
//    let timerHeartbeat: string = window.localStorage.getItem("timerHeartbeat");
//    window.clearInterval(parseInt(timerHeartbeat));
//});
