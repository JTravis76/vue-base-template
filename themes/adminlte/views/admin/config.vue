<template>
    <div class="container">
        <div class="box box-default">
            <div class="box-header with-border">
                <h3 class="box-title"></h3>
                <div class="box-tools pull-right">
                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                    <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                </div>
            </div>
            <div class="box-body">
                <div class="table-responsive">
                    <table class="table table-condensed table-striped" data-testid="tbl-configurations">
                        <thead>
                            <tr>
                                <td></td>
                                <td><label>Name</label></td>
                                <td><label>Status</label></td>
                                <td><label>Description</label></td>
                            </tr>
                        </thead>
                        <tbody v-if="configs.length > 0">
                            <tr v-for="(row, idx) in configs" v-bind:key="idx">
                                <td>
                                    <button class="btn btn-xs btn-primary" v-on:click="Edit(idx)" :data-testid="'btn-edit-config-' + idx"><span class="fa fa-edit"></span></button>
                                </td>
                                <td>{{row.configName}}</td>
                                <td>
                                    <template v-if="row.configType === null || row.configType === 'Feature'">
                                        <label class="label label-default" v-if="row.configStatus === null">neutral</label>
                                        <label class="label label-success" v-else-if="row.configStatus">ON</label>
                                        <label class="label label-danger" v-else>OFF</label>
                                    </template>
                                </td>
                                <td>{{row.description}}</td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td colspan="5">No Records Found...</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <config-modal v-bind:model="config" v-on:reload="Reload"></config-modal>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { AxiosRequestConfig } from "axios";
    import { Config } from "@/models";
    import Pagination from "@/components/Pagination.vue";
    import ConfigModal from "./config-modal.vue";
    import Modal from "modal";

    @Component({
        name: "config-page",
        components: {
            Pagination,
            ConfigModal
        }
    })
    export default class ConfigPage extends Vue { 
        public page:number = 1;
        public pagecount:number = 1;
        public pagesize:number = 25;
        public search:string = "";
        public configs:Config[] = new Array<Config>();
        public config:Config = new Config();

        OnPageChange(e) {
            this.pagesize = e.target.value;
            GetData(this, 1);
        }
        OnPaginate(e) {
            GetData(this, e);
        }
        OnSearch(e) {
            this.search = e.target.value;
            GetData(this, 1);
        }
        Edit(e) {
            this.$store.commit("validationSummary/Errors", []);
            this.config = JSON.parse(JSON.stringify(this.configs[e]));
            new Modal(document.getElementById("ConfigModal")).show();
        }
        Reload() {
            new Modal(document.getElementById("ConfigModal")).hide();
            GetData(this, 1);
        }
        created() {
            GetData(this, 1);
        }
        mounted() {
            this.$boxWidget();
        }
    }

    /**
     * Paginate through the Model's records
     * @param vm Vue instance of the component
     * @param page page number to fetch
     */
    function GetData(vm: ConfigPage, page: number) {
        let config = {
            url: "api/admin/configs",
            method: "GET",
            params: {
                "page": page,
                "pagesize": vm.pagesize,
                "search": vm.search
            }
        } as AxiosRequestConfig;

        // vm.$http(config)
        //     .then(resp => {
        //         let d = resp.data as { configs: Config[], pagecount: number, page: number };
                let d = vm.$store.state.fakeData.settings;
                vm.configs = d.configs;
                vm.page = d.page;
                vm.pagecount = d.pagecount;
        //     });
    }
</script>

<style lang="scss"></style>
