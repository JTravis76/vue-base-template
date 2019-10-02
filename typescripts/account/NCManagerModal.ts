import Picker from "../components/ModalPicker"
import { Modal, Dropdown } from "bootstrap-native"

export default {
    name: "ncmanager-modal",
    components: {
        Picker
    },
    template: `<div> <div id="NcManagerModal" class="modal" role="dialog"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button> <h4 class="modal-title" id="myModalLabel">NC Manager User Setup</h4> </div> <div class="modal-body"> <div class="form-group"> <label class="control-label text-danger">Roles</label> <div class="form-inline"> <input class="form-control" type="text" disabled="disabled" v-model="role"> <button type="button" class="btn btn-secondary" v-on:click="RolePicker"><span class="fa fa-ellipsis-h"></span></button> </div> </div> <div class="form-group"> <label class="control-label">Users</label> <div class="dropdown" v-bind:class="[searchList.length > 0 ? 'open' : '']"> <input id="txt-user" class="form-control" type="text" placeholder="Search..." v-on:keyup.enter="Search"> <ul class="dropdown-menu" v-show="searchList.length > 0"> <li v-for="(list, index) in searchList"><a href="#" v-on:click.prevent="Select(index)">{{list.fullname}}</a></li> </ul> </div> <div style="min-height:25px;"> <template v-for="(list, index) in users"> <span class="badge"><i class="fa fa-remove" style="cursor:pointer;" v-on:click="Remove(index)"></i> {{list.fullname}}</span>&nbsp; </template> </div> </div> </div> <div class="modal-footer"> <button type="button" class="btn btn-success" v-on:click="Save"><span class="fa fa-save"></span> Save</button> <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> </div> </div> </div> </div> <picker id="RolePicker" title="Roles" v-bind:data="roles" v-on:select="UpdateModel($event)"></picker></div>`,
    data() {
        return {
            searchList: [],
            users: [],
            roles: [],
            role: ""
        }
    },
    methods: {
        Search(e) {
            let vm = this as VueComp;
            vm.searchList = [];
            let txt = e.target as HTMLInputElement;

            if (txt.value.length > 0) {
                vm.$http.get(vm.$store.state.config.NetcenterBaseApi + "Netcenter/Users/SearchUsers", { params: { "pageNumber": 1, "pageSize": 15, "name": txt.value, "deleteMark": 0 } })
                    .then(response => {
                        let data: any = response.data;
                        vm.searchList = data.users as Netcenter.IUserDto[];
                    });
                //vm.$http.get(vm.$store.state.config.NetcenterBaseApi + "Netcenter/Users/SearchUsers", { params: { "pageNumber": 1, "pageSize": 15, "username": txt.value, "deleteMark": 0 } })
                //    .then(response => {
                //        let data: any = response.data;
                //        vm.searchList.concat(data.users as Netcenter.IUserDto[]);
                //    });  
            }
        },
        UpdateModel(e: App.IPicker) {
            let vm = this as VueComp;
            switch (e.id) {
                case "RolePicker":
                    vm.role = e.selection.value.toString();
                    break;
                default:
            }
        },
        Remove(idx: number) {
            this.userList.splice(idx, 1);
        },
        Select(idx: number) {
            let user = this.searchList.splice(idx, 1)[0] as Netcenter.IUserDto;
            this.users.push({ id: user.id, email: user.email, username: user.ntUsername, fullname: user.fullname } as Netcenter.UserEmailRoleDto)
        },
        RolePicker() {
            new Modal(document.getElementById("RolePicker")).show();
        },
        Save() {
            let vm = this as VueComp;
            let config: Axios.AxiosXHRConfig<{}> = {
                url: vm.$store.state.config.NetcenterBaseApi + "Netcenter/Roles/AppRoleUsers",
                method: "POST",
                params: {
                    "appName": vm.$store.state.config.AppName,
                    "appRole": vm.role
                },
                data: vm.users
            };

            vm.$http(config)
                .then(() => {
                    let txt = document.getElementById("txt-user") as HTMLInputElement;
                    txt.value = "";
                    vm.searchList = [];
                    vm.users = [];
                    vm.role = "";
                    vm.$emit("reload");
                });
        }
    },
    created() {
        // let vm = this as VueComp;
        // vm.$http.get(vm.$store.state.config.NetcenterBaseApi + "Netcenter/Roles/AppRoleNames", { params: { "appName": vm.$store.state.config.AppName }})
        //     .then(response => {
        //         let r = response.data as string[];
        //         r.forEach(role => {
        //             vm.roles.push({ text: role, value: role });
        //         });
        //     })        
    },
    mounted() {
        let el = document.getElementById("txt-user");
        new Dropdown(el, true);
    }
} as ComponentOption

interface VueComp extends VueConstructor {
    users: Netcenter.UserEmailRoleDto[];
    roles: App.IPickerSelection[];
    role: string;
    searchList: Netcenter.IUserDto[]
}
