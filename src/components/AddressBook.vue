<template>
    <div id="AddressBookModal" class="modal" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" v-on:click="Close" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">Add/Remove Members</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="row">
                                <div class="col-lg-8">
                                    <div style="margin-left:10px;">
                                        <pagination :pageIndex="page" :totalPages="pagecount" v-on:callback="OnPaginate($event)"></pagination>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="pull-right input-group" style="margin-top:15px; margin-right:5px;">
                                        <input type="text" class="form-control" placeholder="search..." value="" v-on:keyup.enter="OnSearch" />
                                        <span class="input-group-btn">
                                            <select id="ddl-page-size" class="form-control" style="width:auto;" v-on:change="OnPageChange">
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                            </select>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <p>&nbsp;</p>
                            <div class="clearfix"></div>
                            <div style="position:relative">
                                <div class="loading" v-show="loading">
                                    <div class="loading-inner">
                                        <div class="loading-content"> Loading... </div>
                                    </div>
                                </div>
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <strong><span class="badge">{{resultCount}}</span> Search Results</strong>
                                    </div>
                                    <div class="panel-body">
                                        <div style="height:200px; overflow-x:auto;">
                                            <table class="table table-hover table-condensed">
                                                <thead>
                                                    <tr>
                                                        <th>Action</th>
                                                        <th>Member Name</th>
                                                        <th>Email Address</th>
                                                        <th>Username</th>
                                                    </tr>
                                                </thead>
                                                <tbody v-if="activelist.length > 0">
                                                    <tr v-for="(row, idx) in activelist" :key=idx>
                                                        <td><button type="button" class="btn btn-xs btn-primary" title="Add Member" v-on:click="AddMember(idx)"><span class="fa fa-user-plus"></span></button></td>
                                                        <td>{{row.fullname}}</td>
                                                        <td>{{row.email}}</td>
                                                        <td>{{row.ntUsername}}</td>
                                                    </tr>
                                                </tbody>
                                                <tbody v-else>
                                                    <tr>
                                                        <td colspan="4">No Records Found...</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <strong><span class="badge">{{selectedlist.length}}</span> Selected</strong>
                                </div>
                                <div class="panel-body">
                                    <div style="height:200px; overflow-x:auto;">
                                        <table class="table table-hover table-condensed">
                                            <thead>
                                                <tr>
                                                    <th>Action</th>
                                                    <th>Member Name</th>
                                                    <th>Email Address</th>
                                                    <th>Username</th>
                                                </tr>
                                            </thead>
                                            <tbody v-if="selectedlist.length > 0">
                                                <tr v-for="(row, idx) in selectedlist" :key="idx">
                                                    <td><button type="button" class="btn btn-xs btn-danger" title="Remove Member" v-on:click="Remove(idx)"><span class="fa fa-remove"></span></button></td>
                                                    <td>{{row.fullName}}</td>
                                                    <td>{{row.email}}</td>
                                                    <td>{{row.userName}}</td>
                                                </tr>
                                            </tbody>
                                            <tbody v-else>
                                                <tr>
                                                    <td colspan="4">No Records Selected...</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" v-on:click="Close">Update</button>
                    <button type="button" class="btn btn-default" v-on:click="Cancel">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator";
    import Modal from "modal";
    import { AxiosRequestConfig } from "axios";
    import Pagination from "./Pagination.vue";
    import { IUserDto } from "typings/application/netcenter";

    @Component({
        name: "address-book",
        components: {
            Pagination
        }
    })
    export default class AddressBook extends Vue {
        public activelist: IUserDto[] = [];
        public page: number = 1;
        public pagecount: number = 1;
        public pagesize: number = 25;
        public search: string = "";
        public resultCount: number = 0;
        public loading: boolean = false;

        @Prop({ default: () => { return new Array<GrpMemberExt>(); } }) readonly selectedlist: GrpMemberExt[];
        @Prop({ default: 0 }) readonly groupId: number;

        OnPageChange(e) {
            this.pagesize = e.target.value;
            GetData(this, 1);
        }
        OnPaginate(page: number) {
            GetData(this, page);
        }
        OnSearch(e) {
            this.search = e.target.value;
            GetData(this, 1);
        }
        Close() {
            new Modal(document.getElementById("AddressBookModal")).hide();
        }
        Cancel() {
            let list = this.selectedlist;
            for (let idx = (list.length - 1); idx >= 0; idx--) {
                if (list[idx].isNew) {
                    list.splice(idx, 1);
                }
            }

            this.Close();
        }
        AddMember(idx: number) {
            this.selectedlist.push({
                isNew: true,
                groupId: this.groupId,
                email: this.activelist[idx].email,
                fullName: this.activelist[idx].fullname,
                userName: this.activelist[idx].ntUsername
            });
        }
        Remove(idx: number) {
            //this list is reactive back to parent component
            this.selectedlist.splice(idx, 1);
        }
        created() {
            GetData(this, 1);
        }
    }

    /**
     * Paginate through the Model's records
     * @param vm Vue instance of the component
     * @param page page number to fetch
     */
    function GetData(vm: AddressBook, page: number) {
        // let url = vm.$store.state.config.NetcenterApi + "Netcenter/Users/SearchUsers?deleteMark=0&sortColumn=name&sortOrder=asc";
        // url += `&pageNumber=${page}&pageSize=${vm.pagesize}&name=${vm.search}`;

        // fetch(url, {
        //     method: "GET",
        //     cache: "no-cache",
        //     credentials: "include",
        //     headers: {
        //         "content-type": "application/json"
        //     }
        // }).then(resp => {
        //     if (resp.ok)
        //         return resp.json();
        // }).then(data => {
        //     vm.activelist = data.users;
        //     vm.pagecount = data.totalPages;
        //     vm.resultCount = data.resultCount;
        // });

        vm.activelist = vm.$store.state.fakeData.addressBook.users;
        vm.pagecount = vm.$store.state.fakeData.addressBook.totalPages;
        vm.resultCount = vm.$store.state.fakeData.addressBook.resultCount;
    }

    ///**
    // * Gets data from server
    // * @param vm AddressBook - vue instance
    // * @param page page number to fetch
    // */
    //function GetData(vm: AddressBook, page: number) {
    //    vm.$graphql({
    //        query: "query Search($p1:Int,$p2:Int,$p3:String){searchUsers(page:$p1,pagesize:$p2,search:$p3){total,pageCount,users{fullName,email,userName}}}",
    //        variables: { "p1": page, "p2": vm.pagesize, "p3": vm.search },
    //        operationName: "Search"
    //    }).then(resp => {
    //        console.log(resp);
    //        //vm.activelist = resp.data.searchUsers.users;
    //        //vm.resultCount = resp.data.searchUsers.total;
    //        vm.page = page;
    //    });
    //}

    /** AddressBook.vue */
    export class Group {
        constructor() {
            this.id = 0;
            this.name = "";
            this.isDeleted = false;

            this.groupMembers = [];
        }
        public id?: number;
        public name?: string;
        public createdBy?: string;
        public createdDate?: string | Date;
        public updatedBy?: string;
        public updatedDate?: string | Date;
        public isDeleted?: boolean;

        public groupMembers?: GroupMember[];
    }    

    /** AddressBook.vue */
    export class GroupMember {
        constructor() {
            this.groupId = 0;
            this.userName = "";
            this.fullName = "";
            this.email = "";

            this.group = null;
        }
        public groupId?: number;
        public userName?: string;
        public fullName?: string;
        public email?: string;

        public group?: Group;
    }

    /**Extends the GroupMember class */
    export class GrpMemberExt extends GroupMember {
        constructor() {
            super();

            this.isNew = false;
        }
        public isNew: boolean;
    }
</script>

<style lang="scss"></style>
