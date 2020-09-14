<template>
    <div class="container">
        <div class="box box-default">
            <div class="box-header with-border">
                <h3 class="box-title">Netcenter Manager</h3>
                <div class="box-tools pull-right">
                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                    <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                </div>
            </div>
            <div class="box-body">
                <div class="input-group">
                    <span class="input-group-btn">
                        <button type="button" class="btn btn-info" v-on:click="Add" data-testid="btn-add-user"><span class="fa fa-plus"></span> Add</button>
                    </span>
                    <input id="txt-search" type="text" class="form-control" placeholder="Search Role, Username, Email..." v-on:keyup.enter="Search" data-testid="permission-search" />
                    <span class="input-group-btn"> 
                        <button type="button" class="btn btn-secondary" @click="Search" data-testid="btn-permission-search"><span class="fa fa-search"></span></button> 
                    </span>
                </div>
                <br />
                <div class="table-responsive" style="max-height:600px;">
                    <table class="table table-condensed table-striped" data-testid="tbl-user-permissions">
                        <tbody>
                            <template v-for="role in appRoles.where(function(x) { return x.deleteMark == 0})">
                                <tr style="background-color:lightyellow;" >
                                    <td colspan="4">
                                        <b>{{role.name}}</b>
                                        <small style="font-style:italic; color:gray;">{{role.description}}</small>
                                    </td>
                                </tr>
                                <template v-if="role.appRoleUsers != null">
                                    <tr v-for="(appUser, idx) in role.appRoleUsers.where(function(x) { return x.deleteMark == 0}).orderBy(function(x) { return x.user.fullname})">
                                        <td style="width:5%"><button type="button" class="btn btn-xs btn-danger" v-on:click="Remove(role.name, appUser)" :data-testid="'btn-remove-user-' + idx"><i class="fa fa-remove"></i></button></td>
                                        <td>{{appUser.user.fullname}}</td>
                                        <td>{{appUser.username}}</td>
                                        <td>{{appUser.email}}</td>
                                    </tr>
                                </template>
                                <tr v-else>
                                    <td colspan="4">No Records Found...</td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- <nc-modal v-on:reload="Reload"></nc-modal> -->
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    // import axios, { AxiosRequestConfig } from "axios";
    import Netcenter from "../../../typings/application/netcenter";
    //import NcModal from "./nc-manager-modal.vue";
    import Modal from "modal";
    import "@/lib/linq";

    @Component({
        name: "nc-manager",
        components: {
           // NcModal
        }
    })
    export default class NcManager extends Vue { 
        public appRoles:any[] = [];
        public original:any[] = [];

        Add() {
            new Modal(document.getElementById("NcManagerModal")).show();
        }
        Remove(role: string, appUser: Netcenter.IAppRoleUserDto) {
            if (confirm("Are you sure you want to remove " + appUser.user.fullname.toUpperCase() + " from " + role.toUpperCase() + " role")) {
                let vm = this;
 
                let users = [] as Netcenter.IUserEmailRoleDto[];
                users.push({ id: appUser.user.id, email: appUser.email, username: appUser.username });

                // let config = {
                //     url: vm.$store.state.config.NetcenterApi + "Netcenter/Roles/AppRoleUsers",
                //     method: "DELETE",
                //     params: {
                //         "appName": vm.$store.state.config.AppName,
                //         "appRole": role
                //     },
                //     data: users
                // } as AxiosRequestConfig;

                // axios(config)
                //     .then(() => {
                //         RemoveUser(vm, role, users[0].email);
                //     });
            }
        }
        Reload() {
            new Modal(document.getElementById("NcManagerModal")).hide();
            GetData(this);
        }
        Search() {
            let vm = this;
            let el = document.getElementById("txt-search") as HTMLInputElement;
            if (el.value.trim() == "") {
                GetData(vm);
            }
            else {
                //make copy if empty
                if (vm.original.length === 0) {
                    vm.original = vm.appRoles;
                }
                vm.appRoles = [];
                let search = el.value.toLowerCase();

                let foundRole = false;
                vm.original.forEach(role => {
                    //test for matching Role name
                    if (role.name.toLowerCase().indexOf(search) > -1) {
                        vm.appRoles.push(role);
                        foundRole = true;
                    }
                });

                if (!foundRole) {
                    let copy = JSON.parse(JSON.stringify(vm.original));
                    copy.forEach(role => {
                        //copy user and reset list
                        let appRoleUsers = role.appRoleUsers;
                        role.appRoleUsers = [];
                        
                        //test for matching Username/Email
                        appRoleUsers.forEach(user => {
                            if (user.username.toLowerCase().indexOf(search) > -1
                                || user.email.toLowerCase().indexOf(search) > -1) {
                                    role.appRoleUsers.push(user);
                            }
                        });

                        vm.appRoles.push(role);
                    });
                }
            }
        }
        created() {
            GetData(this);
        }
        mounted() {
            this.$boxWidget();
        }
    }

function GetData(vm: NcManager) {
    let url = vm.$store.state.config.NetcenterApi + 'Netcenter/Apps/AppByName';

    // axios.get(url, { params: { 'appName': vm.$store.state.config.AppName, 'includeUserDetails': true }, headers: { 'Cache-Control': 'no-cache' } })
    //     .then(response => {
    //         let data = response.data as Netcenter.IAppDto;
    //         vm.appRoles = data.appRoles.where(x => x.deleteMark == 0).orderBy(x => x.name);
    //         vm.original = [];
    //     });
    let d = {
        "id": 100,
        "name": "VueApp",
        "appRoles": [
            {
                "id": 200,
                "appId": 100,
                "name": "Admin",
                "description": "Administrative tasks",
                "appRoleUsers": [
                    {
                        "appRoleId": 200,
                        "username": "j.smith",
                        "email": "joe.smith@domain.com",
                        "user": {
                            "fullname": "Smith, Joe"
                        }
                    }
                ]
            }
        ]
    } as any;

    //vm.appRoles = JSON.parse(JSON.stringify(d));
}

/**
 * Remove a user from the list based on role
 * @param vm Vue instance
 * @param role role name
 */
function RemoveUser(vm: NcManager, role: string, email: string): void {
    vm.appRoles.forEach(r => {
        if (r.name == role) {
            r.appRoleUsers.forEach(u => {
                if (u.email == email) {
                    let index = r.appRoleUsers.map(function (v) { return v.email; }).indexOf(email);
                    if (index > -1) {
                        r.appRoleUsers.splice(index, 1);
                    }
                }
            });
        }
    });
}

</script>