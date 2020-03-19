<template>
  <div v-bind:id="id" class="modal" role="dialog" v-cloak>
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">
            Media
            <small>Documentum</small>
          </h4>
        </div>
        <div class="modal-body">
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
          <media-files v-on:update="UpdateData($event)" ref="media" :filepath="path" apiPath="api/media/files" :allowDeletes="true"></media-files>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" v-on:click="Save">
            <span class="fa fa-save"></span> Save
          </button>
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator";
    import MediaFiles, {IMediaDocument, IMediaProperty} from "./Media.vue";
    import {AxiosRequestConfig} from "axios";

    @Component({
        name: "media-modal",
        components: {
            MediaFiles
        }
    })
    export default class MediaModal extends Vue {
        public fileList:{ file:File, tags:IMediaProperty }[] = [];
        public deleteList: string[] = new Array<string>();

        @Prop({default: "MedialModal"}) id:string;
        @Prop({default: "/"}) path:string;
        @Prop({default: ""}) project:string;

        $refs!: {
            media: MediaFiles;
        }
        //(vm.$refs["media"] as MediaFiles).isLoading = false;

        UpdateData(e: { add: any; delete: string[] }) {
            this.fileList = e.add;
            this.deleteList = e.delete;
        }
        Save() {
            let vm = this;
            /** FormData consist of both Files(Blobs) and form data, String data is pass as form data */
            let mediaData = new FormData();
            mediaData.append("deleteList", vm.deleteList.toString());

            //append file, then attach media tags
            for (let i = 0; i < vm.fileList.length; i++) {
                //let b = new Blob([JSON.stringify(vm.fileList[i].file)], { type: "application/json" });
                mediaData.append(vm.fileList[i].file.name, vm.fileList[i].file);
                mediaData.append( vm.fileList[i].file.name, JSON.stringify(vm.fileList[i].tags) );
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

            vm.$refs.media.isLoading = true;

            vm.$http(config).then(() => {
                vm.$http.get("api/media/files", { params: { path: vm.path } })
                    .then(response => {
                            //update data on child component via reference
                            vm.$refs.media.documents = response.data;
                            vm.$refs.media.fileList = [];
                            vm.$refs.media.deleteList = [];

                            vm.$refs.media.isLoading = false;
                        });

                        vm.fileList = [];
                        vm.deleteList = [];
                    });
            }
        }
</script>

<style lang="scss"></style>
