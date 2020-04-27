import { StoreOptions } from "vuex";

export default {
    state: {
        BaseApi: "http://apidev/",
        AppName: "VueApp",
        FullAppName: "Vue Application",
        Description: "Basic Vue SPA startup application with Typescript and Rollup",
        BaseURL: "http://localhost:56077/",
        Version: "0.0.0.0",
        VersionDate: "2020-01-01T00:00:00Z",
        Enviroment: "== LOCAL == LOCAL == LOCAL =="
    },
    getters: {
        baseURL: state => state.BaseURL
    }
} as StoreOptions<any>

export interface IConfigState {
    BaseApi: string;
    AppName: string;
    FullAppName: string;
    Description: string;
    BaseURL: string;
    Version: string;
    VersionDate: string;
    Enviroment: string;
}