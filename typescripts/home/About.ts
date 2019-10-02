export default {
    name: "about-page",
    components: {},
    template: `<div class="container"> <div class="panel"> <div class="panel-heading"> <div class="panel-toolbox"> <button type="button" class="btn btn-xs btn-default" data-widget="collapse"><i class="fa fa-minus"></i></button> <button type="button" class="btn btn-xs btn-default" data-widget="remove"><i class="fa fa-times"></i></button> </div> <h3 class="panel-title"><span class="fa fa-question-circle"></span> About - {{$store.state.config.AppFullName}}</h3> </div> <div class="panel-body"> <div class="table-responsive"> <table class="table table-condensed table-striped"> <tbody> <tr> <td class="text-bold">Application Name</td> <td>{{$store.state.config.Acronym}}</td> </tr> <tr> <td class="text-bold">Description</td> <td>{{$store.state.config.Description}}</td> </tr> <tr> <td class="text-bold">Application Version</td> <td>{{$store.state.config.Version}}</td> </tr> <tr> <td class="text-bold">Third-Party API</td> <td><a :href="$store.state.config.NetcenterBaseApi" target="_blank" style="color:royalblue;">{{$store.state.config.NetcenterBaseApi}}</a></td> </tr> <tr> <td class="text-bold">API Base URL</td> <td><a :href="$store.state.config.BaseURL" target="_blank" style="color:royalblue;">{{$store.state.config.BaseURL}}</a></td> </tr> <tr> <td class="text-bold">API Version</td> <td>{{version}} compiled on {{versionDate | shortDateTimeString}} </td> </tr> </tbody> </table> </div> </div> </div></div>`,
    data() {
        return {
            version: "0.0.0.1",
            versionDate: "1900-01-01T00:00:00Z"
        }
    },
    created() {
        //GetData(this);

        this.$nextTick()
            .then(() => {
                this.$panelWidget();
            });
    }
} as ComponentOption

/** Gets data from a GraphQL server */
function GetData(vm: VueComp) {
    var gql = {
        "query": "query ServerInfo{aboutServer{version versionDate}}",
        "variables": null,
        "operationName": ""
    };

    var config = {
        url: vm.$store.state.config.BaseURL + "graphql",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: "POST",
        data: JSON.stringify(gql)
    };

    vm.$http(config)
        .then(response => {
            let d = response.data as unknown as { data: { aboutServer: { version: string, versionDate: string } } };
            vm.version = d.data.aboutServer.version;
            vm.versionDate = d.data.aboutServer.versionDate;
        });
}

interface VueComp extends VueConstructor {
    version: string;
    versionDate: string;
}