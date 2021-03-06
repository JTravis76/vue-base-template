import resolve from "./node_modules/@rollup/plugin-node-resolve/dist/index.es";
import vue from "./node_modules/rollup-plugin-ts-vue/dist/rollup-plugin-ts-vue.es";
import replace from "./node_modules/@rollup/plugin-replace/dist/rollup-plugin-replace.es";
import dev from "./env/development.env";
import test from "./env/staging.env";
import prod from "./env/production.env";

const env = (name) => {
    if (name === null || name.trim() === "") name = `${process.env.ASPNETCORE_ENVIRONMENT}`;
    switch (name.toLowerCase()) {
        case "development":
            return dev;
        case "staging":
            return test;
        case "production":
            return prod;
        default:
            return {};
    }
};

/* == nice option to build multiple environments ==
 * Just replace 'file: "./dist/js/app.js",' with 'file: `./dist/js/app.${name}js`,' 
 */
// ["local","development","staging","production"].map((name, idx) => {});
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
        replace(env(process.env.ASPNETCORE_ENVIRONMENT)),
        vue(null, {
            output: "./dist/css/site.css",
            includePaths: ["src/scss"]
        })
    ],
    external: [
        "vue", 
        "vue-router", 
        "vuex", 
        "vue-class-component",
        "bootstrap-native",
        "modal"
    ]
}