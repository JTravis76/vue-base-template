
export default {
    name: "page-loader",
    template: `<div class="loading-background" v-show="IsLoading"> <button type="button" style="background-color:transparent; border:0px; color:rgba(0,0,25,0.2)" v-on:click="Close">X</button> <div class="loading-wrapper"> <span class="loading-icon"> <img alt="Loading" src="./contents/img/page-loader.gif" style="width:200px;" /> </span> </div></div>`,
    computed: {
        IsLoading() {
            return this.$store.state.pageLoading;
        }
    },
    methods: {
        Close() {
            this.$store.commit("pageloader", false);
        }
    }
} as ComponentOption