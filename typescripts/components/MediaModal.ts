import MediaFiles from "./Media"

export default {
    name: "media-modal",
    components: {
        MediaFiles
    },
    template: `<div v-bind:id="id" class="modal" role="dialog" v-cloak> <div class="modal-dialog modal-lg"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal">&times;</button> <h4 class="modal-title">Media <small>Documentum</small></h4> </div> <div class="modal-body"> <div class="row"> <div class="col-lg-4"> <div class="form-group-sm"> <label class="control-label">Folder Path</label> <div> <input type="text" class="form-control" disabled="disabled" :value="dataObj.path" /> </div> </div> </div> <div class="col-lg-4"> <div class="form-group-sm"> <label class="control-label">Project</label> <div> <input type="text" class="form-control" disabled="disabled" :value="dataObj.project" /> </div> </div> </div> <div class="col-lg-4"> <!--<div class="form-group-sm"> <label class="control-label">Title</label> <div> <input type="text" class="form-control" disabled="disabled" /> </div> </div>--> </div> </div> <p>&nbsp;</p> <media-files v-on:update="UploadData($event)" ref="media" v-bind:filepath="dataObj.path"></media-files> </div> <div class="modal-footer"> <button type="button" class="btn btn-success" v-on:click="Save"><span class="fa fa-save"></span> Save</button> <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> </div> </div> </div></div>`,
    data() {
        return {
            fileList: [],
            deleteList: []
        }
    },
    props: {
        dataObj: {
            type: Object,
            required: false,
            default() {
                return { path: "/", project: "" }
            }
        },
        id: {
            type: String,
            required: false,
            default: "MediaModal"
        }
    },
    methods: {
        UploadData(e: { add: any, delete: any }) {
            this.fileList = e.add;
            this.deleteList = e.delete;
        },
        Save() {
            let vm = this;// as VueComp;
            let mediaData = new FormData();

            //1st: append file, then attach media tags
            for (let i = 0; i < vm.fileList.length; i++) {
                //let b = new Blob([JSON.stringify(vm.fileList[i].file)], { type: "application/json" });

                mediaData.append(vm.fileList[i].file.name, vm.fileList[i].file);
                mediaData.append(vm.fileList[i].file.name, JSON.stringify(vm.fileList[i].tags));
            }

            //let blob = new Blob(vm.deleteList);
            //new Blob([JSON.stringify(vm.deleteList)], { type: "application/json" })
            mediaData.append("deleteList", vm.deleteList);

            let config: Axios.AxiosXHRConfig<{}> = {
                url: "api/media/files",
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                params: {
                    "project": vm.dataObj.project
                },
                data: mediaData
            };

            vm.$refs.media.isLoading = true;
            vm.$http(config)
                .then(() => {
                    vm.$http.get("api/media/files", { params: { path: vm.dataObj.path } })
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
} as ComponentOption

interface VueComp extends VueConstructor {
    id: string;
    dataObj: { path: string, project: string };
    fileList: { file: { lastModifiedDate?: Date, name?: string, size?: number, type?: string }, tags?: App.IMediaProperty }[];
    deleteList: string[];
}