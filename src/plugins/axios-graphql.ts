/**
 * This is a Vue plugin that query data from a _GraphQL API_ via Axios HTTP Promise-based library.
 */
import { VueConstructor } from "vue"
import store from "@/store/index"
import axios, { AxiosRequestConfig } from "axios"
import router from "@/router/index";

export default {
    install(vue: VueConstructor, name = "$graphql") {

        axios.defaults.baseURL = store.getters.baseURL;
        //axios.defaults.withCredentials = true; // Use with Windows Authentication

        //Display Page Loader on every AJAX request
        axios.interceptors.request.use(config => {
            store.commit('addconnection');

            //Skip page loading if GraphQL's "OperationName" matches the following
            if (config.data !== undefined) {
                //let d = config.data.toString() as string;
                //if (d.indexOf('??') === -1) {
                    store.commit('pageloader', true);
                //}
            }
            else {
                //Skip page loading if route matches the following
                //if (config.url != '??.ashx') {
                //store.commit('pageloader', true);
            //}
            }

            return config
        });

        //Hide Page Loader on every AJAX response
        axios.interceptors.response.use(config => {
            store.commit('removeconnection');

            if (store.state.httpConnections == 0)
                store.commit('pageloader', false);

            return config
        },
            err => {
                store.commit('removeconnection');

                if (store.state.httpConnections == 0)
                    store.commit('pageloader', false);

                if (err.response !== undefined) {                   
                    switch (err.response.status) {
                        case 400: //Bad Request
                            if (err.response.data.errors != undefined) {
                                //convert GraphQL errors to MVC version since Validation component requires that format
                                let errors = [];
                                err.response.data.errors.forEach(e => {
                                    errors.push({ ErrorMessage: e.message, Exception: null });
                                });
                                
                                store.commit("validationSummary/Errors", errors);
                            }
                            break;
                        //case 401: //Unauthorized                        
                        //    break;
                        //case 404: //Not Found
                        //    break;
                        //case 500: //Internal Server Error
                        //    break;
                        default:
                            store.dispatch("validationSummary/OnError", err)
                                .then(() => {
                                    router.push({ path: "/error" });
                                });
                            break;
                    }
                }

                return Promise.reject(err);
            });

        Object.defineProperty(vue.prototype, name, { value: gql });
    }
}

/**
 * GraphQL Query Fetcher
 * @param query GraphQL query
 */
function gql(query:GraphQlQuery = null) {
    return new Promise((resolve, reject) => {

        // if (store.state.login.token === "")
        //     delete axios.defaults.headers.common["Authorization"];
        // else
        //     axios.defaults.headers.common["Authorization"] = store.state.login.token;

        let config = {
            url: "graphql",
            method: "POST",
            data: JSON.stringify(query),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        } as AxiosRequestConfig

        axios(config)
            .then(resp => {
                //Get property name, then return just that object
                let root = Object.getOwnPropertyNames(resp.data.data)[0];
                resolve(resp.data.data[root]);
            })
            .catch(err => {
                reject(err);
            });
    });
}

// declare module '~/vue/types/vue' {
//     interface Vue {
//         /**
//         * GraphQL Query Fetcher
//         * @param query GraphQL query
//         */
//         $graphql<T = any>(query: GraphQlQuery): Promise<T>; //Promise<GraphQLResult<T>>;
//     }
// }

export interface GraphQlQuery {
    query: string;
    variables: object;
    operationName: string;
}

export type GraphQLResult<T> = {
    errors: any[];
    data: T;
}