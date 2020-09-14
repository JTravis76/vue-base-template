import { ComponentOptions } from "vue";
import MainSidebar from "./main-sidebar";
import BreadCrumb from "./breadcrumb";
//import Toolbar from "./toolbar";

export default {
    name: "main-wrapper",
    components: {
        MainSidebar,
        BreadCrumb
        //Toolbar
    },
    template: `<div id='wrapper'> <main-sidebar></main-sidebar> <section id='tools'> <bread-crumb></bread-crumb> <!--<div id='toolbar'> <toolbar></toolbar> </div>--> </section> <div id='content'> <router-view></router-view> </div></div>`,
    data() {
        return {}
    }
} as ComponentOptions<any>
