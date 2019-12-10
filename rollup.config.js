import vue from "./node_modules/rollup-plugin-ts-vue/dist/rollup-plugin-ts-vue.es";
import scss from "./node_modules/rollup-plugin-scss/index.es";

export default {
    input: "./src/main.ts",
    output: {
        name: "app",
        format: "iife",
        file: "./public/js/app.js",
        globals: {
            "vue": "Vue",
            "vue-router": "VueRouter",
            "vuex": "Vuex",
            "vue-class-component": "VueClassComponent"
        }
    },
    plugins: [
        vue(),
        scss({
            output: "./public/css/site.css"
        })
    ],
    external: ["vue", "vue-router", "vuex", "vue-class-component"] //<- supress warnings
}