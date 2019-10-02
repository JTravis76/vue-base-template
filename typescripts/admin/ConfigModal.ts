import VaildationSummary from "../components/VaildationSummary"

export default {
    name: "config-modal",
    components: {
        VaildationSummary
    },
    template: `<div id="ConfigModal" class="modal" role="dialog"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal">&times;</button> <h4 class="modal-title">Configuration Properties</h4> </div> <div class="modal-body"> <vaildation-summary></vaildation-summary> <div class="form-group"> <label class="control-label text-info">Name</label> <input type="text" class="form-control" disabled="disabled" v-model="model.ConfigName" /> </div> <div class="form-group" v-if="model.ConfigType == 'Array'"> <label class="control-label text-danger">Values</label> <span class="fa fa-question-circle" data-toggle="tooltip" title="Enter value and press Enter to create tag"></span> <div> <input type="text" class="form-control" v-model="textValue" v-on:keyup.enter="AddArray()" /> <div style="min-height:40px; padding:10px;"> <label class="badge" style="margin:3px; cursor:pointer;" v-for="(element, index) in AnonymousObject" v-on:click="Remove(index)"><span class="fa fa-remove"></span> {{element}}</label> </div> </div> </div> <div class="form-group" v-else-if="model.ConfigType == 'Object'"> <label class="control-label text-danger">Values</label> <div class="table-responsive" style="max-height:200px;"> <table class="table table-condensed table-striped"> <thead> <tr> <td> <button type="button" class="btn btn-xs btn-info" v-on:click="AddObject"><span class="fa fa-plus"></span></button> </td> <td><label>Name</label></td> <td><label>Value</label></td> </tr> </thead> <tbody v-if="AnonymousObject.length > 0"> <tr v-for="(row, index) in AnonymousObject"> <td> <button type="button" class="btn btn-xs btn-danger" v-on:click="Remove(index)"><span class="fa fa-remove"></span></button> </td> <td><input type="text" class="form-control" v-model="row.Name" /></td> <td><input type="text" class="form-control" v-model="row.Value" /></td> </tr> </tbody> <tbody v-else> <tr> <td colspan="3">No Records Found...</td> </tr> </tbody> </table> </div> </div> <div v-else> <div class="form-group"> <label class="control-label text-danger">Value</label> <input type="text" class="form-control" v-model="model.ConfigValue" /> </div> <div class="form-group form-inline"> <label class="control-label text-info">Status</label> <div class="checkbox checkbox-success"> <input id="cb-config-status" class="styled" type="checkbox" v-model="model.ConfigStatus" /> <label for="cb-config-status"></label> </div> </div> </div> <div class="clearfix"></div> <div class="form-group"> <label class="control-label text-info">Description</label> <textarea class="form-control" rows="4" v-model="model.Description"></textarea> </div> <hr /> <div class="row"> <div class="col-md-6"> <p class="text-info" style="float:left; padding-right:10px;"><b>Modified By</b></p> <p>{{model.ModifiedBy}}<br />{{model.ModifiedDate | shortDateTimeString}}</p> </div> <div class="col-md-6">&nbsp;</div> </div> </div> <div class="modal-footer"> <button type="button" class="btn btn-success" v-on:click="Save"><span class="fa fa-save"></span> Save</button> <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> </div> </div> </div></div>`,
    data() {
        return {
            AnonymousObject: [],
            textValue: ""
        }
    },
    props: {
        model: {
            type: Object,
            required: true,
            default() {
                return new Models.Config();
            }
        }
    },
    methods: {
        Save() {
            let vm = this;
            let copy: Models.Config = JSON.parse(JSON.stringify(vm.model));
            if (copy.ConfigType == "Object" || copy.ConfigType == "Array")
                copy.ConfigValue = JSON.stringify(vm.AnonymousObject);

            vm.$http.post('api/admin/config', copy)
                .then(() => {
                    vm.$emit("reload");
                });

        },
        AddObject() {
            this.AnonymousObject.unshift({ "Name": "", "Value": ""});
        },
        Remove(idx: number) {
            this.AnonymousObject.splice(idx, 1);
        },
        AddArray() {
            this.AnonymousObject.unshift(this.textValue);
            this.textValue = "";
        }
    },
    updated() {
        BSN.initCallback();
    },
    watch: {
        model(n: Models.Config, o: Models.Config) {
            let vm = this;
            if (n.ConfigType == "Object" || n.ConfigType == "Array") {
                vm.AnonymousObject = JSON.parse(n.ConfigValue);
            }
        }
    }
} as ComponentOption