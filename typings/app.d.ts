import Vue, { ComponentOptions } from "vue";
import { Store } from "~/vuex/types/index"
import { IRootState } from "@/store/index"

declare module "~/vue/types/options" {
    interface ComponentOptions<V extends Vue> {
        store?: Store<IRootState>;
    }
}

declare module "~/vue/types/vue" {
    interface Vue {
        $store: Store<IRootState>;
    }
}