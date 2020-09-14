import { ComponentOptions } from "vue";
import NavProfile from "./nav-profile";
import NavMessage from "./nav-message";

export default {
    name: "nav-bar",
    components: {
        NavProfile, NavMessage
    },
    template: `<div class='navbar navbar-default' id='navbar'> <router-link to="/" class='navbar-brand'><i class="fa fa-beer" /> <span class="text-bold">Hierapolis</span></router-link> <ul class='nav navbar-nav pull-right'> <nav-message></nav-message> <template v-if="$UserInRole('Admin')"> <li> <router-link to="/settings"><i class='fa fa-cog'></i> Settings</router-link> </li> </template> <nav-profile></nav-profile> </ul></div>`,
    data() {
        return {}
    },
    mounted() {
        BSN.initCallback();
    }
} as ComponentOptions<any>
