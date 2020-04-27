<template>
    <aside class="main-sidebar">
        <section class="sidebar">
            <sidebar-userpanel></sidebar-userpanel>
            <!--<search-form></search-form>-->
            <!-- Sidebar Menu -->
            <ul class="sidebar-menu">
                <li class="header">MAIN</li>
                <!--<router-link tag="li" to="/home"><a><i class="fa fa-home"></i><span>Home</span></a></router-link>-->
                <router-link tag="li" to="/dashboard"><a><i class="fa fa-dashboard"></i><span>Dashboard</span></a></router-link>
                <li class="treeview">
                    <a href="#"><i class="fa fa-link"></i><span>Actions</span><span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span></a>
                    <ul class="treeview-menu">
                        <router-link tag="li" to="/projectplans"><a><i class="fa fa-circle-o"></i><span>Project Plan Checklist</span></a></router-link>
                        <router-link tag="li" to="/datagroups"><a><i class="fa fa-circle-o"></i><span>Data Group</span></a></router-link>
                        <router-link tag="li" to="/wasteprofiles"><a><i class="fa fa-circle-o"></i><span>Master Waste Profile</span></a></router-link>
                        <router-link tag="li" to="/interims"><a><i class="fa fa-circle-o"></i><span>Material Interim Location</span></a></router-link>
                        <router-link tag="li" to="/sources"><a><i class="fa fa-circle-o"></i><span>Material Source Location</span></a></router-link>
                        <li class="divider"></li>
                        <router-link tag="li" to="/interimlogs"><a><i class="fa fa-circle-o"></i><span>Interim Transfer Log</span></a></router-link>
                        <router-link tag="li" to="/wastes"><a><i class="fa fa-circle-o"></i><span>Waste Compliance Checklist</span></a></router-link>
                        <router-link tag="li" to="/transferlogs"><a><i class="fa fa-circle-o"></i><span>OSWDF Transfer Log</span></a></router-link>
                    </ul>
                </li>
                <li class="treeview" v-if="$UserInRole(['Admin'])">
                    <a href="#"><i class="fa fa-link"></i><span>Admin</span><span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span></a>
                    <ul class="treeview-menu">
                        <!--<router-link tag="li" to="/onlineuser"><a><i class="fa fa-circle-o"></i><span>Who's Online</span></a></router-link>-->
                        <router-link tag="li" to="/config"><a><i class="fa fa-circle-o"></i><span>Configurations</span></a></router-link>
                        <!--<router-link tag="li" to="/grouptype"><a><i class="fa fa-circle-o"></i><span>Email Group Types</span></a></router-link>-->
                        <!--<router-link tag="li" to="/emailgroup"><a><i class="fa fa-circle-o"></i><span>Email Groups</span></a></router-link>-->
                    </ul>
                </li>
                <router-link tag="li" to="/ncmanager" v-if="$UserInRole(['NCManager'])"><a><i class="fa fa-users"></i><span>NC Manager</span></a></router-link>
                <router-link tag="li" to="/about"><a><i class="glyphicon glyphicon-info-sign"></i><span>About</span></a></router-link>
                <!--<router-link tag="li" to="/wiki"><a><i class="glyphicon glyphicon-book"></i><span>Help</span></a></router-link>-->
            </ul>
        </section>
    </aside>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import SidebarUserpanel from "./sidebar-user-panel.vue";
    import SearchForm from "./search-form.vue";

    @Component({
        name: "main-sidebar",
        components: {
            SidebarUserpanel,
            SearchForm
        }
    })
    export default class MainSideBar extends Vue {
         mounted() {
            let vm = this as Vue;
            //vm.$nextTick(() => {
                vm.$menuTree(); 
            //});
        }
     }
</script>

<style lang="scss"></style>
