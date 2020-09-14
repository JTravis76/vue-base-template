<template>
    <div id="ConfigModal" class="modal" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Configuration Properties</h4>
                </div>
                <div class="modal-body">
                    <validation-summary></validation-summary>
                    <div class="form-group">
                        <label class="control-label text-info">Name</label>
                        <input type="text" class="form-control" disabled="disabled" v-model="model.configName" data-testid="config-name" />
                    </div>
                    <div class="form-group" v-if="model.configType == 'Array'">
                        <label class="control-label text-danger">Values</label>
                        <span class="fa fa-question-circle" data-toggle="tooltip" title="Enter value and press Enter to create tag"></span>
                        <div>
                            <input type="text" class="form-control" v-model="textValue" v-on:keyup.enter="AddArray()" data-testid="config-value" />
                            <div style="min-height:40px; padding:10px;">
                                <label class="badge" style="margin:3px; cursor:pointer;" v-for="(element, idx) in AnonymousObject" v-on:click="Remove(idx)" v-bind:key="idx"><span class="fa fa-remove"></span> {{element}}</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group" v-else-if="model.configType == 'Object'">
                        <label class="control-label text-danger">Values</label>
                        <div class="table-responsive" style="max-height:200px;">
                            <table class="table table-condensed table-striped" data-testid="tbl-config-values">
                                <thead>
                                    <tr>
                                        <td>
                                            <button type="button" class="btn btn-xs btn-info" v-on:click="AddObject" data-testid="btn-insert-value"><span class="fa fa-plus"></span></button>
                                        </td>
                                        <td><label>Name</label></td>
                                        <td><label>Value</label></td>
                                    </tr>
                                </thead>
                                <tbody v-if="AnonymousObject.length > 0">
                                    <tr v-for="(row, idx) in AnonymousObject" v-bind:key="idx">
                                        <td>
                                            <button type="button" class="btn btn-xs btn-danger" v-on:click="Remove(idx)" :data-testid="'btn-remove-value-' + idx"><span class="fa fa-remove"></span></button>
                                        </td>
                                        <td><input type="text" class="form-control" v-model="row.Name" /></td>
                                        <td><input type="text" class="form-control" v-model="row.Value" /></td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <td colspan="3">No Records Found...</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div v-else>
                        <div class="form-group" v-show="model.configType !== 'Feature'">
                            <label class="control-label text-danger">Value</label>
                            <input type="text" class="form-control" v-model="model.configValue" data-testid="config-value" />
                        </div>
                        <div class="form-group form-inline">
                            <label class="control-label text-info">Status</label>
                            <div class="checkbox checkbox-success">
                                <input id="cb-config-status" class="styled" :disabled="model.configStatus === null" type="checkbox" v-model="model.configStatus" data-testid="config-status" />
                                <label for="cb-config-status"></label>
                            </div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="form-group">
                        <label class="control-label text-info">Description</label>
                        <textarea class="form-control" rows="4" v-model="model.description" data-testid="config-description"></textarea>
                    </div>
                    <hr />
                    <div class="row">
                        <div class="col-md-6">
                            <p class="text-info" style="float:left; padding-right:10px;"><b>Modified By</b></p>
                            <p>{{model.modifiedBy}}<br />{{model.modifiedDate | shortDateTimeString}}</p>
                        </div>
                        <div class="col-md-6">&nbsp;</div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" v-on:click="Save" data-testid="btn-save-config"><span class="fa fa-save"></span> Save</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal" data-testid="btn-close-config">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator";
    import ValidationSummary from "@/components/ValidationSummary.vue";
    import * as Models from "@/models";

    @Component({
        name: "config-modal",
        components: {
            ValidationSummary
        },
        watch: {
            model(n: Models.Config, o: Models.Config) {
                let vm = this as ConfigModal;
                if (n.configType == "Object" || n.configType == "Array") {
                    vm.AnonymousObject = JSON.parse(n.configValue);
                }
            }
        }
    })
    export default class ConfigModal extends Vue { 
        public AnonymousObject:any[] = [];
        public textValue:string = "";
        @Prop({default: new Models.Config()}) model: Models.Config;

        Save() {
            let vm = this;
            let copy = JSON.parse(JSON.stringify(vm.model)) as Models.Config;
            if (copy.configType == "Object" || copy.configType == "Array")
                copy.configValue = JSON.stringify(vm.AnonymousObject);

            vm.$http.post('api/admin/config', copy)
                .then(() => {
                    vm.$emit("reload");
                });

        }
        AddObject() {
            this.AnonymousObject.unshift({ "Name": "", "Value": ""});
        }
        Remove(idx) {
            this.AnonymousObject.splice(idx, 1);
        }
        AddArray() {
            this.AnonymousObject.unshift(this.textValue);
            this.textValue = "";
        }
        updated() {
            BSN.initCallback();
        }
    }
</script>

<style lang="scss"></style>
