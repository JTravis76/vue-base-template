<template>
    <div v-bind:id="id" class="modal" role="dialog">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" v-on:click="Close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">{{title}}</h4>
                </div>
                <div class="modal-body">
                    <input type="text" class="form-control" placeholder="Search..." v-on:keyup.enter="Search" style="width:100% !important;" />
                    <div class="table-responsive" v-bind:style="{height:height}">
                        <table class="table table-striped table-condensed">
                            <tbody v-if="master.length > 0">
                                <tr v-for="(row, index) in master">
                                    <td style="width:30px;">
                                        <button class="btn btn-xs btn-primary" v-on:click="OnSelection(index)" v-bind:class="[multi && row.selected ? 'btn btn-xs btn-success' : 'btn btn-xs btn-primary']">
                                            <i class="fa fa-square-o"></i>
                                        </button>
                                    </td>
                                    <td data-toggle="tooltip" v-bind:title="row.title" v-bind:class="{ 'alert-danger': row.disabled }">
                                        <div class="single-line">{{row.text}}</div>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td>No Records Found...</td>
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
    /* When using with bootstrap-native DATA-API,
     * Updated the Show() function to check for Vue instance
     * and if so, execute the Open() command to load data via HTTP
     * 
     * ~Line 1305 (bootstrap-native.js):
     * if (modal.__vue__) {
           let vm = modal.__vue__;
           if (vm.Open)
               vm.Open();
       }
     */
    import { Component, Vue, Prop } from "vue-property-decorator";
    import Modal from "modal";

    @Component({
        name: "modal-picker"
    })
    export default class ModalPicker extends Vue {
        public master:any[] = [];
        public original: any[] = [];

        @Prop({ default: "ModalPicker1" }) readonly id: string;
        @Prop({ default: "My Title" }) readonly title: string;
        @Prop({ default: "" }) readonly url: string;
        @Prop({ default: false }) readonly subModal: boolean;
        @Prop({ default: false }) readonly showBlank: boolean;
        @Prop({ default: false }) readonly multi: boolean;
        @Prop({
            default: () => {
                return [
                    { value: 1, text: "Selection 1", selected: false },
                    { value: 2, text: "Selection 2", selected: false, disabled: true },
                    { value: 3, text: "Selection 3", selected: false },
                    { value: 4, text: "Selection 4", selected: false, title: "I'm am a tooltip!" }
                ];
            }
        }) readonly data: IPickerSelection[];

        get height() {
            return this.master.length > 14 ? "500px" : "auto"
        }

        Open() {
            let vm = this;
            if (vm.url.trim().length > 0) {
                vm.$http.get(vm.url)
                    .then(resp => {
                        vm.master = resp.data as IPickerSelection[];

                        if (vm.showBlank)
                            vm.master.unshift({ value: 0, text: "" });
                    })
                    .catch(err => {
                        console.error("[vue-modal-picker] " + err);
                    });
            }
            else {
                //copy list to avoid mutating prop
                vm.master = JSON.parse(JSON.stringify(vm.data));
            }

            if (vm.showBlank)
                vm.master.unshift({ value: 0, text: "" });
        }
        Close() {
            new Modal(document.getElementById(this.id)).hide();

            if (this.subModal) {
                let body = document.getElementsByTagName('body')[0];
                body.className += ' modal-open';
            }
        }
        OnSelection(idx: number) {
            let vm = this;
            //copy some values from the selected button into an object
            let selection: IPickerSelection = {
                value: vm.master[idx].value,
                text: vm.master[idx].text,
                selected: true
            };

            //wrap selection into object to also pass ID so parent will know how to handle it
            let pickerWrapper: IPicker = { id: vm.id, selection };

            if (vm.multi) {
                //Toggle button if item was selected or not
                vm.master[idx].selected = !vm.master[idx].selected;
            }

            if (!vm.multi) {
                vm.Close();
                vm.$emit('select', pickerWrapper);
            }
            else {
                //send back an update or remove command
                if (vm.master[idx].selected) {
                    vm.$emit('select', pickerWrapper);
                }
                else {
                    vm.$emit('deselect', pickerWrapper);
                }
            }
        }
        Search(e) {
            let value = e.target.value as string;
            let vm = this;
            if (value.length > 0) {
                if (vm.original.length == 0)
                    vm.original = JSON.parse(JSON.stringify(vm.master));

                vm.master = [];
                vm.original.forEach(item => {
                    if (item.text.toLowerCase().indexOf(value.toLowerCase()) > -1) {
                        vm.master.push(item);
                    }
                });
            }
            else {
                //restore original
                vm.master = JSON.parse(JSON.stringify(vm.original));
            }
        }
    }

    export interface IPicker {
        id: string;
        selection: IPickerSelection;
    }

    export interface IPickerSelection {
        text: string;
        value: number | string;
        disabled?: boolean;
        title?: string;
        selected?: boolean;
    }
</script>

<style lang="scss"></style>
