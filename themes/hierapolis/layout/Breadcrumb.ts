import { ComponentOptions } from "vue";

export default {
    name: "bread-crumbs",
    components: {},
    template: `<ul class='breadcrumb' id='breadcrumb'> <template v-if="Route.meta.breadcrumb && Route.meta.breadcrumb.length > 0"> <li v-for="(route, index) in Route.meta.breadcrumb"> <router-link :to="{path: route.link}" :class="[index == 0 ? 'title' : '']"><span :class="route.icon"></span> {{route.name}}</router-link> </li> <li class="active" v-if="Route.name == 'Home'">&nbsp;</li> <li class="active" v-else>{{Route.name}}</li> </template> <template v-else> <li class="title">{{Route.name}}</li> </template> </ul>`,
    computed: {
        Route() {
            return this.$route.matched[0];
        }
    }
} as ComponentOptions<any>
