import { Modal } from "bootstrap-native"
import VaildationSummary from "../components/VaildationSummary"
import ModalPicker from "../components/ModalPicker"
import MemberModal from "./MemberEmailModal"

export default {
    name: "group-modal",
    components: {
        VaildationSummary,
        ModalPicker,
        MemberModal
    },
    template: `<div id="GroupModal" class="modal" role="dialog"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal">&times;</button> <h4 class="modal-title">Group Properties</h4> </div> <div class="modal-body"> <vaildation-summary></vaildation-summary> <div class="form-group"> <div class="row"> <div class="col-md-6"> <p class="text-danger"><b>Group Name</b></p> <input type="text" class="form-control" v-model="model.GroupName" /> </div> <div class="col-md-6"> <p class="text-danger"><b>Group Type</b></p> <div> <div class="input-group"> <input type="text" class="form-control" disabled="disabled" v-model="model.GroupType.GroupTypeName" v-if="model.GroupType != null" /> <input type="text" class="form-control" disabled="disabled" value="" v-else /> <span class="input-group-btn"> <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#GroupTypesPicker"><span class="fa fa-ellipsis-h"></span></button> </span> </div> </div> </div> </div> <p></p> <div class="row"> <div class="col-md-12" style="overflow-x:auto; height:230px;"> <table class="table table-striped"> <thead> <tr> <th><button type="button" class="btn btn-xs btn-info" v-on:click="Add"><span class="fa fa-plus"></span> Add</button></th> <th>Member Name</th> <th>NT Username</th> </tr> </thead> <tbody v-if="model.GroupMember.length > 0"> <tr v-for="(row, index) in model.GroupMember"> <td><button class="btn btn-xs btn-danger" title="Remove Member" v-on:click="RemoveMember(index)"><span class="fa fa-remove"></span></button></td> <td>{{row.FullName}}</td> <td>{{row.NtUserName}}</td> </tr> </tbody> <tbody v-else> <tr> <td colspan="3" style="text-align:left;">No Records Found...</td> </tr> </tbody> </table> </div> </div> <hr /> <div class="row"> <div class="col-md-6"> <p class="text-info" style="float:left; padding-right:10px;"><b>Created By</b></p> <p>{{model.CreatedBy}}<br />{{model.CreatedDate | shortDateTimeString}}</p> </div> <div class="col-md-6"> <p class="text-info" style="float:left; padding-right:10px;"><b>Updated By</b></p> <p>{{model.UpdatedBy}}<br />{{model.UpdatedDate | shortDateTimeString}}</p> </div> </div> </div> </div> <div class="modal-footer"> <button type="button" class="btn btn-danger" v-if="model.GroupId > 0" v-on:click="Remove(model.GroupId)"><i class="fa fa-remove"></i> Remove</button> <button type="button" class="btn btn-success" v-on:click="Save"><i class="fa fa-save"></i> Save</button> <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> </div> </div> </div> <MemberModal v-bind:selectedlist="selectedlist" v-bind:id="model.GroupId"></MemberModal> <modal-picker id="GroupTypesPicker" title="Group Types" isSubModal ajax v-on:select="UpdateModel($event)" url="api/picker/grouptypes"></modal-picker></div>`,
    data() {
        return {
            selectedlist: [] as Models.GroupMember[]
        }
    },
    props: {
        model: {
            type: Object,
            required: true,
            default() {
                return new Models.Group();
            }
        }
    },
    methods: {
        Save() {
            let vm = this;
            let copy = JSON.parse(JSON.stringify(vm.model)) as Models.Group;
            copy.GroupType = null;

            //clear the nested Group object
            for (var i of copy.GroupMember) {
                i.Group = null;
            }

            vm.$http.post('api/admin/group', copy)
                .then(() => {
                    vm.$emit("reload");
                });

        },
        Remove(id) {
            if (!confirm('Are you sure you want to remove this Group and its members?'))
                return;

            let vm = this;            
            vm.$http({ url: "api/admin/group", method: "DELETE", params: { "id": id } })
                .then(() => {
                    vm.$emit("reload");
                });
        },
        Add() {
            //did not copy object here to maintain reactive
            this.selectedlist = this.model.GroupMember;
            new Modal(document.getElementById("MemberEmailModal")).show();
        },
        RemoveMember(idx: number) {
            this.model.GroupMember.splice(idx, 1);
        },
        UpdateModel(e: App.IPicker) {
            let vm = this;
            switch (e.id) {
                case "GroupTypesPicker":
                    vm.model.GroupTypeId = e.selection.value;
                    vm.model.GroupType.GroupTypeName = e.selection.text;
                    break;
            }
        }
    },
    mounted() {
        BSN.initCallback();
    }
} as ComponentOption