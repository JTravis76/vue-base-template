import Vue, { ComponentOptions } from "vue";

export default {
    name: "not-found",
    template: `<section> <div class="container"> <h1><img alt="logo" :src="logo" style="width:48px;"> OOP! We broken a link.</h1> <h2> This page was not found. </h2> <router-link to="/" class="btn btn-primary"><span class="fa fa-home"></span> Take me home.</router-link> </div></section>`,
    data() {
        return {
            logo: ""
        }
    },
    created() {
        /* NOTE: `this` keyword is not strong-typed. 
        * Can enable strong-typing by editing the vue.d.ts definition.
        * Browse to "node_modules/vue/types/vue.d.ts" line number 89
        * replace text with; created?(this: V): void;
        * then reload vscode
        */
        let vm = this as NotFound;
        vm.logo = "./img/logo.png";
    }
} as ComponentOptions<NotFound>

interface NotFound extends Vue {
    logo: string;
}