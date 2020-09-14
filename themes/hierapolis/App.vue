<template>
    <div>
        <page-loader></page-loader>
        <nav-bar></nav-bar>
        <main-wrapper></main-wrapper>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import NavBar from "./views/layout/nav-bar"
    import MainWrapper from "./views/layout/main-wrapper"
    import PageLoader from "@/components/PageLoader.vue";

    @Component({
        name: "my-app",
        components: {
            NavBar,
            MainWrapper,
            PageLoader
        }
    })
    export default class MyApp extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
