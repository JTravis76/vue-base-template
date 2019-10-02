import { Modal } from "bootstrap-native"
import Pagination from "../components/Pagination"
import GrouptypeModal from "./GroupTypeModal"

export default {
    name: "group-types",
    components: {
        Pagination,
        GrouptypeModal
    },
    template: `<div class="container"> <div class="panel"> <div class="panel-heading"> <div class="panel-toolbox"> <button type="button" class="btn btn-xs btn-default" data-widget="collapse"><i class="fa fa-minus"></i></button> <button type="button" class="btn btn-xs btn-default" data-widget="remove"><i class="fa fa-times"></i></button> </div> <h3 class="panel-title">&nbsp;{{title}}</h3> </div> <div class="panel-body"> <div class="row"> <div class="col-lg-8"> <div style="margin-left:10px;"> <pagination TargetId="div-pager" v-bind:PageIndex="page" v-bind:TotalPages="pagecount" v-on:callback="OnPaginate($event)"></pagination> </div> </div> <div class="col-lg-4"> <div class="pull-right input-group" style="margin-top:15px; margin-right:5px;"> <input type="text" class="form-control" placeholder="search..." value="" v-on:keyup.enter="OnSearch" /> <span class="input-group-btn"> <select id="ddl-page-size" class="form-control" style="width:auto;" v-on:change="OnPageChange"> <option value="25">25</option> <option value="50">50</option> <option value="100">100</option> </select> </span> </div> </div> </div> <div class="table-responsive"> <table class="table table-condensed table-striped"> <thead> <tr> <td><button type="button" class="btn btn-xs btn-info" v-on:click="Add"><span class="fa fa-plus"></span></button></td> <td><label>Group Type Name</label></td> <td><label>Created By</label></td> <td><label>Created Date</label></td> </tr> </thead> <tbody v-if="groupTypes.length > 0"> <tr v-for="(row, index) in groupTypes"> <td><button type="button" class="btn btn-xs btn-primary" v-on:click="Edit(index)"><span class="fa fa-edit"></span></button></td> <td>{{row.GroupTypeName}}</td> <td>{{row.CreatedBy}}</td> <td>{{row.CreatedDate | shortDateString}}</td> </tr> </tbody> <tbody v-else> <tr> <td colspan="4">No Records Found...</td> </tr> </tbody> </table> </div> </div> </div> <grouptype-modal v-bind:model="groupType" v-on:reload="Reload"></grouptype-modal></div>`,
    data() {
        return {
            title: "Group Types",
            page: 1,
            pagecount: 1,
            pagesize: 25,
            search: "",
            groupTypes: new Array<Models.GroupType>(),
            groupType: new Models.GroupType()
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
            let vm = this as VueComp;
            vm.$store.commit('vaildation/errors', []);
            vm.groupType = new Models.GroupType();
            new Modal(document.getElementById("ModalGroupType")).show();
        },
        Edit(e: number) {
            let vm = this as VueComp;
            vm.$store.commit('vaildation/errors', []);
            vm.groupType = JSON.parse(JSON.stringify(vm.groupTypes[e]));
            new Modal(document.getElementById("ModalGroupType")).show();
        },
        Reload() {
            new Modal(document.getElementById("ModalGroupType")).hide();
            GetData(this, 1);
        }
    },
    created() {
        GetData(this, 1);
    },
    mounted() {
        this.$panelWidget();
        BSN.initCallback();
    }
} as ComponentOption

/**
 * Paginate through the Model's records
 * @param vm Vue instance of the component
 * @param page page number to fetch
 */
function GetData(vm: VueComp, page: number) {
    let config: Axios.AxiosXHRConfig<{}> = {
        url: "api/admin/grouptypes",
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
    //         vm.groupTypes = d.groupTypes;
    //         vm.pagecount = d.pagecount;
    //         vm.page = page;
    //     });
}

interface VueComp extends VueConstructor {
    groupTypes: Models.GroupType[];
    groupType: Models.GroupType;
    pagecount: number;
    page: number;
    pagesize: number;
    search: string;
    title: string;

    paginateModel: { total: number, pagecount: number, groupTypes: Models.GroupType[] };
}