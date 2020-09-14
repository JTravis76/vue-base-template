<template>
    <div>
        <div id="NcManagerModal" class="modal" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                        <h4 class="modal-title" id="myModalLabel">NC Manager <small>Add Users</small></h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label class="control-label text-danger">Roles</label>
                            <div class="form-inline">
                                <input class="form-control" type="text" disabled="disabled" v-model="role" data-testid="role">
                                <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#RolePicker" data-testid="btn-role-pick"><span class="fa fa-ellipsis-h"></span></button>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label">Users</label>
                            <div class="dropdown" v-bind:class="[searchList.length > 0 ? 'open' : '']">                                
                                <input id="txt-user" class="form-control" type="text" placeholder="Search Name..." v-on:keyup.enter="Search" data-testid="user-search">
                                <ul class="dropdown-menu" v-show="searchList.length > 0">
                                    <li v-for="(list, idx) in searchList" :key="idx">
                                        <a href="#" v-on:click.prevent="Select(idx)" :data-testid="'select-user-' + idx">{{list.fullname}}</a>
                                    </li>
                                </ul>
                            </div>
                            <div style="min-height:25px;">
                                <template v-for="(list, idx) in users">
                                    <span class="badge" :key="idx"><i class="fa fa-remove" style="cursor:pointer;" v-on:click="Remove(idx)" :data-testid="'remove-user-' + idx"></i> {{list.fullname}}</span>&nbsp;
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" v-on:click="Save" data-testid="btn-save-role"><span class="fa fa-save"></span> Save</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal" data-testid="btn-close-role">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <modal-picker id="RolePicker" title="Roles" v-bind:data="roles" v-on:select="Selection($event)"></modal-picker>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import ModalPicker from "@/components/ModalPicker.vue";
    import axios, { AxiosRequestConfig } from "axios";
    import Netcenter from "../../../typings/application/netcenter";
    import BSN from "bootstrap-native";
    import { IPicker, IPickerSelection } from "@/models";

    export default Vue.extend({
        name: "ncmanager-modal",
        components: {
            ModalPicker
        },
            data() {
            return {
                searchList: [],
                users: [],
                roles: [],
                role: ""
            }
        },
        methods: {
            Search() {
                let txt = document.getElementById("txt-user") as HTMLInputElement;
                let vm = this as VueComp;
                vm.searchList = [];

                if (txt.value.length > 0) {
                    axios.get(vm.$store.state.config.NetcenterBaseApi + "Netcenter/Users/SearchUsers", { params: { "pageNumber": 1, "pageSize": 15, "name": txt.value, "deleteMark": 0 } })
                        .then(resp => {
                            let users = resp.data.users as Netcenter.IUserDto[];
                            users.forEach(u => {
                                vm.searchList.push(u);
                            });
                        });
                    axios.get(vm.$store.state.config.NetcenterBaseApi + "Netcenter/Users/SearchUsers", { params: { "pageNumber": 1, "pageSize": 2, "username": txt.value, "deleteMark": 0 } })
                       .then(resp => {
                           let users = resp.data.users as Netcenter.IUserDto[];
                            users.forEach(u => {
                                vm.searchList.push(u);
                            });
                       });  
                }
            },
            Selection(e: IPicker) {
                let vm = this as VueComp;
                switch (e.id) {
                    case "RolePicker":
                        vm.role = e.selection.value.toString();
                        break;
                    default:
                }
            },
            Remove(idx: number) {
                this.users.splice(idx, 1);
            },
            Select(idx: number) {
                let user = this.searchList.splice(idx, 1)[0] as Netcenter.IUserDto;
                this.users.push({ id: user.id, email: user.email, username: user.ntUsername, fullname: user.fullname } as Netcenter.IUserEmailRoleDto)
            },
            Save() {
                let vm = this as VueComp;
                let config = {
                    url: vm.$store.state.config.NetcenterBaseApi + "Netcenter/Roles/AppRoleUsers",
                    method: "POST",
                    params: {
                        "appName": vm.$store.state.config.AppName,
                        "appRole": vm.role
                    },
                    data: vm.users
                } as AxiosRequestConfig;

                axios(config)
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
            let vm = this as VueComp;
            axios.get(vm.$store.state.config.NetcenterBaseApi + "Netcenter/Roles/AppRoleNames", { params: { "appName": vm.$store.state.config.AppName }})
                .then(response => {
                    let r = response.data as string[];
                    r.forEach(role => {
                        vm.roles.push({ text: role, value: role });
                    });
                })        
        },
        mounted() {
            BSN.initCallback();
            //when user selects the input box, hide the dropdown list
            let txt = document.getElementById("txt-user") as HTMLInputElement;
            txt.onclick = (e: PointerEvent) => {
                let el = e.target as HTMLInputElement;
                el.value = "";
                let div = el.parentNode as HTMLDivElement;
                div.classList.toggle("open");
            };
        }
    })

    interface VueComp extends Vue {
        users: Netcenter.IUserEmailRoleDto[];
        roles: IPickerSelection[];
        role: string;
        searchList: Netcenter.IUserDto[]
    }
</script>