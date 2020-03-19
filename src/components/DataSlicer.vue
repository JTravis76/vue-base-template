<template>
    <div class="floating-menu">
        <button id="btn-collapse-all" type="button" class="btn btn-xs btn-default" title="collapse all" @click="CollapseAll">
            <span class="fa fa-minus"></span>
        </button>
        <button type="button" class="btn btn-xs btn-default" title="refresh data" @click="Refresh">
            <span class="fa fa-refresh"></span>
        </button>
        <button type="button" class="btn btn-xs btn-default" title="reset all" @click="ResetAll">
            <span class="fa fa-eraser"></span>
        </button>
        <hr style="margin:4px 0px; border:1px solid white;" />
        <template v-for="(slice, idx) in slicers">
            <div class="slicer-container">
                <div class="slicer-header" v-bind:class="[slice.active ? 'slicer-header-active': '']" @click="Toggle(slice.title)">
                    <span>{{slice.title}}</span>
                    <div style="text-align:right; float:right;">
                        <span title="Clear" class="glyphicon glyphicon-erase slicer-reset" @click="Reset(idx, $event)"></span>
                    </div>
                </div>
                <div v-show="!slice.collapse">
                    <template v-if="slice.type == 'checkbox' && slice.data.length > 0">
                        <div class="slicer-body" style="height:200px; overflow-x:auto;">
                            <template v-for="data in slice.data">
                                <input :id="slice.title + data.text" type="checkbox" v-model="data.selected" @click="Selected(idx)" />
                                <label :for="slice.title + data.text" v-bind:class="[data.selected ? 'text-black' : '']">{{data.text}}</label>
                                <br />
                            </template>
                        </div>
                    </template>
                    <template v-if="slice.type == 'input'">
                        <div class="slicer-body" style="padding: 4px;">
                            <input type="text" class="form-control" v-model="slice.data[0].value" v-on:keyup="OnChange(idx)" />
                        </div>
                    </template>
                </div>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";

    @Component({
        name: "data-slicer"
    })
    export default class DataSlicer extends Vue {
        public slicers: Slicer[] = new Array<Slicer>();
        public filters: any = {};

        Toggle(title: string) {
            for (let obj = 0; obj < this.slicers.length; obj++) {
                if (this.slicers[obj].title == title) {
                    this.slicers[obj].collapse = !this.slicers[obj].collapse;
                    break;
                }
            }
        }
        CollapseAll() {
            this.slicers.forEach(i => {
                i.collapse = true;
            });
        }
        Selected(idx: number) {
            this.slicers[idx].active = false;
            for (let i of this.slicers[idx].data) {
                if (i.selected) {
                    this.slicers[idx].active = true;
                    break;
                }
            }
        }
        Reset(idx: number, e: Event) {
            e.stopImmediatePropagation();
            this.slicers[idx].active = false;

            for (let i of this.slicers[idx].data) {
                i.selected = false;

                if (this.slicers[idx].type == "input") {
                    i.value = null;
                }
            }
        }
        ResetAll() {
            for (let idx = 0; idx < this.slicers.length; idx++) {
                this.slicers[idx].active = false;

                for (let i of this.slicers[idx].data) {
                    i.selected = false;

                    if (this.slicers[idx].type == "input") {
                        i.value = null;
                    }
                }
            }
        }
        OnChange(idx: number) {
            this.slicers[idx].active = true;
            this.slicers[idx].data[0].selected = true;
        }
        Refresh() {
            alert("not provision yet");
        }
        created() {
            //this.slicers.push({ title: "Group 1", type: "checkbox", collapse: false, active: false, data: [{ text: "Item 1", value: "Item 1", selected: false }] });
            //this.slicers.push({ title: "Group 2", type: "input", collapse: false, active: false, data: [{ text: "", value: "", selected: false }] });

            //let vm = this;
            //vm.$http.get("api/dashboard/slicers")
            //    .then(resp => {
            //        let d = resp.data as Slicer[];
            //        d.forEach(i => {
            //            i.collapse = true;
            //        });
            //        vm.slicers = d;
            //    });
        }
    }

    class Slicer {
        constructor() {
            this.collapse = false;
            this.active = false;
            this.title = null;
            this.type = null;

            this.data = new Array<SlicerData>();
        }

        public title: string;
        public active: boolean;
        public collapse: boolean;
        public type: string; //checkbox || input
        public data: SlicerData[];
    }
    class SlicerData {
        constructor() {
            this.text = null;
            this.selected = false;
            this.value = null;
        }

        public text: string;
        public value: string;
        public selected: boolean;
    }
</script>

<style lang="scss"></style>