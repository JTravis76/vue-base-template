import { Modal } from "bootstrap-native"
import Pagination from "../components/Pagination"
import ConfigModal from "./ConfigModal"

export default {
    name: "config-page",
    components: {
        Pagination,
        ConfigModal
    },
    template: `<div class="container"> <div class="panel"> <div class="panel-heading"> <h3 class="panel-title">Configuration Settings</h3> </div> <div class="panel-body"> <div class="table-responsive"> <table class="table table-condensed table-striped"> <thead> <tr> <td></td> <td><label>Name</label></td> <td><label>Status</label></td> <td><label>Description</label></td> </tr> </thead> <tbody v-if="configurations.length > 0"> <tr v-for="(row, index) in configurations"> <td> <button class="btn btn-xs btn-primary" v-on:click="Edit(index)"><span class="fa fa-edit"></span></button> </td> <td>{{row.ConfigName}}</td> <td> <template v-if="row.ConfigType == null"> <label class="label label-success" v-if="row.ConfigStatus">ON</label> <label class="label label-danger" v-else>OFF</label> </template> </td> <td>{{row.Description}}</td> </tr> </tbody> <tbody v-else> <tr> <td colspan="5">No Records Found...</td> </tr> </tbody> </table> </div> </div> </div> <config-modal v-bind:model="configuration" v-on:reload="Reload"></config-modal></div>`,
    data() {
        return {
            page: 1,
            pagecount: 1,
            pagesize: 25,
            search: "",
            configurations: new Array<Models.Config>(),
            configuration: new Models.Config()
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
        Edit(e: number) {
            this.$store.state.errorSummary = [];
            this.configuration = JSON.parse(JSON.stringify(this.configurations[e]));
            new Modal(document.getElementById("ConfigModal")).show();
        },
        Reload() {
            new Modal(document.getElementById("ConfigModal")).hide();
            GetData(this, 1);
        }
    },
    created: function () {
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
        url: "api/admin/configs",
        method: "GET",
        params: {
            "page": page,
            "pagesize": vm.pagesize,
            "search": vm.search
        }
    };

    //vm.$http(config)
    //    .then(response => {
    //        let data = response.data as VueComp["paginateModel"];
    //        vm.configs = data.configs;
    //        vm.pagecount = data.pagecount;
              vm.page = page;
    //    });
}

interface VueComp extends VueConstructor {
    page: number;
    pagecount: number;
    pagesize: number;
    search: string;
    configurations: Models.Config[];
    configuration: Models.Config;

    paginateModel: {configs: Models.Config[]; pagecount: number; page: number; pagesize: number; search: string;};
}
