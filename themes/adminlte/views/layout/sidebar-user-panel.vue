<template>
    <div class="user-panel">
        <div class="pull-left image">
            <avatar :round="true" v-bind:name="Fullname" class="img-circle"></avatar>
        </div>
        <div class="pull-left info" v-cloak>
            <p>{{$store.state.profile.user.Fullname}}</p>
            <!-- Status -->
            <!--<a href="#"><i class="fa fa-circle text-success"></i> Online</a>-->
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import Avatar from "@/components/Avatar.vue";

    @Component({
        name: "sidebar-userpanel",
        components: {
            Avatar
        },
        computed: {
            Fullname() {
                let vm = this as SidebarUserpanel;
                if (vm.$store.state.profile.user != undefined) {
                    return vm.$store.state.profile.user.Fullname;
                }
                return "";
            }
        }
    })
    export default class SidebarUserpanel extends Vue { }
</script>

<style lang="scss"></style>
