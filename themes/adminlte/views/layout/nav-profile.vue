<template>
    <li class="dropdown user user-menu">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
            <avatar :round="true" v-bind:size="25" v-bind:name="Fullname" class="user-image"></avatar>
            <span class="hidden-xs">{{$store.state.profile.user.Fullname}}</span>
        </a>
        <ul class="dropdown-menu">
            <li class="user-header">
                <avatar round v-bind:size="90" v-bind:name="Fullname" class="img-circle"></avatar>
                <p>
                    {{$store.state.profile.user.Fullname}} <small>Member since {{$store.state.profile.user.AdsCreateDate | monthYearString}}</small>
                </p>
            </li>
            <!-- Menu Body -->
            <li class="user-body">
                <div class="row">
                    <div class="col-xs-4 text-center">
                        <a href="#">Followers</a>
                    </div>
                    <div class="col-xs-4 text-center">
                        <a href="#">Sales</a>
                    </div>
                    <div class="col-xs-4 text-center">
                        <a href="#">Friends</a>
                    </div>
                </div>
            </li>
            <!-- Menu Footer-->
            <li class="user-footer">
                <div class="pull-left">
                    <router-link to="/userprofile" class="btn btn-default btn-flat">Profile</router-link>
                </div>
                <div class="pull-right">
                    <a href="#" class="btn btn-default btn-flat">Sign out</a>
                </div>
            </li>
        </ul>
    </li>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import Avatar from "@/components/Avatar.vue";
    import BSN from "bootstrap-native";

    @Component({
        name: "nav-profile",
        components: {
            Avatar
        }
    })
    export default class NavProfile extends Vue { 

        get Fullname() {
            if (this.$store.state.profile.user != undefined) {
                return this.$store.state.profile.user.Fullname;
            }
            return "";
        }

        mounted() {
            BSN.initCallback();
        }
    }
</script>

<style lang="scss"></style>
