import Vue from 'vue';
import { Store } from "vuex/types/index";
import { IRootState } from "@/store/index";
import { GraphQlQuery, GraphQLResult } from "@/plugins/axios-graphql";
import { AxiosStatic } from "axios";
import { DialogOptions } from "@/plugins/dialog";

//== !!!! please check the README.md before editing this module !!!! ==//
declare module "node_modules/vue/types/options" {
    interface ComponentOptions<V extends Vue> {
        store?: Store<IRootState>;
    }
}

declare module 'node_modules/vue/types/vue' {
    interface Vue {
        /**Application Root Store */
        $store: Store<IRootState>;

        /**
        * GraphQL Query Fetcher
        * @param query GraphQL query
        */
        $graphql<T = any>(query: GraphQlQuery): Promise<T>; //Promise<GraphQLResult<T>>;

        /**Axios HTTP client */
        $http: AxiosStatic;

        /**
         * Check if user belongs to an application role
         * @param role single role or array of roles
         * @returns True/False
        */
        $UserInRole(role: string | string[]): boolean;

        /**Displays a toast message */
        $toast: ToastConstructor;

        /**Executes box widgets (Collapse/Remove) */
        $boxWidget(): void;

        /**Builds the menu side out/ins */
        $menuTree(): void;

        /**Displays a dialog */
        $dialog(options: string | DialogOptions): Promise<any>;
    }
}
