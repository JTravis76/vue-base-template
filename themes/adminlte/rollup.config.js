import resolve from "./node_modules/@rollup/plugin-node-resolve/dist/index.es";
import vue from "./node_modules/rollup-plugin-ts-vue/dist/rollup-plugin-ts-vue.es";

export default {
    input: "./src/main.ts",
    output: {
        name: "app",
        format: "iife",
        file: "./dist/js/app.js",
        globals: {
            "vue": "Vue",
            "vue-router": "VueRouter",
            "vuex": "Vuex",
            "vue-class-component": "VueClassComponent",
            "vue-property-decorator": "VueClassComponent",
	    "bootstrap-native": "BSN",
	    "modal": "Modal"
        },
        sourcemap: false,
        sourcemapFile: "./dist/js/app.js.map"
    },
    plugins: [
        resolve(),
        vue(null, {
            output: "./dist/css/site.css"
        })
    ],
    external: [
        "vue", 
        "vue-router", 
        "vuex", 
        "vue-class-component",
        "bootstrap-native"
    ]
}