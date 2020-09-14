<template>
    <div class="row">
        <div class="col-lg-2">
            <div class="box box-default">
                <div class="box-header with-border">
                    <h3 class="box-title">Avatar</h3>
                    <div class="box-tools pull-right">
                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                        <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                    </div>
                </div>
                <div class="box-body">
                    <div style="max-height:210px; padding: 10px 40px;">
                        <avatar :round="true" :name="Fullname"></avatar>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-10">
            <div class="box box-default">
                <div class="box-header with-border">
                    <h3 class="box-title">About Me</h3>
                    <div class="box-tools pull-right">
                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                        <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                    </div>
                </div>
                <div class="box-body">
                    <vue-profile></vue-profile>
                    <div class="row">
                        <div class="col-lg-12">
                            <button type="button" class="btn" v-bind:class="[savedStatus ? 'btn-success' : 'btn-primary']" v-on:click="Save" data-testid="btn-save-user-profile"><span class="fa fa-save"></span> Save</button>
                            <router-link to="/" class="btn btn-default" data-testid="btn-cancel-user-profile"> Cancel</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
    import Avatar from "@/components/Avatar.vue";
    import VueProfile from "@/components/UserProfile.vue";

export default Vue.extend({
    name: "user-profile",
    components: {
        Avatar,
        VueProfile
    },
    data() {
        return {
            savedStatus: false
        }
    },
    computed: {
        Fullname() {
            if (this.$store.state.profile.user.Fullname != undefined) {
                return this.$store.state.profile.user.Fullname;
            }
            return "";
        }
    },
    methods: {
        Save() {
            let vm = this as VueComp;
            let info = {
                Title: this.$store.state.profile.info.Title,
                Bio: this.$store.state.profile.info.Bio
            };

            vm.$http.post("api/account/aboutme", info)
                .then(() => {
                    vm.savedStatus = true;
                    window.setTimeout(() => {
                        vm.savedStatus = false;
                    }, 3000);
                });
        }
    },
    mounted() {
        this.$boxWidget();
    }
})
interface VueComp extends Vue {
    savedStatus: boolean
}
</script>