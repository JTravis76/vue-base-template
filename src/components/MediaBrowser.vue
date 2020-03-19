<template>
  <div v-bind:id="id" class="modal" role="dialog" v-cloak>
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">
            Media Browser
            <small>Documentum</small>
          </h4>
        </div>
        <div class="modal-body">
          <div style="position:relative;">
            <div class="mb-loading" v-show="isLoading">
              <div class="loading-inner">
                <div class="loading-content">Loading...</div>
              </div>
            </div>
            <div class="input-group form-group-sm">
              <span class="input-group-btn">
                <button type="button" class="btn btn-sm btn-info" @click="Refresh">
                  <span class="fa fa-refresh"></span>
                </button>
              </span>
              <input type="text" class="form-control" disabled="disabled" v-model="folderPath" />
            </div>
            <div style="margin:10px;">
              <div id="pane1" class="split-pane">
                <ul class="foldertree">
                  <li>
                    <span class="fa fa-folder-open">&nbsp;
                      <span class="single-line text-black" @click="Home">{{cabinetRoot}}</span>
                    </span>
                    <ul class="foldertree">
                      <li v-if="cabinetRoot != folderPath">
                        <span class="fa fa-folder-o">&nbsp;
                          <span class="single-line text-black" @click="UpLevel">...</span>
                        </span>
                      </li>
                      <li v-for="folder in folders" @click="Get(folder.properties.object_name)">
                        <span class="fa fa-folder">&nbsp;
                          <span class="single-line text-black">{{folder.properties.object_name}}</span>
                        </span>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div id="pane2" class="split-pane">
                <template v-if="viewType=='tn'">
                  <template v-for="(file, index) in files">
                    <div class="detailview dropdown" :title="file.properties.object_name">
                      <div class="dropdown-toggle" data-toggle="dropdown">
                        <a href="#" class="fa fa-file-o"></a>
                      </div>
                      <div class="single-line font-10">
                        <span
                          zzv-on:click.prevent.right="ContextMenu1"
                        >{{file.properties.object_name}}</span>
                      </div>
                      <ul class="dropdown-menu" role="menu">
                        <li>
                          <a tabindex="-1" href="#" @click.prevent="SelectFile(index)">
                            <span class="fa fa-file-o"></span>
                            <span class="text-bold">Select</span>
                          </a>
                        </li>
                        <!--<li class="divider"></li>-->
                        <li>
                          <a tabindex="-1" :href="file.href" target="_blank">
                            <span class="fa fa-link"></span> Open
                          </a>
                        </li>
                      </ul>
                    </div>
                  </template>
                </template>
                <template v-else>
                  <div class="table-responsive1">
                    <table class="table table-condensed table-hover listview">
                      <thead>
                        <tr>
                          <td>Name</td>
                          <td>Date modified</td>
                          <td>Size</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(file, index) in files">
                          <td class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                              <span class="fa fa-file"></span>
                              {{file.properties.object_name}}
                            </a>
                            <ul class="dropdown-menu" role="menu">
                              <li>
                                <a tabindex="-1" href="#" @click.prevent="SelectFile(index)">
                                  <span class="fa fa-file-o"></span>
                                  <span class="text-bold">Select</span>
                                </a>
                              </li>
                              <!--<li class="divider"></li>-->
                              <li>
                                <a tabindex="-1" :href="file.href" target="_blank">
                                  <span class="fa fa-link"></span> Open
                                </a>
                              </li>
                            </ul>
                          </td>
                          <td>{{file.properties.r_modify_date | shortDateTimeString}}</td>
                          <td>{{Size(file.properties.r_content_size)}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </template>
              </div>
            </div>
            <div class="clearfix"></div>
            <div class="pull-left">{{folders.length}} Folders, {{files.length}} Files</div>
            <div class="pull-right">
              <button
                type="button"
                class="view list"
                title="list view"
                @click="FolderView('list')"
                v-bind:class="[viewType == 'list' ? 'active': '']"
              ></button>
              <button
                type="button"
                class="view tn"
                title="thumbnail view"
                @click="FolderView('tn')"
                v-bind:class="[viewType == 'tn' ? 'active': '']"
              ></button>
            </div>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator";
    import BSN from "bootstrap-native";
    import Split from "@/lib/spilt";

    @Component({
        name: "media-browser"
    })
    export default class MediaBrowser extends Vue {
        public isLoading:boolean = false;
        public cabinetRoot:string = "/";
        public folderPath:string = "/";
        public viewType:string = "tn";
        public folders:any[] = [];
        public files:any[] = [];

        @Prop({default: "MediaBrowser"}) id:string;

        Size(v: number) {
            if (v > 1024)
                return (v / 1024).toFixed(1).toString() + "KB";

            return v.toFixed(1).toString() + "B";
        }
        Refresh() {
            GetData(this);
        }
        FolderView(type:string) {
            this.viewType = type;
            localStorage.setItem("folder-view", this.viewType);
        }
        Get(name: string) {
            this.folderPath += ("/" + name);
            name = this.folderPath;

            GetData(this, name);
        }
        UpLevel() {
            this.folderPath = this.folderPath.substr(0, this.folderPath.lastIndexOf("/"));
            GetData(this, this.folderPath);
        }
        Home() {
            this.folderPath = this.cabinetRoot
            GetData(this, this.folderPath);
        }
        SelectFile(idx: number) {
            alert("You selected: " + this.files[idx].properties.object_name);
        }
        created() {
            let fv = localStorage.getItem("folder-view");
            if (fv)
                this.viewType = fv;

            localStorage.setItem("folder-view", this.viewType);

            let vm = this;
            vm.$http.get("api/media/cabinet")
                .then(resp => {
                    vm.cabinetRoot = resp.data as string;
                    vm.folderPath = resp.data as string;
                });
        }
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
        }
        updated() {
            BSN.initCallback();
        }
    }

    /**
     * Fetch data from server
     * @param vm Vue instance
     * @param path (optional) name of folder path
     */
    function GetData(vm: MediaBrowser, path: string = "") {
        vm.isLoading = true;

        vm.$http.all([
            vm.$http.get("api/media/folders", { params: { path } }),
            vm.$http.get("api/media/files", { params: { path } })
        ]).then(vm.$http.spread((r1, r2) => {
            vm.folders = r1.data as any[];
            vm.files = r2.data as any[];
            vm.isLoading = false;
        }));
    }
