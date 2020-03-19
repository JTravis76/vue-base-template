import { VueConstructor } from "vue"
import store from "@/store/index"
import axios from "axios"
import router from "@/router/index";

export default {
    install(vue: VueConstructor, name = "$http") {

        axios.defaults.baseURL = store.state.config.BaseURL;

        //Display Page Loader on every AJAX request
        axios.interceptors.request.use(config => {
            store.commit('addconnection');

            //Skip page loading if route matches the following
            if (config.url != 'api/home/heartbeat') {
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

                switch (err.response.status) {
                    case 400: //Bad Request
                        store.commit("validationSummary/Errors", err.response.data);
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
                                router.push("/error");
                            });
                        break;
                }

                return Promise.reject(err);
            });


        Object.defineProperty(vue.prototype, name , { value: axios });
    }
}