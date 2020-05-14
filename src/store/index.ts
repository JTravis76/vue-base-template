import Vue from "vue";
import Vuex from "vuex";

import config, { IConfigState } from "./modules/configuration";
import profile, { IProfileState } from "./modules/profile";

Vue.use(Vuex);

export default new Vuex.Store<IRootState>({
    modules: {
        config,
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
    },
    actions: {}
});

export interface IRootState {
    /**local state member */
    pageLoading: boolean;
    httpConnections: number;  

    /**imported store module */
    config?: IConfigState;
    profile?: IProfileState;
}