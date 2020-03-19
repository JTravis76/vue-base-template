<template>
    <div> 
        <button type="button" v-on:click="StartProgress" class="btn" v-bind:class="[now == max ? 'btn-success' : 'btn-primary']">
            <span class="fa fa-building"></span> Start Progress
        </button>
        <br />
        <br /> 
        <div class="progress"> 
            <div class="progress-bar bg-info progress-bar-striped" role="progressbar" :aria-valuenow="now" :aria-valuemin="min" :aria-valuemax="max" :style="{ width: percentage + '%' }"></div> 
        </div> 
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";

    @Component({
        name: "progress-bar"
    })
    export default class ProgressBar extends Vue { 
        public now: number = 0;
        public min: number = 0;
        public max: number = 0;
        public percentage: number = 0;

        StartProgress() {
            let vm = this;
            let timerId = window.setInterval(function () {
                if (vm.now < vm.max) {
                    vm.percentage = ((vm.now + 1) / vm.max) * 100;

                    //Do some work or ajax call

                    vm.now += 1;
                } 
                else {
                    window.clearInterval(timerId);
                }

            }, 100);
        }        
    }
</script>

<style lang="scss"></style>