import VaildationSummary from "../components/VaildationSummary"

export default {
    name: "grouptype-modal",
    components: {
        VaildationSummary
    },
    template: `<div id="ModalGroupType" class="modal" role="dialog"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal">&times;</button> <h4 class="modal-title">Group Type Properties</h4> </div> <div class="modal-body"> <vaildation-summary></vaildation-summary> <div class="form-group"> <label class="control-label text-danger">Group Type Name</label> <div> <input type="text" class="form-control" v-model="model.GroupTypeName" /> </div> </div> <hr /> <div class="row"> <div class="col-md-6"> <p class="text-info" style="float:left; padding-right:10px;"><b>Created By</b></p> <p>{{model.CreatedBy}}<br />{{model.CreatedDate | shortDateTimeString}}</p> </div> <div class="col-md-6"> <p class="text-info" style="float:left; padding-right:10px;"><b>Updated By</b></p> <p>{{model.UpdatedBy}}<br />{{model.UpdatedDate | shortDateTimeString}}</p> </div> </div> </div> <div class="modal-footer"> <button type="button" class="btn btn-danger" v-if="model.GroupTypeId > 0" v-on:click="Remove(model.GroupTypeId)"><span class="fa fa-remove"></span> Remove</button> <button type="button" class="btn btn-success" v-on:click="Save"><span class="fa fa-save"></span> Save</button> <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> </div> </div> </div></div>`,
    props: {
        model: {
            type: Object,
            required: true,
            default() {
                return new Models.GroupType();
            }
        }
    },
    methods: {
        Save() {
            let vm = this as VueComp;
            vm.$http.post('api/admin/grouptype', vm.model)
                .then(() => {
                    vm.$emit("reload");
                });
        },
        Remove(id) {
            if (!confirm('Are you sure you want to remove this Group Type?'))
                return;

            let vm = this as VueComp;
            vm.$http({ url: "api/admin/grouptype", method: "DELETE", params: { "id": id } })
                .then(() => {
                    vm.$emit("reload");
                });
        }
    }
} as ComponentOption

interface VueComp extends VueConstructor {
    model: Models.GroupType;
}