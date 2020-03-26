import { VueConstructor } from "vue";
import ToastNotification from "@/components/ToastNotification.vue";
import EventBus from "@/lib/event-bus";

//== based on https://github.com/ankurk91/vue-toast-notification ==//
// Usages: Vue.use(Toast, { position; "top" });
export default {
    install(vue: VueConstructor, globalOptions: ToastOptions = {}) {
        const toast = {
            open(options) {
                let message;
                if (typeof options === 'string') message = options;

                const defaultOptions = {
                    message
                };

                const propsData = Object.assign({}, defaultOptions, globalOptions, options);

                return new (vue.extend(ToastNotification))({
                    el: document.createElement('div'),
                    propsData
                })
            },
            clear() {
                EventBus.$emit('toast.clear', null);
            },
            success(message, options = {}) {
                return this.open(Object.assign({}, {
                    message,
                    type: 'success'
                }, options))
            },
            error(message, options = {}) {
                return this.open(Object.assign({}, {
                    message,
                    type: 'error'
                }, options))
            },
            info(message, options = {}) {
                return this.open(Object.assign({}, {
                    message,
                    type: 'info'
                }, options))
            },
            warning(message, options = {}) {
                return this.open(Object.assign({}, {
                    message,
                    type: 'warning'
                }, options))
            },
            default(message, options = {}) {
                return this.open(Object.assign({}, {
                    message,
                    type: 'default'
                }, options))
            }
        };

        Object.defineProperty(vue.prototype, "$toast", { value: toast });
    }
}