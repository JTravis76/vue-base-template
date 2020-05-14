<template>
    <div class="loading-background" v-show="IsLoading">
        <button type="button" v-on:click="Close">&times</button>
        <div class="loading-wrapper">
            <span class="loading-icon">
                <img alt="Loading" :src="src" :style="imgcss" :class="imgclass" />
            </span>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';

    @Component({
        name: "page-loader"
    })
    export default class PageLoader extends Vue {
        @Prop({ default: LoadDefaultBase64Image() }) readonly src: string;
        @Prop({ default: "width:auto;" }) readonly imgcss: string;
        @Prop({ default: "" }) readonly imgclass: string;

        get IsLoading() {
            if (this.$store.state.pageLoading !== undefined) {
                return this.$store.state.pageLoading;
            }
                
            console.warn("[PageLoader.vue] missing required Vuex state: pageLoading");
            return false;
        }
        Close() {
            this.$store.commit("pageloader", false);
        }
    }

    function LoadDefaultBase64Image(): string {
        return "data:image/gif;base64,R0lGODlhEAALAPQAAP///wAAANra2tDQ0Orq6gYGBgAAAC4uLoKCgmBgYLq6uiIiIkpKSoqKimRkZL6+viYmJgQEBE5OTubm5tjY2PT09Dg4ONzc3PLy8ra2tqCgoMrKyu7u7gAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCwAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA";
    }
</script>

<style lang="scss">
/*Page Loading - centered horizontally and vertically*/
$loader-width: auto; //275px
$loader-height: auto; //368px

.loading-background {
    background: none repeat scroll 0 0 rgba(0, 0, 25, 0.5);
    height: 100%;
    left: 0;
    margin: 0;
    padding: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1060;

    button {
        background-color: transparent;
        border: 0px;
        color:rgba(0,0,25,0.2);
        cursor: pointer;
    }

    div.loading-wrapper {
        background: none repeat scroll 0 0 rgba(0, 0, 0, 0);
        border: 0 none;
        height: $loader-height;
        left: 50%;
        margin-left: -100px;
        margin-top: -200px;
        position: fixed;
        top: 50%;
        width: $loader-width;
        z-index: 1070;

        span.loading-icon {
            background-color: rgba(0, 0, 0, 0.5);
            border-radius: 4px;
            display: block;
            margin: 0;
            padding: 1px;
            text-align: center;
            width: $loader-width;
        }
    }
}
</style>