<template>
    <div>
        <div style="position:relative;">
            <div class="media-loading" v-show="isLoading">
                <div class="loading-inner">
                    <div class="loading-content">Loading...</div>
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading">
                    <div class="pull-right">
                        <button type="button" class="btn btn-xs btn-info" v-if="hasPermission && allowUploads" @click="OpenFileAttach">
                            <span class="fa fa-upload"></span> Attach/Upload Media
                        </button>
                    </div>
                    <h3 class="panel-title">Media</h3>
                </div>
                <div class="panel-body">
                    <div class="pull-left">
                        <label class="label label-warning" v-show="fileList.length > 0" @click="Clear('upload')" style="cursor:pointer;">
                            <span class="fa fa-remove"></span>
                            {{fileList.length}} files pending upload
                        </label>
                        <label class="label label-danger" v-show="deleteList.length > 0" @click="Clear('delete')" style="cursor:pointer;">
                            <span class="fa fa-remove"></span>
                            {{deleteList.length}} files pending deletetion
                        </label>
                    </div>
                    <div class="clearfix"></div>
                    <div class="table-responsive" style="max-height:200px;">
                        <table id="MediaTable" class="table table-striped table-condensed">
                            <thead>
                                <tr>
                                    <td></td>
                                    <td>
                                        <label>TITLE</label>
                                    </td>
                                    <td>
                                        <label>DATE</label>
                                    </td>
                                    <td>
                                        <label>CONTENT TYPE</label>
                                    </td>
                                    <td>
                                        <label>CONTENT SIZE</label>
                                    </td>
                                </tr>
                            </thead>
                            <tbody v-if="documents.length > 0">
                                <tr v-for="(file, idx) in documents" :key="idx">
                                    <td>
                                        <span v-if="hasPermission && allowDeletes">
                                            <button type="button"
                                                    class="btn glyphicon glyphicon-remove-circle btn-danger btn-xs"
                                                    v-on:click="DeleteMedia(idx, file.properties['r_object_id'])"></button>
                                        </span>
                                    </td>
                                    <td>
                                        <a target="_blank"
                                           v-bind:href="file.href"
                                           v-bind:title="file.properties['object_name']">
                                            <div class="single-line"
                                                 style="width:200px;"
                                                 v-if="file.properties['title'] != ''">{{file.properties['title']}}</div>
                                            <div class="single-line"
                                                 style="width:200px;"
                                                 v-else>{{file.properties['object_name']}}</div>
                                        </a>
                                    </td>
                                    <td>{{file.properties['r_creation_date'] | shortDateString}}</td>
                                    <td>{{file.properties['a_content_type']}}</td>
                                    <td>{{Math.round(file.properties['r_content_size'] / 1024).toFixed(1)}} KB</td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="5">No Records Found...</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div id="AddMediaModal" class="modal" role="dialog">
            <div class="modal-dialog" style="margin-top:70px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" v-on:click="CloseFileAttach">&times;</button>
                        <h4 class="modal-title">Add Files</h4>
                    </div>
                    <div class="modal-body">
                        <vaildation-summary></vaildation-summary>
                        <div class="form-group">
                            <label class="label-control text-danger">File</label>
                            <div>
                                <input type="file" id="txt-file" style="width:100%;" multiple v-on:change="OnFileChange" />
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-condensed">
                                <thead>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <label>Name</label>
                                        </td>
                                        <td>
                                            <label>Title</label>
                                        </td>
                                        <td v-show="dataFile">
                                            <label>Data File</label>
                                            <span class="fa fa-question-circle"
                                                  data-toggle="tooltip"
                                                  title="Select this option for CONDA MDR file."></span>
                                        </td>
                                        <td>
                                            <label>
                                                Size
                                                <small>KB</small>
                                            </label>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody v-if="fileList.length > 0">
                                    <tr v-for="(row, idx) in fileList" :key="idx">
                                        <td>
                                            <button type="button"
                                                    class="btn btn-xs btn-danger"
                                                    v-on:click="RemoveMedia(idx)">
                                                <span class="fa fa-remove"></span>
                                            </button>
                                        </td>
                                        <td>{{row.file.name}}</td>
                                        <td>
                                            <input type="text" class="form-control" v-model="row.tags.title" />
                                        </td>
                                        <td v-show="dataFile">
                                            <div class="checkbox checkbox-success checkbox-inline">
                                                <input class="styled mycheckbox"
                                                       type="checkbox"
                                                       value="false"
                                                       v-model="row.tags.is_item_datafile" />
                                                <label>
                                                    <b>&nbsp;</b>
                                                </label>
                                            </div>
                                        </td>
                                        <td>{{Math.round(row.file.size / 1024).toFixed(2)}}</td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <td colspan="5">No Records Found...</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" v-on:click="Cancel">Cancel</button>
                        <button type="button" class="btn btn-success" v-on:click="AddFile">
                            <span class="glyphicon glyphicon-upload"></span> Add File
                        </button>
                        <button type="button" class="btn btn-default" v-on:click="CloseFileAttach">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator";
    import VaildationSummary from "./ValidationSummary.vue";

    @Component({
        name: "media-files",
        components: {
            VaildationSummary
        },
         watch: {
            filepath(n, o) {
                let vm = this as MediaFiles;
                vm.isLoading = true;
                vm.documents = [];

                //vm.$http.get(this.apiPath, { params: { path: n } })
                //    .then(resp => {
                //        vm.documents = resp.data as IMediaDocument[];
                //        vm.isLoading = false;
                //    });
            }
         }
    })
    export default class MediaFiles extends Vue {
        public isLoading:boolean = false;
        public documents:IMediaDocument[] = new Array<IMediaDocument>();
        public fileList:any[] = [];
        public deleteList:string[] = new Array<string>();
        public temp:any[] = [];

        //@Prop({ default: () => { return new Array<IMediaDocument>(); } }) documents: IMediaDocument[];
        @Prop({required: true}) apiPath:string;
        @Prop({required: true, default: "/"}) filepath:string;
        @Prop({default: false}) dataFile:boolean;
        @Prop({default: false}) allowUploads:boolean;
        @Prop({default: false}) allowDeletes:boolean;

        get hasPermission() {
            return true; //this.$UserInRole(['Admin']);
        }

        OpenFileAttach() {
            new Modal(document.getElementById("AddMediaModal")).show();
        }
        CloseFileAttach() {
            new Modal(document.getElementById("AddMediaModal")).hide();
            let body = document.getElementsByTagName('body').item(0);
            body.className += ' modal-open';
        }
        OnFileChange(e) {
            for (var i = 0; i < e.target.files.length; i++) {
                this.fileList.push({
                    "file": e.target.files[i],
                    "tags": {
                        title: null,
                        subject: null,
                        is_item_datafile: false
                    } as IMediaProperty
                });
            }
            e.target.value = "";
        }
        AddFile() {
            let errors = [];
            this.$store.commit('vaildationSummary/Errors', []);

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
                this.$store.commit('vaildationSummary/Errors', errors);
            }
        }
        Cancel() {
            if (confirm("By canceling will remove all selected files. Are you sure?")) {
                this.ClearChanges();
                this.CloseFileAttach();
                //Update parent component
                this.$emit('update', { "add": this.fileList, "delete": this.deleteList });
            }
        }
        RemoveMedia(idx: number) {
            this.fileList.splice(idx, 1);
        }
        DeleteMedia(idx: number, objId: string) {
            this.deleteList.push(objId);
            this.temp.push(this.documents.splice(idx, 1)[0]);
            //Update parent component
            this.$emit('update', { "add": this.fileList, "delete": this.deleteList });
        }
        ClearChanges() {
            this.fileList = [];
            this.deleteList = [];
        }
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
    }

    interface IFileList {
        file: { 
            lastModifiedDate: Date, 
            name: string, 
            size: number, 
            type: string 
        }; 
        tags: IMediaProperty;
    }

    export interface IMediaDocument {
        definition?: string;
        href?: string;
        links?: string;
        name?: string;
        properties?: IMediaProperty;
        type?: string;
    }
    export interface IMediaProperty {
        a_content_type?: string;
        acl_domain?: string;
        acl_name?: string;
        batch_no?: string;
        deleter?: string;
        fileid?: number;
        group_name?: string;
        group_permit?: number;
        is_deleted?: number;
        is_item_datafile?: boolean;
        language_code?: string;
        letternumber?: string;
        log_entry?: string;
        object_name?: string;
        owner_name?: string;
        owner_permit?: string;
        r_content_size?: string;
        r_creation_date?: string;
        r_modify_date?: string;
        r_object_id?: string;
        r_object_type?: string;
        requestnumber?: string;
        resolution_label?: string;
        subject?: string;
        title?: string;
        uploader?: string;
        world_permit?: number;
    }
</script>

<style lang="scss">
    .media-loading {
        z-index: 99;
        position: absolute;
        background-color: rgba(0, 0, 0, 0.35);
        width: 100%;
        height: 100%;
        padding-top: 6%;

        .loading-inner {
            background-color: #3c8dbc;
            border: 2px solid black;
            border-radius: 4px;
            left: 0px;
            right: 0px;
            max-width: 150px;
            margin-left: auto;
            margin-right: auto;
        }

        .loading-content {
            color: white;
            font-weight: bold;
            font-size: 14px;
            padding: 10px;
            background: url(data:image/gif;base64,R0lGODlhEAALAPQAAP///wAAANra2tDQ0Orq6gYGBgAAAC4uLoKCgmBgYLq6uiIiIkpKSoqKimRkZL6+viYmJgQEBE5OTubm5tjY2PT09Dg4ONzc3PLy8ra2tqCgoMrKyu7u7gAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCwAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA) no-repeat right center;
            margin: 0px 30px 0px 10px;
        }
    }
</style>
