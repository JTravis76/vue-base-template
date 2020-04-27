<template>
    <header id="navbar">
        <div id="navbar-container" class="boxed">
            <div class="navbar-header">
                <router-link to="/" class="navbar-brand" data-testid="menu-logo">
                    <i class="fa fa-cube brand-icon"></i>
                    <div class="brand-title pull-left">
                        <span class="brand-text">Waste Container</span>
                    </div>
                </router-link>
            </div>
            <div class="navbar-content clearfix">
                <ul class="nav navbar-top-links pull-left">
                    <li>
                        <label style="position:relative; top:15px; left:10px;" class="label" v-bind:class="[prod ? 'label-info' : 'label-warning']">{{$store.state.config.Enviroment}}</label>
                    </li>
                    <!--<nav-message></nav-message>
                    <nav-notification></nav-notification>-->
                </ul>
                <nav-profile></nav-profile>
            </div>
            <main-menu></main-menu>
        </div>
    </header>
</template>

<script lang="ts">
import Vue from 'vue';
import MainMenu from "./main-menu.vue";
import NavProfile from "./nav-profile.vue";
//import NavMessage from "./nav-message.vue";
//import NavNotification from "./nav-notification.vue";

export default Vue.extend({
    name: "nav-bar",
    components: {
        MainMenu,
        NavProfile
    },
    computed: {
        prod() {
            let env = this.$store.state.config.Enviroment as string;
            return env.toLowerCase().indexOf("prod") > -1;
        }
    }
})
</script>