import { router } from "../../routes"

export default {
    namespaced: true,
    state: {
        errors: [],
        serverError: {}
    },
    mutations: {
        errors(state: Mutations, payload: string | string[]) {
            if (typeof (payload) == "string") {
                state.errors = [{ "ErrorMessage": payload }];
            }
            else {
                state.errors = payload;
            }
        }
    },
    actions: {
        OnError(s: Actions, payload) {
            console.log(payload);
            this.state.serverError = payload;

            router.push({ path: "/error" });
        }
    }
} as StoreOptions<any>

interface Mutations extends StoreOptions<any> {
    errors: any[];
    serverError: any;
}

interface Actions extends ActionContext<any, any> {
    
}