import NcModal from "./NCManagerModal"
import { Modal } from "bootstrap-native"

export default {
    name: "nc-manager",
    components: {
        NcModal
    },
    template: `<div class="container"> <div class="panel"> <div class="panel-heading"> <h3 class="panel-title">Netcenter Manager</h3> </div> <div class="panel-body"> <div class="input-group"> <span class="input-group-btn"> <button type="button" class="btn btn-info" v-on:click="Add"><span class="fa fa-plus"></span> Add</button> </span> <input type="text" class="form-control" placeholder="Search Role..." v-on:keyup.enter="Search" /> </div> <br /> <div class="table-responsive" style="max-height:600px;"> <table class="table table-condensed table-striped"> <tbody v-if="appRoles.length > 0"> <template v-for="role in appRoles.where(function(x) { return x.deleteMark == 0})"> <tr style="background-color:lightyellow;"> <td colspan="4"> <b>{{role.name}}</b> <small style="font-style:italic; color:gray;">{{role.description}}</small> </td> </tr> <template v-if="role.appRoleUsers != null"> <tr v-for="appUser in role.appRoleUsers.where(function(x) { return x.deleteMark == 0}).orderBy(function(x) { return x.user.fullname})"> <td style="width:5%"><button type="button" class="btn btn-xs btn-danger" v-on:click="Remove(role.name, appUser)"><i class="fa fa-remove"></i></button></td> <td>{{appUser.user.fullname}}</td> <td>{{appUser.username}}</td> <td>{{appUser.email}}</td> </tr> </template> <tr v-else> <td colspan="4">No Records Found...</td> </tr> </template> </tbody> <tbody v-else> <tr> <td>No Roles Found...</td> </tr> </tbody> </table> </div> </div> </div> <nc-modal v-on:reload="Reload"></nc-modal> </div>`,
    data() {
        return {
            appRoles: [],
            original: []
        }
    },
    methods: {
        Add() {
            new Modal(document.getElementById("NcManagerModal")).show();
        },
        Remove(role: string, appUser: Netcenter.IAppRoleUserDto) {
            if (confirm("Are you sure you want to remove " + appUser.user.fullname.toUpperCase() + " from " + role.toUpperCase() + " role")) {
                let vm = this as VueComp;
                vm.appRoles = [];
                let users = [] as Netcenter.UserEmailRoleDto[];
                users.push({ id: appUser.user.id, email: appUser.email, username: appUser.username });

                let config: Axios.AxiosXHRConfig<{}> = {
                    url: vm.$store.state.config.NetcenterBaseApi + "Netcenter/Roles/AppRoleUsers",
                    method: "DELETE",
                    params: {
                        "appName": vm.$store.state.config.AppName,
                        "appRole": role
                    },
                    data: users
                };

                vm.$http(config)
                    .then(() => {
                        GetData(vm);
                        vm.$forceUpdate();                       
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        Reload() {
            new Modal(document.getElementById("NcManagerModal")).hide();
            GetData(this);
        },
        Search(e: MouseEvent) {
            let vm = this as VueComp;
            let el = e.target as HTMLInputElement;
            if (el.value.trim() == "") {
                GetData(vm);
            }
            else {
                if (vm.original.length === 0) {
                    //make copy
                    vm.original = vm.appRoles;
                }                
                vm.appRoles = [];

                vm.original.forEach(role => {
                    //test for matching Role name
                    if (role.name.toLowerCase().indexOf(el.value.toLowerCase()) > -1) {
                        vm.appRoles.push(role);
                    }
                    ////test for matching Username/Email
                    //role.appRoleUsers.forEach(user => {
                    //    //if (user.username.toLowerCase().indexOf(el.value.toLowerCase()) > -1) {
                    //    //    vm.appRoles.push(role);
                    //    //}
                    //    if (user.email.toLowerCase().indexOf(el.value.toLowerCase()) > -1) {
                    //        vm.appRoles.push(role);
                    //    }
                    //});
                });
            }
        }
    },
    created() {
        GetData(this);
    }
} as ComponentOption

function GetData(vm: VueComp) {
    let url = vm.$store.state.config.NetcenterBaseApi + 'Netcenter/Apps/AppByName';

    vm.$http.get(url, { params: { 'appName': vm.$store.state.config.AppName, 'includeUserDetails': true }, headers: { 'Cache-Control': 'no-cache'} })
        .then(response => {
            let d = response.data as Netcenter.IAppDto;
            vm.appRoles = d.appRoles.where(x => x.deleteMark == 0).orderBy(x => x.name);
            vm.original = [];
        });
}

interface VueComp extends VueConstructor {
    appRoles: Netcenter.IAppRoleDto[];
    original: VueComp["appRoles"];
}