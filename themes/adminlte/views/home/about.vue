<template>
    <div class="container">
        <div class="box box-default">
            <div class="box-header with-border">
                <h3 class="box-title"><span class="fa fa-question-circle"></span> About - {{$store.state.config.FullAppName}}</h3>
                <div class="box-tools pull-right">
                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                    <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                </div>
            </div>
            <div class="box-body">
                <div class="table-responsive">
                    <table class="table table-condensed table-striped">
                        <tbody>
                            <tr>
                                <td class="text-bold">Application Name</td>
                                <td>{{$store.state.config.AppName}}</td>
                            </tr>
                            <tr>
                                <td class="text-bold">Description</td>
                                <td>{{description}}</td>
                            </tr>
                            <tr>
                                <td class="text-bold">Application Version</td>
                                <td>{{appVersion}} compiled on {{appVersionDate | shortDateTimeString}}</td>
                            </tr>
                            <tr>
                                <td class="text-bold">NetCenter API</td>
                                <td><a :href="$store.state.config.NetcenterApi" target="_blank">{{$store.state.config.NetcenterApi}}</a></td>
                            </tr>
                            <tr>
                                <td class="text-bold">API Base URL</td>
                                <td><a :href="$store.state.config.ApplicationApi" target="_blank">{{$store.state.config.ApplicationApi}}</a></td>
                            </tr>
                            <tr>
                                <td class="text-bold">API Version</td>
                                <td>{{version}} compiled on {{versionDate | shortDateTimeString}} </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";

    @Component({
        name: "about-page"
    })
    export default class About extends Vue { 
        public version:number = 0;
        public versionDate:string = "1900-01-01";
        public description:string = "";
        public appVersion:string = "";
        public appVersionDate:string = "";

        created() {
            let vm = this as About;
            // this.$http.get("api/home/about")
            //     .then(resp => {
            //         vm.version = resp.data.version;
            //         vm.versionDate = resp.data.versionDate;
            //     });
            vm.version = 0;
            vm.versionDate = new Date().toString();

            this.appVersion = this.$store.state.config.Version;
            this.appVersionDate = this.$store.state.config.VersionDate;
            this.description = this.$store.state.config.Description;
        }
        mounted() {
            this.$boxWidget();
        }
    }
</script>