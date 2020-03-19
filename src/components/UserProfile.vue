<template>
    <div>
        <div class="row">
            <div class="col-lg-6">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label class="control-label text-info">First Name</label>
                            <div>
                                <input type="text" class="form-control" disabled="disabled" v-model:value="Fullname.firstname" />
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label class="control-label text-info">Last Name</label>
                            <div>
                                <input type="text" class="form-control" disabled="disabled" v-model:value="Fullname.lastname" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label text-info">Title</label>
                    <div>
                        <input type="text" id="txt-user-title" class="form-control" v-model="$store.state.profile.info.Title" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label text-info">Bio</label>
                    <div>
                        <textarea id="txt-user-bio" class="form-control" rows="4" v-model="$store.state.profile.info.Bio"></textarea>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label class="control-label text-info">Badge</label>
                            <div>
                                <input type="text" class="form-control" disabled="disabled" v-bind:value="$store.state.profile.user.Badge" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label text-info">Email</label>
                            <div>
                                <input type="text" class="form-control" disabled="disabled" v-bind:value="$store.state.profile.user.Email" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label text-info">Phone</label>
                            <div>
                                <input type="text" class="form-control" disabled="disabled" v-bind:value="$store.state.profile.user.Phone" />
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label class="control-label text-info">Id</label>
                            <div>
                                <input type="text" class="form-control" disabled="disabled" v-bind:value="$store.state.profile.user.Id" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label text-info">NT Username</label>
                            <div>
                                <input type="text" class="form-control" disabled="disabled" v-bind:value="$store.state.profile.user.NtUsername" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label text-info">Member Since</label>
                            <div>
                                <input type="text" class="form-control" disabled="disabled" v-bind:value="$store.state.profile.user.AdsCreateDate | shortDateString" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <label class="control-label text-info">Roles</label>
                <div>
                    <template v-for="role in $store.state.profile.roles">
                        <label class="label label-default">{{role}}</label>&nbsp;
                    </template>
                </div>
                <p>&nbsp;</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";

    @Component({
        name: "user-profile",
        computed: {
            Fullname() {
                let vm = this as UserProfile;
                if (vm.$store.state.profile.user.Fullname != undefined) {
                    let name: string = vm.$store.state.profile.user.Fullname;

                    if (name.indexOf(",") > -1) {
                        return {
                            firstname: name.split(',')[1],
                            lastname: name.split(',')[0]
                        };
                    }

                    return {
                        firstname: name.split(' ')[0],
                        lastname: name.split(' ')[1]
                    };
                }

                return {
                    firstname: null,
                    lastname: null
                };
            }
        }
    })
    export default class UserProfile extends Vue { }
</script>

<style lang="scss"></style>