</script>

<style lang="scss">
$pane-height: 300px;

.split-pane {
    /*border: 0.5px solid lightgray;*/
    float: left;
    height: $pane-height;
    overflow: auto;
}

.gutter {
    background-color: #eee;
    background-repeat: no-repeat;
    background-position: 50%;
    width: 10px;
    float: left;
    height: $pane-height;
}

.gutter.gutter-vertical {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=');
    cursor: ns-resize;
}

.gutter.gutter-horizontal {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==');
    cursor: ew-resize;
}

.view {
    border: none;
    width: 22px;
    height: 22px;
}
.view.active {
    border: 1px solid blue !important;
}
.view.list {
    background-image: url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QBoRXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAAExAAIAAAARAAAATgAAAAAAAABgAAAAAQAAAGAAAAABcGFpbnQubmV0IDQuMC4xNwAA/9sAQwACAQECAQECAgICAgICAgMFAwMDAwMGBAQDBQcGBwcHBgcHCAkLCQgICggHBwoNCgoLDAwMDAcJDg8NDA4LDAwM/9sAQwECAgIDAwMGAwMGDAgHCAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgAFAAUAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A/ZrxZ8ftT0P4uXWhx6h4ajht9ZsdOSymiBvJo5jYBmB+1K+4i7mZStu6AWr7mB2huu034o65feH9SvJfhx40s7ix8ryLCa50k3Go72Ibyil60Q2D5m8148g/LuPFeT+PvE7Wvxx1bS/7V02FbnxVpUpsndRPIQ2h4wv2pSS20srC2kCrbXAMke8Bum8N+F/I8AeJYf8AhBvjPa/aPsv+h3njn7RqF9iQn/RLj+1n+z7PvSfvod6kL+8xtBp0Dla1f9f5f0+p6r4T1u68ReH7e8vNH1HQbibdvsL94HuIMMQNxgkli5ADDa7cMM4OQCs74T2X9neANPh/szxFo+zzP9D13U/7S1CHMjH95cefcb8/eX98+FKr8uNoKAOiooooAKKKKAP/2Q==');
}

.view.tn {
    background-image: url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QBoRXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAAExAAIAAAARAAAATgAAAAAAAABgAAAAAQAAAGAAAAABcGFpbnQubmV0IDQuMC4xNwAA/9sAQwACAQECAQECAgICAgICAgMFAwMDAwMGBAQDBQcGBwcHBgcHCAkLCQgICggHBwoNCgoLDAwMDAcJDg8NDA4LDAwM/9sAQwECAgIDAwMGAwMGDAgHCAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgAFAAUAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A/bD4wftByfCvxK1kdPsZreOC1czz3N0HeSc3W2NIre0nY4W0kYscDkCuN0P9uaz8R+IrPSbOHw3JqGoXEdrBE95qse+R2CqpLaWAuSRySAO5Fef/APBS/wCCvxA+NJj0/wCH/iHU/B+rxTaRfjVIbHUJopooBq6SweZaW8xDbrqBtp25HOaj/Zv8OfFD4d3ulyeNfF114mS1kj+0KvgrUg0iKV5DrYRuzhRwzE5OCfSvYwccv9g3iYyctbWnFLyvFwb/AB18jyMTWxyxHJRS5NNXFv115l+R9WeAfFP/AAnPgTRda8j7L/bFhBfeTv3+T5savt3YGcbsZwM46Cis34JWFxpPwY8I2t1DNbXVtotnFNDKhSSJ1gQMrKeQQQQQeQRRXjnrnUUUUUAFFFFAH//Z');
}

table.listview {
    thead tr td {
        border-right: 1px solid lightgray;
    }

    a {
        color: black;
    }

    .fa-file {
        color: brown;
    }
}

div.detailview {
    margin: 2px;
    padding: 4px;
    border: 1px dotted white;
    width: 75px;
    float: left;

    div {
        text-align: center;

        a {
            font-size: 28px;
            color: brown;
        }
    }

    .font-10 {
        font-size: 10px;
    }
}

div.detailview:hover {
    background-color: #CCE8FF;
    border: 1px solid #99D1FF;
}

ul.foldertree {
    list-style: none;
    margin-left: -30px;

    li span.fa-folder-open, span.fa-folder, span.fa-folder-o {
        color: #EECC68;
        cursor: pointer;
    }

    li span:hover {
        color: #EAA800;
    }

    li span span:hover {
        text-decoration: underline;
    }
}
/* Component Loading */
.mb-loading {
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
