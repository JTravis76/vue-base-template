<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="box box-default">
                    <div class="box-header with-border">
                        <h3 class="box-title">{{title}}</h3>
                        <div class="box-tools pull-right">
                            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                            <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                        </div>
                    </div>
                    <div class="box-body">
                        <div v-show="this.$UserInRole('Admin')">
                            <validation-summary></validation-summary>
                            <div class="row">
                                <div class="col-lg-7">
                                    <div class="input-group">
                                        <span class="input-group-addon"><span class="text-bold text-danger">Message</span></span>
                                        <textarea class="form-control" rows="5" v-model="systemnotice.Message"></textarea>
                                    </div>
                                </div>
                                <div class="col-lg-2">
                                    <label class="radio-inline">
                                        <input type="radio" name="radioButtonGroup" value="fa fa-circle" v-model="systemnotice.Status" />
                                        <span>Normal</span>
                                    </label>
                                    <br />
                                    <label class="radio-inline">
                                        <input type="radio" name="radioButtonGroup" value="text-success fa fa-check" v-model="systemnotice.Status" />
                                        <span class="text-success">Successful</span>
                                    </label>
                                    <br />
                                    <label class="radio-inline">
                                        <input type="radio" name="radioButtonGroup" value="text-info fa fa-exclamation-circle" v-model="systemnotice.Status" />
                                        <span class="text-info">Information</span>
                                    </label>
                                    <br />
                                    <label class="radio-inline">
                                        <input type="radio" name="radioButtonGroup" value="text-warning fa fa-exclamation-triangle" v-model="systemnotice.Status" />
                                        <span class="text-warning">Warning</span>
                                    </label>
                                    <br />
                                    <label class="radio-inline">
                                        <input type="radio" name="radioButtonGroup" value="text-danger fa fa-exclamation-triangle" v-model="systemnotice.Status" />
                                        <span class="text-danger">Important</span>
                                    </label>
                                </div>
                                <div class="col-lg-3">
                                    <div class="form-group">
                                        <label class="control-label text-danger">Start Date</label>
                                        <div>
                                            <datepicker placeholder="Select Date" v-model="systemnotice.StartDate" name="StartDate" input-class="form-control" format="M/d/yyyy"></datepicker>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label text-danger">Expired Date</label>
                                        <div>
                                            <datepicker placeholder="Select Date" v-model="systemnotice.ExpiredDate" name="ExpiredDate" input-class="form-control" format="M/d/yyyy"></datepicker>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div class="row">
                                <div class="col-lg-12">
                                    <button type="button" class="btn btn-primary" v-on:click="Save"><span class="fa fa-save"></span> Submit</button>
                                    <button type="button" class="btn btn-info" v-on:click="Reset"><span class="fa fa-refresh"></span> Reset</button>
                                </div>
                            </div>
                            <hr />
                        </div>
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
                        <table class="table table-condensed table-striped">
                            <thead>
                                <tr>
                                    <td></td>
                                    <td><label>Status</label></td>
                                    <td><label>Message</label></td>
                                    <td><label>Start Date</label></td>
                                    <td><label>Expired Date</label></td>
                                </tr>
                            </thead>
                            <tbody v-if="systemnotices.length > 0">
                                <tr v-for="(row, index) in systemnotices">
                                    <td>
                                        <button type="button" class="btn btn-xs btn-primary" v-on:click="Edit(index)"><span class="fa fa-edit"></span></button>
                                    </td>
                                    <td><span v-bind:class="row.Status"></span></td>
                                    <td>{{row.Message}}</td>
                                    <td>{{row.StartDate | shortDateTimeString}}</td>
                                    <td>{{row.ExpiredDate | shortDateTimeString}}</td>
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
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { AxiosRequestConfig } from "axios";
    import Pagination from "@/components/Pagination.vue";
    import ValidationSummary from "@/components/ValidationSummary.vue";
    import Datepicker from "~/@ports/vue-datepicker/index";
    import * as Models from "@/models";

    @Component({
        name: "notification",
        components: {
            Pagination,
            ValidationSummary,
            Datepicker
        }
    })
    export default class Notification extends Vue { 
        public title:string = "";
        public page:number = 1;
        public pagecount:number = 1;
        public pagesize:number = 25;
        public search:string = "";
        public systemnotices:Models.Notification[] = new Array<Models.Notification>();
        public systemnotice:any = new Models.Notification();


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
            this.systemnotice = JSON.parse(JSON.stringify(this.systemnotices[e]));
        }
        Reset() {
            this.systemnotice = new Models.Notification();
        }
        Save() {
            let vm = this as Notification;
            vm.$http.post('api/home/notification', vm.systemnotice)
                .then(() => {
                    GetData(vm, 1);
                    vm.systemnotice = new Models.Notification();
                });
        }
        created() {
            GetData(this, 1);
        }
    }

    /**
     * Paginate through the records
     * @param vm Vue instance of the component
     * @param page page number to fetch
     */
    function GetData(vm: Notification, page: number) {
        let config = {
            url: "api/home/notifications",
            method: "GET",
            params: {
                "page": page,
                "pagesize": vm.pagesize,
                "search": vm.search
            }
        } as AxiosRequestConfig;

        vm.$http(config)
            .then(response => {
                let d = response.data as { page: number, pagecount: number, notifications: Notification["systemnotices"] };
                vm.systemnotices = d.notifications;
                vm.page = d.page;
                vm.pagecount = d.pagecount;
            });
    }
</script>

<style lang="scss"></style>
