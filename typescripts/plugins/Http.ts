import store from "../store/index"
import * as axios from "axios"

export default {
    install(vue: VueConstructor, name = "$http") {
        //const token = store.state.login.token as string;
        //console.log(token);

        axios.defaults.baseURL = store.state.config.BaseURL;

        axios.defaults.headers.common = { 'Access-Control-Allow-Origin': '*' };

        //if (token.length > 0)
        //    axios.defaults.headers.common["Authorization"] = token;

        //Display Page Loader on every AJAX request
        axios.interceptors.request.use(config => {
            store.commit('addconnection');

            //Skip page loading if route matches the following
            if (config.url != 'OnlineUser.ashx' && config.url != 'CheckNotification.ashx') {
                store.commit('pageloader', true);
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

                if (err.response != undefined) {
                    switch (err.response.status) {
                        case 400: //Bad Request
                            //check for GraphQL errors 1st, then assume MVC version
                            if (err.response.data.errors != undefined) {
                                //convert GraphQL errors to MVC version
                                let errors = [];
                                err.response.data.errors.forEach(e => {
                                    errors.push({ ErrorMessage: e.Message, Execption: null });
                                });
                                store.commit("vaildation/errors", errors);
                            }
                            else
                                store.commit("vaildation/errors", err.response.data);
                            break;
                        //case 401: //Unauthorized                        
                        //    break;
                        //case 404: //Not Found
                        //    break;
                        //case 500: //Internal Server Error
                        //    break;
                        default:
                            store.dispatch("vaildation/OnError", err);
                            break;
                    }
                }

                return Promise.reject(err);
            });


        Object.defineProperty(vue.prototype, name , { value: axios });
    }
}