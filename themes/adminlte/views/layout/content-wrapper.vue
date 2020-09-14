<template>
    <div class="content-wrapper" :style="{'min-height': minHeight}">
        <div style="width:100%;" class="text-center" v-bind:class="[IsProduction ? 'label-info' : 'label-warning']">{{$store.state.config.Environment}}</div>
        <section class="content-header">
            <h1>
                {{$route.name}} <small>{{$route.meta.description}}</small>
            </h1>
            <breadcrumb></breadcrumb>
        </section>
        <section class="content container-fluid">
            <router-view></router-view>
        </section>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import Breadcrumb from "./breadcrumb.vue";

    @Component({
        name: "content-wrapper",
        components: {
            Breadcrumb
        }
    })
    export default class ContentWrapper extends Vue { 
        public minHeight:string = (window.innerHeight - 102).toString() + "px";

        get IsProduction() {
            let env = this.$store.state.config.Environment as string;
            return env.toLowerCase().indexOf("prod") > -1;
        }
        created() {
            window.addEventListener("resize", () => {
                this.minHeight = (window.innerHeight - 102).toString() + "px";
            });
        }
    }
</script>

<style lang="scss"></style>
