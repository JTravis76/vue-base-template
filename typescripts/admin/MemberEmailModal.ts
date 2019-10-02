import { Modal } from "bootstrap-native"
import Pagination from "../components/Pagination"

export default {
    name: "member-modal",
    components: {
        Pagination
    },
    template: `<div id="MemberEmailModal" class="modal" role="dialog" v-cloak> <div class="modal-dialog modal-lg"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" v-on:click="Close" aria-hidden="true">&times;</button> <h4 class="modal-title">Add/Remove Members</h4> </div> <div class="modal-body"> <div class="row"> <div class="col-lg-12"> <div class="row"> <div class="col-lg-8"> <div style="margin-left:10px;"> <pagination TargetId="div-pager" v-bind:PageIndex="page" v-bind:TotalPages="pagecount" v-on:callback="OnPaginate($event)"></pagination> </div> </div> <div class="col-lg-4"> <div class="pull-right input-group" style="margin-top:15px; margin-right:5px;"> <input type="text" class="form-control" placeholder="search..." value="" v-on:keyup.enter="OnSearch" /> <span class="input-group-btn"> <select id="ddl-page-size" class="form-control" style="width:auto;" v-on:change="OnPageChange"> <option value="25">25</option> <option value="50">50</option> <option value="100">100</option> </select> </span> </div> </div> </div> <p>&nbsp;</p> <div class="clearfix"></div> <div style="position:relative"> <div class="loading" v-show="loading"> <div class="loading-inner"> <div class="loading-content"> Loading... </div> </div> </div> <div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title"> <span class="badge">{{resultCount}}</span> Search Results</h3> </div> <div class="panel-body"> <div style="height:200px; overflow-x:auto;"> <table class="table table-hover table-condensed"> <thead> <tr> <th>Action</th> <th>Member Name</th> <th>Email Address</th> <th>NT Username</th> </tr> </thead> <tbody v-if="activelist.length > 0"> <tr v-for="(row, index) in activelist"> <td><button type="button" class="btn btn-xs btn-primary" title="Add Member" v-on:click="AddMember(index)"><span class="fa fa-user-plus"></span></button></td> <td>{{row.fullname}}</td> <td>{{row.email}}</td> <td>{{row.ntUsername}}</td> </tr> </tbody> <tbody v-else> <tr> <td colspan="4">No Records Found...</td> </tr> </tbody> </table> </div> </div> </div> </div> <div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title"><span class="badge">{{selectedlist.length}}</span> Selected</h3> </div> <div class="panel-body"> <div style="height:200px; overflow-x:auto;"> <table class="table table-hover table-condensed"> <thead> <tr> <th>Action</th> <th>Member Name</th> <th>Email Address</th> <th>NT Username</th> </tr> </thead> <tbody v-if="selectedlist.length > 0"> <tr v-for="(row, index) in selectedlist"> <td><button type="button" class="btn btn-xs btn-danger" title="Remove Member" v-on:click="Remove(index)"><span class="fa fa-remove"></span></button></td> <td>{{row.FullName}}</td> <td>{{row.Email}}</td> <td>{{row.NtUserName}}</td> </tr> </tbody> <tbody v-else> <tr> <td colspan="4">No Records Selected...</td> </tr> </tbody> </table> </div> </div> </div> </div> </div> </div> <div class="modal-footer"> <button type="button" class="btn btn-success" v-on:click="Close">Update</button> <button type="button" class="btn btn-danger" v-on:click="Cancel">Cancel</button> </div> </div> </div></div>`,
    data() {
        return {
            activelist: [],
            page: 1,
            pagecount: 1,
            pagesize: 25,
            search: "",
            resultCount: 0,
            loading: false
        }
    },
    props: {
        selectedlist: {
            type: Array,
            required: true,
            default() {
                return new Array<Models.GroupMember>();
            }
        },
        id: {
            type: Number,
            required: true
        }
    },
    methods: {
        OnPageChange(e: any) {
            this.pagesize = e.target.value;
            GetData(this, 1);
        },
        OnPaginate(e: any) {
            GetData(this, e);
        },
        OnSearch(e: any) {
            this.search = e.target.value;
            GetData(this, 1);
        },
        Close() {
            new Modal(document.getElementById("MemberEmailModal")).hide();
        },
        Cancel() {
            let vm = this as VueComp;

            // rollback any changes.
            //NOTE: had to use `this` vs `vm` due to constraint
            for (let m = vm.selectedlist.length - 1; m >= 0; m--) {
                if (this.selectedlist[m].IsNew === true)
                    vm.selectedlist.splice(m, 1);
            }

            this.Close();
        },
        Remove(id: number) {
            //this list is reactive back to parent component
            this.selectedlist.splice(id, 1);
        },
        AddMember(idx: number) {
            let vm = this as VueComp;
            //transform activelist object to selectedlist object since differ
            let member = new Models.GrpMember();
            member.GroupId = vm.id;
            member.Email = vm.activelist[idx].email;
            member.FullName = vm.activelist[idx].fullname;
            member.NtUserName = vm.activelist[idx].ntUsername;
            member.IsNew = true;

            vm.selectedlist.push(member);
        }
    },
    created() {
        GetData(this, 1);
    }
} as ComponentOption

/**
 * Paginate through the Model's records
 * @param vm Vue instance of the component
 * @param page page number to fetch
 */
function GetData(vm: VueComp, page: number) {
    let config: Axios.AxiosXHRConfig<{}> = {
        url: vm.$store.state.config.NetcenterBaseApi + "Netcenter/Users/SearchUsers",
        method: "GET",
        params: {
            "pageNumber": page,
            "pageSize": vm.pagesize,
            "name": vm.search,
            "deleteMark": 0,
            "sortColumn": "name",
            "sortOrder": "asc"
        }
    };

    vm.$http(config)
        .then(response => {
            let d = response.data as VueComp["paginateModel"];
            vm.activelist = d.users;
            vm.pagecount = d.totalPages;
            vm.resultCount = d.resultCount;
        });
}

interface VueComp extends VueConstructor {
    search: string;
    pagesize: number;
    activelist: any[];
    pagecount: number;
    resultCount: number;
    selectedlist: Models.GroupMember[];
    id: number;

    paginateModel: {users: Netcenter.IUserDto[], totalPages: number, resultCount: number};
}