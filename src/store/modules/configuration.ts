import { StoreOptions } from "vuex";

export default {
    state: {
        NetcenterApi: "http://apidev/",
        AppName: "VueApp",
        FullAppName: "Vue Application",
        Description: "Basic Vue SPA startup application with Typescript and Rollup",
        BaseApi: "http://localhost:56077/",
        Version: "0.0.0.0",
        VersionDate: "2020-01-01T00:00:00Z",
        Environment: "== LOCAL == LOCAL == LOCAL =="
    },
    getters: {
        baseURL: state => state.BaseApi
    }
} as StoreOptions<any>

export interface IConfigState {
    NetcenterApi: string;
    AppName: string;
    FullAppName: string;
    Description: string;
    BaseApi: string;
    Version: string;
    VersionDate: string;
    Environment: string;
}