import Vue from "vue";
import Vuex from "vuex";

import config, { IConfigState } from "./modules/configuration";

Vue.use(Vuex);

export default new Vuex.Store<IRootState>({
    modules: {
        config
    },
    state: {
        pageLoading: false
    },
    mutations: {},
    actions: {}
});

export interface IRootState {
    /**local state member */
    pageLoading: boolean;  

    /**imported store module */
    config?: IConfigState;
}