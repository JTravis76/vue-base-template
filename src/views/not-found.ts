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
        let vm = this as VueComp;
        vm.logo = "./img/logo.png";
    }
} as ComponentOptions<any>

interface VueComp extends Vue {
    logo: string;
}