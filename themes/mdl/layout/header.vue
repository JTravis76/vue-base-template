<template>
	<header class="mdl-layout__header">
        <div class="mdl-layout__header-row">
            <img src="./img/logo25.png" style="margin-right:4px;" />
            <!-- Title -->
            <router-link to="/" class="mdl-layout-title title">{{$store.state.config.AppName}}</router-link>
            <!-- Add spacer, to align navigation to the right -->
            <div class="mdl-layout-spacer"></div>
            <!-- Navigation. We hide it in small screens. -->
            <nav class="mdl-navigation mdl-layout--large-screen-only">
                <a class="mdl-navigation__link" href>Link</a>
                <a class="mdl-navigation__link" href>Link</a>
                <router-link to="/about" class="mdl-navigation__link">About</router-link>
            </nav>
            <div id="profile-menu" class="mdl-button mdl-js-button mdl-button--icon">
                <avatar :round="true" size="25" :name="$store.state.profile.user.fullname"></avatar>
            </div>
            <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="profile-menu">
                <router-link to="/config" class="mdl-menu__item">Settings</router-link>
                <router-link to="/profile" class="mdl-menu__item">Profile</router-link>
                <li disabled class="mdl-menu__item">Disabled Action</li>
                <li class="mdl-menu__item">Yet Another Action</li>
            </ul>


        </div>
	</header>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import Avatar from "@/components/Avatar.vue";

    @Component({
        name: "header-section",
        components: {
            Avatar
        }
    })
    export default class HeaderSection extends Vue { }
</script>

<style lang="scss">
    .title {
        color: white;
        text-decoration: none;
    }
</style>