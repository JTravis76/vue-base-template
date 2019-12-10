import { StoreOptions } from "vuex";

export default {
    state: {
        NetcenterBaseApi: "http://netcenterapidev/",
        AppName: "VueApp",
        FullAppName: "Vue Application",
        Description: "Basic Vue SPA startup application with Typescript and Rollup",
        BaseURL: "http://localhost:56077/",
        Version: "0.0.0.0",
        Enviroment: "== LOCAL == LOCAL == LOCAL =="
    },
    getters: {
        baseURL: state => state.BaseURL
    }
} as StoreOptions<any>

export interface IConfigState {
    NetcenterBaseApi: string;
    AppName: string;
    FullAppName: string;
    Description: string;
    BaseURL: string;
    Version: string;
    Enviroment: string;
}