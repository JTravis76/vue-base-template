import Split from "../lib/spilt"

export default {
    name: "media-browser",
    components: {},
    template: `<div v-bind:id="id" class="modal" role="dialog" v-cloak> <div class="modal-dialog modal-lg"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal">&times;</button> <h4 class="modal-title">Media Browser <small>Documentum</small></h4> </div> <div class="modal-body"> <div style="position:relative;"> <div class="loading" v-show="isLoading"> <div class="loading-inner"> <div class="loading-content"> Loading... </div> </div> </div> <div class="input-group form-group-sm"> <span class="input-group-btn"> <button type="button" class="btn btn-sm btn-info" @click="Refresh"><span class="fa fa-refresh"></span></button> </span> <input type="text" class="form-control" disabled="disabled" v-model="folderPath" /> </div> <div style="margin:10px;"> <div id="pane1" class="split-pane"> <ul class="foldertree"> <li> <span class="fa fa-folder-open"> <span class="single-line text-black" @click="Home"> {{cabinetRoot}}</span> </span> <ul class="foldertree"> <li v-if="cabinetRoot != folderPath"> <span class="fa fa-folder-o"> <span class="single-line text-black" @click="UpLevel"> ...</span> </span> </li> <li v-for="folder in folders" @click="Get(folder.properties.object_name)"> <span class="fa fa-folder"> <span class="single-line text-black"> {{folder.properties.object_name}}</span> </span> </li> </ul> </li> </ul> </div> <div id="pane2" class="split-pane"> <template v-if="viewType=='tn'"> <template v-for="(file, index) in files"> <div class="detailview dropdown" :title="file.properties.object_name"> <div class="dropdown-toggle" data-toggle="dropdown"> <a href="#" class="fa fa-file-o"></a> </div> <div class="single-line font-10"> <span zzv-on:click.prevent.right="ContextMenu1">{{file.properties.object_name}}</span> </div> <ul class="dropdown-menu" role="menu"> <li> <a tabindex="-1" href="#" @click.prevent="SelectFile(index)"> <span class="fa fa-file-o"></span> <span class="text-bold">Select</span> </a> </li> <!--<li class="divider"></li>--> <li><a tabindex="-1" :href="file.href" target="_blank"><span class="fa fa-link"></span> Open</a></li> </ul> </div> </template> </template> <template v-else> <div class="table-responsive1"> <table class="table table-condensed table-hover listview"> <thead> <tr> <td>Name</td> <td>Date modified</td> <td>Size</td> </tr> </thead> <tbody> <tr v-for="(file, index) in files"> <td class="dropdown"> <a href="#" class="dropdown-toggle" data-toggle="dropdown"><span class="fa fa-file"></span> {{file.properties.object_name}}</a> <ul class="dropdown-menu" role="menu"> <li> <a tabindex="-1" href="#" @click.prevent="SelectFile(index)"> <span class="fa fa-file-o"></span> <span class="text-bold">Select</span> </a> </li> <!--<li class="divider"></li>--> <li><a tabindex="-1" :href="file.href" target="_blank"><span class="fa fa-link"></span> Open</a></li> </ul> </td> <td>{{file.properties.r_modify_date | shortDateTimeString}}</td> <td>{{Size(file.properties.r_content_size)}}</td> </tr> </tbody> </table> </div> </template> </div> </div> <div class="clearfix"></div> <div class="pull-left">{{folders.length}} Folders, {{files.length}} Files</div> <div class="pull-right"> <button type="button" class="view list" title="list view" @click="FolderView('list')" v-bind:class="[viewType == 'list' ? 'active': '']"></button> <button type="button" class="view tn" title="thumbnail view" @click="FolderView('tn')" v-bind:class="[viewType == 'tn' ? 'active': '']"></button> </div> </div> </div> <div class="clearfix"></div> <div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> </div> </div> </div></div>`,
    data() {
        return {
            isLoading: false,
            cabinetRoot: "/",
            folderPath: "/",
            viewType: "tn",
            folders: [],
            files: []
        }
    },
    props: {
        id: {
            type: String,
            required: false,
            default: "MediaBrowser"
        }
    },
    methods: {
        Size(v: number) {
            if (v > 1024)
                return (v / 1024).toFixed(1).toString() + "KB";

            return v.toFixed(1).toString() + "B";
        },
        Refresh() {
            GetData(this);
        },
        FolderView(type:string) {
            this.viewType = type;
            localStorage.setItem("folder-view", this.viewType);
        },
        Get(name: string) {
            let vm = this as VueComp;
            vm.folderPath += ("/" + name);
            name = vm.folderPath;

            GetData(vm, name);
        },
        UpLevel() {
            let vm = this as VueComp;
            vm.folderPath = vm.folderPath.substr(0, vm.folderPath.lastIndexOf("/"));
            GetData(vm, vm.folderPath);
        },
        Home() {
            this.folderPath = this.cabinetRoot
            GetData(this, this.folderPath);
        },
        SelectFile(idx: number) {
            alert("You selected: " + this.files[idx].properties.object_name);
        }
    },
    created() {
        let fv = localStorage.getItem("folder-view");
        if (fv)
            this.viewType = fv;

        localStorage.setItem("folder-view", this.viewType);

        let vm = this as VueComp;
        vm.$http.get("Media.ashx?type=cabinet")
            .then(response => {
                vm.cabinetRoot = response.data as string;
                vm.folderPath = response.data as string;

                //Fetch Folders and Files, if any
                GetData(this, vm.folderPath);
            });
    },
    mounted() {
        let sizes = new Array<number>();
        let ss = localStorage.getItem("split-sizes");
        if (ss)
            sizes = JSON.parse(ss);
        else
            sizes = [25, 75];

        let split = Split(["#pane1", "#pane2"], {
            sizes,
            minSize: 100,
            onDragEnd: (sizes) => {
                localStorage.setItem("split-sizes", JSON.stringify(sizes));
            }
        });
    },
    updated() {
        BSN.initCallback();
    }
} as ComponentOption

/**
 * Fetch data from server
 * @param vm Vue instance
 * @param path (optional) name of folder path
 */
function GetData(vm: VueComp, path: string = "") {
    vm.isLoading = true;

    vm.$http.all([
        vm.$http.get("Media.ashx?type=folders", { params: { path } }),
        vm.$http.get("Media.ashx?type=files", { params: { path } })
    ]).then(vm.$http.spread((r1, r2) => {
        vm.folders = r1.data as any[];
        vm.files = r2.data as any[];
        vm.isLoading = false;
    }));
}

interface VueComp extends VueConstructor {
    folders: any[];
    files: any[];
    viewType: string;
    folderPath: string;
    cabinetRoot: string;
    isLoading: boolean;
}
