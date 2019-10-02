import { Modal } from "bootstrap-native"
import VaildationSummary from "../components/VaildationSummary"

export default {
    name: "media-modal",
    components: {
        VaildationSummary
    },
    template: `<div> <div style="position:relative;"> <div class="loading" v-show="isLoading"> <div class="loading-inner"> <div class="loading-content"> Loading... </div> </div> </div> <div class="panel panel-default"> <div class="panel-heading"> <div class="pull-right"> <button type="button" class="btn btn-xs btn-info" v-if="hasPermission" v-on:click="OpenFileAttach"><span class="fa fa-upload"></span> Attach/Upload Media</button> </div> <h3 class="panel-title">Media</h3> </div> <div class="panel-body"> <div class="pull-left"> <label class="label label-warning" v-show="fileList.length > 0" @click="Clear('upload')" style="cursor:pointer;"><span class="fa fa-remove"></span> {{fileList.length}} files pending upload</label> <label class="label label-danger" v-show="deleteList.length > 0" @click="Clear('delete')" style="cursor:pointer;"><span class="fa fa-remove"></span> {{deleteList.length}} files pending deletetion</label> </div> <div class="clearfix"></div> <div class="table-responsive" style="max-height:200px;"> <table id="MediaTable" class="table table-striped table-condensed"> <thead> <tr> <td></td> <td><label>TITLE</label></td> <td><label>DATE</label></td> <td><label>CONTENT TYPE</label></td> <td><label>CONTENT SIZE</label></td> </tr> </thead> <tbody v-if="documents.length > 0"> <tr v-for="(file, index) in documents"> <td> <span v-if="hasPermission"> <button type="button" class="btn glyphicon glyphicon-remove-circle btn-danger btn-xs" v-on:click="DeleteMedia(index, file.properties['r_object_id'])"></button> </span> </td> <td> <a target="_blank" v-bind:href="file.href" v-bind:title="file.properties['object_name']"> <div class="single-line" style="width:200px;" v-if="file.properties['title'] != ''">{{file.properties['title']}}</div> <div class="single-line" style="width:200px;" v-else>{{file.properties['object_name']}}</div> </a> </td> <td>{{file.properties['r_creation_date'] | shortDateString}}</td> <td>{{file.properties['a_content_type']}}</td> <td>{{Math.round(file.properties['r_content_size'] / 1024).toFixed(1)}} KB</td> </tr> </tbody> <tbody v-else> <tr> <td colspan="5">No Records Found...</td> </tr> </tbody> </table> </div> </div> </div> </div> <div id="AddMediaModal" class="modal" role="dialog"> <div class="modal-dialog" style="margin-top:70px;"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" v-on:click="CloseFileAttach">&times;</button> <h4 class="modal-title">Add Files</h4> </div> <div class="modal-body"> <vaildation-summary></vaildation-summary> <div class="form-group"> <label class="label-control text-danger">File</label> <div> <input type="file" id="txt-file" style="width:100%;" multiple value="" v-on:change="OnFileChange" /> </div> </div> <div class="table-responsive"> <table class="table table-condensed"> <thead> <tr> <td></td> <td><label>Name</label></td> <td><label>Title</label></td> <td> <label>Data File</label> <span class="fa fa-question-circle" data-toggle="tooltip" title="Select this option for CSV process file."></span> </td> <td><label>Size <small>KB</small></label></td> </tr> </thead> <tbody v-if="fileList.length > 0"> <tr v-for="(row, index) in fileList"> <td> <button type="button" class="btn btn-xs btn-danger" v-on:click="RemoveMedia(index)"><span class="fa fa-remove"></span></button> </td> <td>{{row.file.name}}</td> <td> <input type="text" class="form-control" v-model="row.tags.title" /> </td> <td> <div class="checkbox checkbox-success checkbox-inline"> <input class="styled mycheckbox" type="checkbox" value="false" v-model="row.tags.is_item_datafile" /> <label><b>&nbsp;</b></label> </div> </td> <td>{{Math.round(row.file.size / 1024).toFixed(2)}}</td> </tr> </tbody> <tbody v-else> <tr> <td colspan="5">No Records Found...</td> </tr> </tbody> </table> </div> </div> <div class="modal-footer"> <button type="button" class="btn btn-danger" v-on:click="Cancel">Cancel</button> <button type="button" class="btn btn-success" v-on:click="AddFile"><span class="glyphicon glyphicon-upload"></span> Add File</button> <button type="button" class="btn btn-default" v-on:click="CloseFileAttach">Close</button> </div> </div> </div> </div></div>`,
    data() {
        return {
            isLoading: false,
            documents: [] as App.IMediaDocument[],
            fileList: [],
            deleteList: [],
            temp: []
        }
    },
    computed: {
        hasPermission() {
            return this.$UserInRole(['Admin']);
        }
    },
    props: {
        filepath: {
            type: String,
            required: true,
            default: "/"
        }
    },
    methods: {
        UserInRole(roles: string[]) {
            //Did this due the Vue instance (this) is NOT available within a v-for loop
            return this.$UserInRole(roles);
        },
        OpenFileAttach() {
            new Modal(document.getElementById("AddMediaModal")).show();
        },
        CloseFileAttach() {
            new Modal(document.getElementById("AddMediaModal")).hide();
            let body = document.getElementsByTagName('body').item(0);
            body.className += ' modal-open';
        },
        OnFileChange(e) {
            for (var i = 0; i < e.target.files.length; i++) {
                this.fileList.push({
                    "file": e.target.files[i],
                    "tags": {
                        title: null,
                        subject: null,
                        is_item_datafile: false
                    } as App.IMediaProperty
                });
            }
            e.target.value = "";
        },
        AddFile() {
            let errors = [];
            this.$store.commit('vaildationSummary/errors', []);

            if (this.fileList.length == 0) {
                errors.push({ "ErrorMessage": "Must select some files" });
            }
            else {
                for (let i of this.fileList) {
                    if (i.tags.title == null || i.tags.title.trim() == "") {
                        errors.push({ "ErrorMessage": i.file.name +": Title is required" });
                    }
                }
            }

            if (errors.length == 0) {
                //Update parent component
                this.$emit('update', { "add": this.fileList, "delete": this.deleteList });
                this.CloseFileAttach();
            }
            else {
                //display the errors
                this.$store.commit('vaildationSummary/errors', errors);
            }
        },
        Cancel() {
            if (confirm("By canceling will remove all selected files. Are you sure?")) {
                this.ClearChanges();
                this.CloseFileAttach();
                //Update parent component
                this.$emit('update', { "add": this.fileList, "delete": this.deleteList });
            }
        },
        RemoveMedia(idx: number) {
            this.fileList.splice(idx, 1);
        },
        DeleteMedia(idx: number, objId: string) {
            this.deleteList.push(objId);
            this.temp.push(this.documents.splice(idx, 1)[0]);
            //Update parent component
            this.$emit('update', { "add": this.fileList, "delete": this.deleteList });
        },
        ClearChanges() {
            this.fileList = [];
            this.deleteList = [];
        },
        Clear(type: string) {
            if (type == "delete") {
                this.deleteList = [];

                this.temp.forEach(t => {
                    this.documents.push(t);
                });
                this.temp = [];
            }
            if (type == "upload")
                this.fileList = [];
        }
    },
    watch: {
        filepath(n, o) {
            let vm = this as VueComp;
            vm.isLoading = true;
            vm.documents = [];

            vm.$http.get("Media.ashx", { params: { type: "files", path: n } })
                .then(response => {
                    vm.documents = response.data as App.IMediaDocument[];
                    vm.isLoading = false;
                });
        }
    }
} as ComponentOption

interface VueComp extends VueConstructor {
    $http: Axios.AxiosStatic;
    isLoading: boolean;
    documents: App.IMediaDocument[];
    fileList: { file: { lastModifiedDate: Date, name: string, size: number, type: string }, tags: App.IMediaProperty }[];
}