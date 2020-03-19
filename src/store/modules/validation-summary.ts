/** Vaildation Summary - Vuex module
 * This module handle vaildation and server errors.
 * errors: are collections of vaildation errors
 *         to be display in a summary list.
 * serverError: is normally the HTTP (500) response from an API.
 *              Data is stored here to be pushed to an Error page.
 */
import { StoreOptions, ActionContext } from "vuex";

export default {
    namespaced: true,
    state: {
        errors: [],
        serverError: {}
    },
    mutations: {
        Errors(state: IMutations, payload: IMutations["errors"]): void {
            if (typeof (payload) === "string") {
                state.errors = [{ "ErrorMessage": payload }];
            } else {
                state.errors = payload;
            }
        }
    },
    actions: {
        OnError(s: IActions, payload: any): void {
            console.error(payload);
            this.state.serverError = payload;
        }
    }
} as StoreOptions<any>;

/** Vuex state members of the Vaildation Summary */
export interface IVaildationState {
    errors: { ErrorMessage?: string, Exception?: string }[];
    serverError: any;
}

interface IMutations extends StoreOptions<any> {
    errors: string | { ErrorMessage?: string, Exception?: string }[];
    serverError: any;
}

interface IActions extends ActionContext<any, any> {}