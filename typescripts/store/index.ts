import * as Vue from "vue";
import * as Vuex from "vuex";

import vaildation from "./modules/vaildation"
import config from "./modules/configuration"
import profile from "./modules/profile"

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        config,
        vaildation,
        profile
    },
    state: {
        pageLoading: false,
        httpConnections: 0
    },
    mutations: {
        pageloader(state, payload: boolean = true) {
            state.pageLoading = payload;
        },
        addconnection: state => state.httpConnections++,
        removeconnection: state => state.httpConnections--
    }
});