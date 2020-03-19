<template>
      <div id="FileAttachModal" class="modal" role="dialog" v-cloak>
    <div class="modal-dialog" style="margin-top:70px;">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">
            File Attachment
            <small>Documentum</small>
          </h4>
        </div>
        <div class="modal-body">
            <div></div>
            <vaildation-summary></vaildation-summary>
            <div class="row">
                <div class="col-lg-4">
                <div class="form-group-sm">
                    <label class="control-label">Folder Path</label>
                    <div>
                    <input type="text" class="form-control" disabled="disabled" :value="path" />
                    </div>
                </div>
                </div>
                <div class="col-lg-4">
                <div class="form-group-sm">
                    <label class="control-label">Project</label>
                    <div>
                    <input type="text" class="form-control" disabled="disabled" :value="project"/>
                    </div>
                </div>
                </div>
                <div class="col-lg-4"></div>
            </div>
            <p>&nbsp;</p>
            <div class="form-group">
              <label class="label-control text-danger">File</label>
              <div>
                <input type="file" style="width:100%;" :multiple="allowMultiple" value v-on:change="OnFileChange" />
              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-condensed">
                <thead>
                  <tr>
                    <td></td>
                    <td><label>Name</label></td>
                    <td><label>Title</label></td>
                    <td v-show="dataFile">
                      <label>Data File</label>
                      <span class="fa fa-question-circle" data-toggle="tooltip" title="Select this option for CONDA MDR file."></span>
                    </td>
                    <td><label>Size <small>(KB)</small></label></td>
                  </tr>
                </thead>
                <tbody v-if="fileList.length > 0">
                  <tr v-for="(row, idx) in fileList" :key="idx">
                    <td>
                      <button type="button" class="btn btn-xs btn-danger" @click="RemoveMedia(idx)">
                        <span class="fa fa-remove"></span>
                      </button>
                    </td>
                    <td>{{row.file.name}}</td>
                    <td>
                      <input type="text" class="form-control" v-model="row.tags.title" />
                    </td>
                    <td v-show="dataFile">
                      <div class="checkbox checkbox-success checkbox-inline">
                        <input class="styled mycheckbox" type="checkbox" value="false" v-model="row.tags.is_item_datafile"/>
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
            <button type="button" class="btn btn-success" @click="Vaildate">
                <span class="fa fa-upload"></span> Attach &amp; Upload
            </button>
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator";
    import VaildationSummary from "@ports/vue-vaildation-summary";
    import {AxiosRequestConfig} from "axios";
    import Modal from "modal";

    @Component({
        name: "file-attach",
        components: {
            VaildationSummary
        }
    })
    export default class FileAttach extends Vue { 
        public fileList:{ file:File, tags:IMediaProperty }[] = [];

        @Prop() !id:string;
        @Prop({default: false}) dataFile:boolean;
        @Prop({default: false}) allowMultiple:boolean;
        @Prop({default: "/"}) path:string;
        @Prop({default: ""}) project:string;

        OnFileChange(e: Event) {
            let input = e.target as HTMLInputElement;

            if (!this.allowMultiple && input.files.length > 0) {
                this.fileList = [];                
            }

            for (var i = 0; i < input.files.length; i++) {
                this.fileList.push({
                    "file": input.files[i],
                    "tags": {
                        title: null,
                        subject: null,
                        is_item_datafile: false
                    } as IMediaProperty
                });
            }
            input.value = "";
        }
        RemoveMedia(idx: number) {
            this.fileList.splice(idx, 1);
        }
        Vaildate() {
            let errors = [];
            this.$store.commit('vaildationSummary/Errors', []);

            if (this.fileList.length == 0) {
                errors.push({ "ErrorMessage": "Must select some files" });
            }
            else {
                for (let i of this.fileList) {
                    if (i.tags.title == null || i.tags.title.trim() == "") {
                        errors.push({ "ErrorMessage": i.file.name + ": Title is required" });
                    }
                }
            }

            if (errors.length == 0) {
                UploadFiles(this);
            }
            else {
                this.$store.commit('vaildationSummary/Errors', errors);
            }            
        }

    }

    /** Upload media files to server
     * @param vm FileAttach Vue instance
     */
    function UploadFiles(vm:FileAttach) {
        let mediaData = new FormData();
        mediaData.append("deleteList", new Blob());

        // append file, then attach media tags
        for (let i = 0; i < vm.fileList.length; i++) {
            //let b = new Blob([JSON.stringify(vm.fileList[i].file)], { type: "application/json" });
            mediaData.append(vm.fileList[i].file.name, vm.fileList[i].file);
            mediaData.append(vm.fileList[i].file.name, JSON.stringify(vm.fileList[i].tags));
        }

        let config = {
            url: "api/media/files",
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data"
            },
            params: {
                project: vm.project
            },
            data: mediaData
        } as AxiosRequestConfig;

        vm.$store.commit("pageloader", true);
        vm.$http(config)
            .then(resp => {
                vm.fileList = [];
                let obj = JSON.parse('{"' + vm.id + '":' + JSON.stringify(resp.data) + '}');
                vm.$emit("files", obj);
        });
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

<style lang="scss"></style>
