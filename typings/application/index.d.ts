import Vue from 'vue';
import { Store } from "vuex/types/index";
import { IRootState } from "@/store/index";

declare module "node_modules/vue/types/options" {
    interface ComponentOptions<V extends Vue> {
        store?: Store<IRootState>;
    }
}

declare module 'node_modules/vue/types/vue' {
    interface Vue {
        /**Application Root Store */
        $store: Store<IRootState>;
    }
}
