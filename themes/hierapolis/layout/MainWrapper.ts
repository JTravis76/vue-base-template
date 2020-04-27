import MainSidebar from "./MainSidebar"
import BreadCrumb from "./Breadcrumb"
//import Toolbar from "./Toolbar"

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
} as ComponentOption
