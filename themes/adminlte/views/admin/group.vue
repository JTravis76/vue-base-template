<template>
    <div class="container">
        <div class="box box-default">
            <div class="box-header with-border">
                <h3 class="box-title"></h3>
                <div class="box-tools pull-right">
                    <div class="btn-group">
                        <button class="btn btn-box-tool dropdown-toggle" type="button" data-toggle="dropdown"><i class="fa fa-wrench"></i></button>
                        <ul class="dropdown-menu" role="menu">
                            <li><router-link to="wiki/3"><span class="fa fa-question"></span> Help</router-link></li>
                        </ul>
                    </div>
                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                </div>
            </div>
            <div class="box-body">
                <div class="row">
                    <div class="col-lg-8">
                        <div style="margin-left:10px;">
                            <pagination TargetId="div-pager" v-bind:pageIndex="page" v-bind:totalPages="pagecount" v-on:callback="OnPaginate($event)"></pagination>
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
                <div class="table-responsive">
                    <table class="table table-condensed table-striped">
                        <thead>
                            <tr>
                                <td>
                                    <button type="button" class="btn btn-xs btn-info" v-on:click="Edit(-1)"><span class="fa fa-plus"></span></button>
                                </td>
                                <td><label>Group Name</label></td>
                                <td><label>Member Count</label></td>
                            </tr>
                        </thead>
                        <tbody v-if="groups.length > 0">
                            <tr v-for="(row, idx) in groups" :key="idx">
                                <td>
                                    <button type="button" class="btn btn-xs btn-primary" v-on:click="Edit(idx)"><span class="fa fa-edit"></span></button>
                                </td>
                                <td>{{row.name}}</td>
                                <td><label class="badge">{{row.groupMember.length}}</label></td>
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
        <group-modal v-bind:model="group" v-on:reload="Reload"></group-modal>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import Pagination from "@/components/Pagination.vue";
    import GroupModal from "./group-modal.vue";
    import { Group } from "@/models";
    import { AxiosRequestConfig } from "axios";
    import Modal from "modal";

    @Component({
        name: "group-types",
        components: {
            Pagination,
            GroupModal
        }
    })
    export default class Groups extends Vue {
        public page:number = 1;
        public pagecount:number = 1;
        public pagesize:number = 25;
        public search:string = "";
        public groups:Group[] = new Array<Group>();
        public group:Group = new Group();

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
        Edit(e: number) {
            this.$store.commit('vaildationSummary/Errors', []);
            if (e > -1)
                this.group = JSON.parse(JSON.stringify(this.groups[e]));
            else
                this.group = new Group();
            new Modal(document.getElementById("GroupModal")).show();
        }
        Reload() {
            new Modal(document.getElementById("GroupModal")).hide();
            this.group = new Group();
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
    function GetData(vm: Groups, page: number) {
        let config = {
            url: "api/admin/groups",
            method: "GET",
            params: {
                "page": page,
                "pagesize": vm.pagesize,
                "search": vm.search
            }
        } as AxiosRequestConfig

        // vm.$http(config)
        //     .then(response => {
        //         let d = response.data as { page: number, pagesize: number, groups: Group[] };
                let d = vm.$store.state.fakeData.emailGroups;
                vm.groups = d.groups;
                vm.page = d.page;
        //     });
    }
</script>

<style lang="scss"></style>
