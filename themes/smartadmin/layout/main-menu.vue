<template>
    <nav class="navbar navbar-default megamenu">
        <div class="navbar-header">
            <button type="button" data-toggle="collapse" data-target="#defaultmenu" class="navbar-toggle">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </div>
        <div id="defaultmenu" class="navbar-collapse collapse" data-testid="main-menu">
            <ul class="nav navbar-nav">
                <li class="dropdown">
                    <a href="#" data-toggle="dropdown" class="dropdown-toggle" data-testid="menu-home"> Home <b class="caret"></b></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><router-link to="/dashboard" data-testid="menu-dashboard">Dashboard</router-link></li>
                        <li><router-link to="/containers" data-testid="menu-containers">Containers</router-link></li>
                        <li><router-link to="/shipments" data-testid="menu-shipments">Shipments</router-link></li>
                        <li><router-link to="/surveys" data-testid="menu-surveys">Surveys</router-link></li>
                        <li><router-link to="/reports" data-testid="menu-reports">Reports</router-link></li>
                    </ul>
                </li>
                <li class="dropdown" v-show="$UserInRole('Admin')">
                    <a href="#" data-toggle="dropdown" class="dropdown-toggle" data-testid="menu-admin"> Admin <b class="caret"></b></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><router-link to="/groups"  data-testid="menu-email-groups">Email Groups</router-link></li>
                    </ul>
                </li>
                <li v-if="$UserInRole('NCManager')">
                    <router-link to="/ncmanager" data-testid="menu-nc-manager">NC Manager</router-link>
                </li>
                <li>
                    <router-link to="/about" data-testid="menu-about">About</router-link>
                </li>
                <li class="dropdown" style="display:none;">
                    <!-- Save this to demo nested menus -->
                    <a href="#" data-toggle="dropdown" class="dropdown-toggle"> Menu Levels <b class="caret"></b></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a href="#">Second Level</a></li>
                        <li><a href="#">Second Level</a></li>
                        <li class="dropdown-submenu">
                            <a href="#">Second Level</a>
                            <ul class="dropdown-menu">
                                <li class="dropdown-submenu">
                                    <a href="#">Third Level</a>
                                    <ul class="dropdown-menu">
                                        <li><a href="#">Fourth Level</a></li>
                                        <li><a href="#">Fourth Level</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">Third Level</a></li>
                                <li><a href="#">Third level</a></li>
                            </ul>
                        </li>
                        <li><a href="#">Creattica</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    name: "main-menu"
})
</script>