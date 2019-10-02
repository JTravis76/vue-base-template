import { Modal } from "bootstrap-native"
import Pagination from "../components/Pagination"
import GroupModal from "./GroupModal"

export default {
    name: "group-types",
    components: {
        Pagination,
        GroupModal
    },
    template: `<div class="container"> <div class="panel"> <div class="panel-heading"> <div class="panel-toolbox"> <button type="button" class="btn btn-xs btn-default" data-widget="collapse"><i class="fa fa-minus"></i></button> <button type="button" class="btn btn-xs btn-default" data-widget="remove"><i class="fa fa-times"></i></button> </div> <h3 class="panel-title">&nbsp;{{title}}</h3> </div> <div class="panel-body"> <div class="row"> <div class="col-lg-8"> <div style="margin-left:10px;"> <pagination TargetId="div-pager" v-bind:PageIndex="page" v-bind:TotalPages="pagecount" v-on:callback="OnPaginate($event)"></pagination> </div> </div> <div class="col-lg-4"> <div class="pull-right input-group" style="margin-top:15px; margin-right:5px;"> <input type="text" class="form-control" placeholder="search..." value="" v-on:keyup.enter="OnSearch" /> <span class="input-group-btn"> <select id="ddl-page-size" class="form-control" style="width:auto;" v-on:change="OnPageChange"> <option value="25">25</option> <option value="50">50</option> <option value="100">100</option> </select> </span> </div> </div> </div> <div class="table-responsive"> <table class="table table-condensed table-striped"> <thead> <tr> <td> <button type="button" class="btn btn-xs btn-info" v-on:click="Add"><span class="fa fa-plus"></span></button> </td> <td><label>Group Name</label></td> <td><label>Group Type</label></td> <td><label>Member Count</label></td> </tr> </thead> <tbody v-if="groups.length > 0"> <tr v-for="(row, index) in groups"> <td> <button type="button" class="btn btn-xs btn-primary" v-on:click="Edit(index)"><span class="fa fa-edit"></span></button> </td> <td>{{row.GroupName}}</td> <td>{{row.GroupType.GroupTypeName}}</td> <td><label class="badge">{{row.GroupMember.length}}</label></td> </tr> </tbody> <tbody v-else> <tr> <td colspan="4">No Records Found...</td> </tr> </tbody> </table> </div> </div> </div> <group-modal v-bind:model="group" v-on:reload="Reload"></group-modal></div>`,
    data() {
        return {
            title: "Email Groups",
            page: 1,
            pagecount: 1,
            pagesize: 25,
            search: "",
            groups: new Array<Models.Group>(),
            group: new Models.Group()
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
        Add() {
            this.$store.commit('vaildation/errors', []);
            this.group = new Models.Group();
            new Modal(document.getElementById("GroupModal")).show();
        },
        Edit(e) {
            this.$store.commit('vaildation/errors', []);
            this.group = JSON.parse(JSON.stringify(this.groups[e]));
            new Modal(document.getElementById("GroupModal")).show();
        },
        Reload() {
            new Modal(document.getElementById("GroupModal")).hide();
            this.group = new Models.Group();
            GetData(this, 1);
        }
    },
    created() {
        GetData(this, 1);
    },
    mounted() {
        this.$panelWidget();
    }
} as ComponentOption

/**
 * Paginate through the Model's records
 * @param vm Vue instance of the component
 * @param page page number to fetch
 */
function GetData(vm: VueComp, page: number) {
    let config: Axios.AxiosXHRConfig<{}> = {
        url: "api/admin/groups",
        method: "GET",
        params: {
            "page": page,
            "pagesize": vm.pagesize,
            "search": vm.search
        }
    };

    // vm.$http(config)
    //     .then(response => {
    //         let d = response.data as VueComp["paginateModel"];
    //         vm.groups = d.groups;
    //         vm.page = page;
    //     });
}

interface VueComp extends VueConstructor {
    groups: Models.Group[];
    group: Models.Group;
    pagecount: number;
    page: number;
    pagesize: number;
    search: string;
    title: string;

    paginateModel: { total: number, pagesize: number, groups: Models.Group[] };
}