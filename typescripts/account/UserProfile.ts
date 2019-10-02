import Avatar from "../components/Avatar";

export default {
    name: "user-profile",
    components: {
        Avatar
    },
    template: `<div class="row"> <div class="col-lg-2"> <div class="panel"> <div class="panel-heading"> <div class="panel-toolbox"> <button type="button" class="btn btn-xs btn-default" data-widget="collapse"><i class="fa fa-minus"></i></button> <button type="button" class="btn btn-xs btn-default" data-widget="remove"><i class="fa fa-remove"></i></button> </div> <h3 class="panel-title">Avatar</h3> </div> <div class="panel-body"> <div style="padding: 10px 40px;"> <avatar round :name="Fullname" ></avatar> </div> </div> </div> </div> <div class="col-lg-10"> <div class="panel"> <div class="panel-heading"> <h3 class="panel-title">About Me</h3> </div> <div class="panel-body"> <div class="row"> <div class="col-lg-6"> <div class="row"> <div class="col-lg-6"> <div class="form-group"> <label class="control-label text-info">First Name</label> <div> <input type="text" class="form-control" disabled="disabled" :value="Fullname.split(',')[1]" /> </div> </div> </div> <div class="col-lg-6"> <div class="form-group"> <label class="control-label text-info">Last Name</label> <div> <input type="text" class="form-control" disabled="disabled" :value="Fullname.split(',')[0]" /> </div> </div> </div> </div> <div class="form-group"> <label class="control-label text-info">Title</label> <div> <input type="text" id="txt-user-title" class="form-control" v-model="user.Title" /> </div> </div> <div class="form-group"> <label class="control-label text-info">Bio</label> <div> <textarea id="txt-user-bio" class="form-control" rows="4" v-model="user.Bio"></textarea> </div> </div> </div> <div class="col-lg-6"> <div class="row"> <div class="col-lg-6"> <div class="form-group"> <label class="control-label text-info">Badge</label> <div> <input type="text" class="form-control" disabled="disabled" v-bind:value="$store.state.profile.user.Badge" /> </div> </div> <div class="form-group"> <label class="control-label text-info">Email</label> <div> <input type="text" class="form-control" disabled="disabled" v-bind:value="$store.state.profile.user.Email" /> </div> </div> <div class="form-group"> <label class="control-label text-info">Phone</label> <div> <input type="text" class="form-control" disabled="disabled" v-bind:value="$store.state.profile.user.Phone" /> </div> </div> </div> <div class="col-lg-6"> <div class="form-group"> <label class="control-label text-info">NT Username</label> <div> <input type="text" class="form-control" disabled="disabled" v-bind:value="$store.state.profile.user.NtUsername" /> </div> </div> <div class="form-group"> <label class="control-label text-info">Member Since</label> <div> <input type="text" class="form-control" disabled="disabled" v-bind:value="$store.state.profile.user.HireDate | shortDateString" /> </div> </div> </div> </div> </div> </div> <div class="row"> <div class="col-lg-12"> <label class="control-label text-info">Roles</label> <div> <template v-for="role in $store.state.profile.roles"> <label class="label label-default">{{role}}</label>&nbsp; </template> </div> <p>&nbsp;</p> </div> </div> <div class="row"> <div class="col-lg-12"> <button type="button" class="btn" v-bind:class="[savedStatus ? 'btn-success' : 'btn-primary']" v-on:click="Save"><span class="fa fa-save"></span> Save</button> <router-link to="/Home" class="btn btn-default"> Cancel</router-link> </div> </div> </div> </div> </div></div>`,
    data: function () {
        return {
            user: { Title: "", Bio: "" },
            savedStatus: false
        }
    },
    computed: {
        Fullname() {
            if (this.$store.state.profile.user.Fullname != undefined) {
                return this.$store.state.profile.user.Fullname;
            }
            return "";
        }
    },
    methods: {
        Save() {
            let vm = this as VueComp;

            var gql = {
                "query": "mutation UserInfo($t:String,$b:String){userInfo(title:$t,bio:$b){Title Bio}}",
                "variables": { "t": vm.user.Title, "b": vm.user.Bio },
                "operationName": "UserInfo"
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
                    let d = response.data as unknown as VueComp["result"];
                    vm.savedStatus = true;
                    vm.$store.commit("profile/Info", d.data.userInfo);
                });
        }
    },
    created() {
        let vm = this as VueComp;
        vm.user.Bio = vm.$store.state.profile.info.Bio;
        vm.user.Title = vm.$store.state.profile.info.Title;
    },
    mounted() {
        this.$panelWidget();
    }
} as ComponentOption


interface VueComp extends VueConstructor {
    user: { Title?: string, Bio?: string };
    savedStatus: boolean;
    result: { data: { userInfo: { Title: string, Bio: string } } };
}
