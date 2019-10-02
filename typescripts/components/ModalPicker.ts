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
import { Modal } from "bootstrap-native"

export default {
    name: "modal-picker",
    template: `<div v-bind:id="id" class="modal" role="dialog"> <div class="modal-dialog modal-sm" style="margin-top:-15%;"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" v-on:click="Close" aria-label="Close"><span aria-hidden="true">×</span></button> <h4 class="modal-title">{{title}}</h4> </div> <div class="modal-body"> <input type="text" class="form-control" placeholder="Search..." v-on:keyup.enter="Search" style="width:100% !important;" /> <div class="table-responsive" v-bind:style="{height:height}"> <table class="table table-striped table-condensed"> <tbody v-if="master.length > 0"> <tr v-for="(row, index) in master"> <td style="width:30px;"> <button class="btn btn-xs btn-primary" v-on:click="OnSelection(index)" v-bind:class="[multi && row.selected ? 'btn btn-xs btn-success' : 'btn btn-xs btn-primary']"> <i class="fa fa-square-o"></i> </button> </td> <td data-toggle="tooltip" v-bind:title="row.title" v-bind:class="{ 'alert-danger': row.disabled }"> <div class="single-line">{{row.text}}</div> </td> </tr> </tbody> <tbody v-else> <tr> <td>No Records Found...</td> </tr> </tbody> </table> </div> <div class="form-group form-inline text-center" v-show="paging"> <button type="button" class="btn btn-sm btn-default" v-bind:disabled="pager.page == 1"><span class="fa fa-arrow-left"></span></button> <button type="button" class="btn btn-sm btn-default" v-bind:disabled="pager.page == pager.pagecount"><span class="fa fa-arrow-right"></span></button> <input type="text" class="form-control" style="width:50px;" v-model="pager.page" /> of {{pager.pagecount}} <button type="button" class="btn btn-sm btn-success">GO</button> </div> </div> </div> </div></div>`,
    data() {
        return {
            master: [],
            items: [],
            original: [],
            pager: { page: 1, pagecount: 1 }
        }
    },
    computed: {
        height() {
            return this.items.length > 14 ? "500px" : "auto"
        }
    },
    props: {
        id: {
            type: String,
            default: "ModalPicker1"
        },
        title: {
            type: String,
            default: "MyTitle"
        },
        url: {
            type: String,
            default: ""
        },
        subModal: {
            type: Boolean,
            default: false
        },
        showBlank: {
            type: Boolean,
            default: false
        },
        multi: {
            type: Boolean,
            default: false
        },
        paging: {
            type: Boolean,
            default: false
        },
        data: {
            type: Array,
            default() {
                return [
                    { value: 1, text: "Selection 1", selected: false },
                    { value: 2, text: "Selection 2", selected: false, disabled: true },
                    { value: 3, text: "Selection 3", selected: false },
                    { value: 4, text: "Selection 4", selected: false, title: "I'm am a tooltip!" },
                    { value: 5, text: "Selection 5", selected: false },
                    { value: 6, text: "Selection 6", selected: false },
                    { value: 7, text: "Selection 7", selected: false }
                ]
            }
        }
    },
    methods: {
        Open() {
            let vm = this as VueComp;
            if (vm.url.trim().length > 0) {
                vm.$http.get(vm.url)
                    .then(response => {
                        vm.master = response.data as App.IPickerSelection[];

                        if (vm.showBlank)
                            vm.master.unshift({ value: 0, text: "" });
                    });
            }
            else {
                //copy list to avoid mutating prop
                vm.master = JSON.parse(JSON.stringify(vm.data));
            }

            if (vm.showBlank)
                vm.master.unshift({ value: 0, text: "" });
        },
        Close() {
            new Modal(document.getElementById(this.id)).hide();

            if (this.subModal) {
                let body = document.getElementsByTagName('body')[0];
                body.className += ' modal-open';
            }
        },
        OnSelection(idx: number) {
            let vm = this as VueComp;
            //copy some values from the selected button into an object
            let selection: App.IPickerSelection = {
                value: vm.master[idx].value,
                text: vm.master[idx].text
            };

            //wrap selection into object to also pass ID so parent will know how to handle it
            let pickerWrapper: App.IPicker = { id: vm.id, selection };

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
        },
        Search(e) {
            let value = e.target.value as string;
            let vm = this as VueComp;
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
} as ComponentOption;

interface VueComp extends VueConstructor {
    id: string;
    title: string;
    url: string;
    subModal: boolean;
    showBlank: boolean;
    data: { value: number | string, text: string, selected?: boolean, disabled?: boolean, title?: string }[];
    multi: boolean;
    paging: boolean;

    original: VueComp["data"];
    master: VueComp["data"];

    Open(): void;
    Close(): void;
    OnSelection(idx: number): void;
    Search(e: string): void;
}