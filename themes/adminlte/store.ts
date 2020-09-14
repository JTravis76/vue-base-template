import Vue from "vue";
import Vuex from "vuex";

import config, { IConfigState } from "./modules/configuration";
import profile, { IProfileState } from "./modules/profile";
import validationSummary, { IVaildationState } from "./modules/validation-summary";
import fakeData, { IFakeDataState } from "./modules/fake-data";

Vue.use(Vuex);

export default new Vuex.Store<IRootState>({
    modules: {
        config,
        profile,
        fakeData,
        validationSummary
    },
    state: {
        pageLoading: false,
        httpConnections: 0,
        toggleSidebar: false
    },
    mutations: {
        pageloader(state, payload: boolean = true) {
            state.pageLoading = payload;
        },
        addconnection: state => state.httpConnections++,
        removeconnection: state => state.httpConnections--,
        sidebar(state, payload) {
            state.toggleSidebar = !state.toggleSidebar;
        }
    },
    actions: {}
});

export interface IRootState {
    /**local state member */
    pageLoading: boolean;
    httpConnections: number;
    toggleSidebar: boolean;

    /**imported store module */
    config?: IConfigState;
    profile?: IProfileState;
    validationSummary?: IVaildationState;
    fakeData?: IFakeDataState;
}