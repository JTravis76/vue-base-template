<template>
    <ul class="nav navbar-top-links pull-right">
        <li id="dropdown-user" class="dropdown">
            <a href="#" data-toggle="dropdown" class="dropdown-toggle text-right" data-testid="menu-user">
                <span class="pull-right">
                    <avatar class="img-circle img-user media-object" alt="Profile Picture" :round="true" :size="32" :name="FullName"></avatar>
                </span>
                <div class="username hidden-xs">{{FullName}}</div>
            </a>
            <div class="dropdown-menu dropdown-menu-right with-arrow">
                <ul class="head-list">
                    <li>
                        <router-link to="/profile" data-testid="menu-profile"><i class="fa fa-user fa-fw"></i> Profile</router-link>
                    </li>
                    <li v-if="$UserInRole('Admin')">
                        <router-link to="/settings" data-testid="menu-settings"><i class="fa fa-gear fa-fw"></i> Settings</router-link>
                    </li>
                    <!--<li>
                        <a href="#"><i class="fa fa-sign-out fa-fw"></i> Logout </a>
                    </li>-->
                </ul>
            </div>
        </li>
    </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import Avatar from "@/components/Avatar.vue";
import BSN from 'bootstrap-native';

export default Vue.extend({
    name: "nav-profile",
    components: {
        Avatar
    },
    computed: {
        FullName() {
            if (this.$store.state.profile.user.Fullname != undefined) {
                return this.$store.state.profile.user.Fullname;
            }

            return "";
        }
    },
    created() {
        this.$nextTick(() => {
            BSN.initCallback();
        });
    }
})
</script>