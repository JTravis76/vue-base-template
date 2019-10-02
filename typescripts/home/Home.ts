
export default {
    name: "home",
    components: {},
    template: `<div class="container"> <div class="panel"> <div class="panel-heading"> <div class="panel-toolbox"> <button type="button" class="btn btn-xs btn-default" data-widget="collapse"><i class="fa fa-minus"></i></button> <div class="btn-group"> <button class="btn btn-xs btn-default" type="button" data-toggle="dropdown"><i class="fa fa-wrench"></i></button> <ul class="dropdown-menu" role="menu"> <li><router-link to="/Wiki/1">Help</router-link></li> </ul> </div> <button type="button" class="btn btn-xs btn-default" data-widget="remove"><i class="fa fa-times"></i></button> </div> <h3 class="panel-title">Beginning of something awesome!!</h3> </div> <div class="panel-body"> <button type="button" class="btn btn-primary" v-on:click="ShowPageLoader">Page Loader</button> <div style="min-height:100px;"></div> </div> </div></div>`,
    data() {
        return {}
    },
    methods: {
        ShowPageLoader() {
            this.$store.commit("pageloader", true);
        }
    },
    mounted() {
        this.$nextTick()
        .then(() => {
            this.$panelWidget();
            BSN.initCallback();
        });
    }
} as ComponentOption

