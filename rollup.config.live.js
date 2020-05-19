import resolve from "./node_modules/@rollup/plugin-node-resolve/dist/index.es";
import replace from "./node_modules/@rollup/plugin-replace/dist/rollup-plugin-replace.es";
import vue from "./node_modules/rollup-plugin-ts-vue/dist/rollup-plugin-ts-vue.es";
import livereload from "./node_modules/rollup-plugin-livereload/dist/index.es";
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

//["local","development","staging","production"]
export default ["local"].map((name, index) => ({
    input: "./src/main.ts",
    output: {
        name: "app",
        format: "iife",
        file: `./dist/js/app.${name}.js`,
        globals: {
            "vue": "Vue",
            "vue-router": "VueRouter",
            "vuex": "Vuex",
            "vue-class-component": "VueClassComponent",
            "vue-property-decorator": "VueClassComponent"
        },
        sourcemap: false,
        sourcemapFile: `./dist/js/app.${name}.js.map`
    },
    plugins: [
        resolve(),
        replace(env(name)),
        vue(null, {
            output: "./dist/css/site.css",
            includePaths: ["src/scss"]
        }),
        livereload({
            watch: "dist",
            verbose: false
        })
    ],
    external: [
        "vue",
        "vue-router",
        "vuex",
        "vue-class-component"
    ]
}));