<template>
    <header class="main-header">
        <router-link to="/" class="logo">
            <span class="logo-mini">
                <img alt="logo" src="./img/logo.png" style="height:50px;" />
            </span>
            <span class="logo-lg">
                <img alt="logo" src="./img/logo.png" style="height:40px;" />
                <b>WISE</b>
            </span>
        </router-link>
        <!-- Header Navbar -->
        <nav class="navbar navbar-static-top" role="navigation">
            <!-- Sidebar toggle button-->
            <a href="#" class="sidebar-toggle" v-on:click.prevent="PushMenu" role="button">
                <span class="sr-only">Toggle navigation</span>
            </a>
            <!-- Navbar Right Menu -->
            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">
                    <!--<nav-message></nav-message>-->
                    <!--<nav-notification></nav-notification>-->
                    <!--<nav-task></nav-task>-->
                    <nav-profile></nav-profile>
                    <!-- Control Sidebar Toggle Button -->
                    <li>
                        <a><!--placeholder--></a>
                        <!--<a href="#" data-toggle="control-sidebar" v-on:click.prevent="ToggleSidebar"><i class="fa fa-gears"></i></a>-->
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import NavMessage from "./nav-message.vue";
    //import NavNotification from "./nav-notification.vue";
    import NavTask from "./nav-task.vue";
    import NavProfile from "./nav-profile.vue";

    @Component({
        name: "main-header",
        components: {
            NavMessage,
            //NavNotification,
            NavTask,
            NavProfile
        }
    })
    export default class MainHeader extends Vue {
        PushMenu() {
            let body = document.getElementsByTagName("body")[0] as HTMLBodyElement;
            
            if (window.innerWidth <= 767) {
                body.classList.toggle("sidebar-open");
            }
            else {
                body.classList.toggle("sidebar-collapse");

                let ul = document.querySelectorAll("ul.treeview-menu") as NodeListOf<HTMLUListElement>;
                for (let i = 0; i < ul.length; i++) {
                    ul[i].style.removeProperty("display");
                    ul[i].style.removeProperty("opacity");
                }
            }
        }
        ToggleSidebar() {
            this.$store.commit("sidebar");
        }
     }
</script>

<style lang="scss"></style>
