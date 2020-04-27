<template>
    <div id="container">
        <page-loader src="./img/cube.gif" imgcss="width:200px;"></page-loader>
        <nav-bar></nav-bar>
        <div class="boxed">
            <div id="content-container">
                <page-header></page-header>
                <page-content></page-content>
            </div>
        </div>
        <footer-section></footer-section>
        <!-- SCROLL TOP BUTTON -->
        <!--===================================================-->
        <!--<button id="scroll-top" class="btn"><i class="fa fa-chevron-up"></i></button>-->
        <!--===================================================-->
        <test-id-layout></test-id-layout>
    </div>
</template>

<script lang="ts">
    import { Component, Vue} from "vue-property-decorator";
    import NavBar from "./views/layout/nav-bar.vue";
    import FooterSection from "./views/layout/footer.vue";
    import PageHeader from "./views/layout/page-header.vue";
    import PageContent from "./views/layout/page-content.vue";
    import PageLoader from "@/components/PageLoader.vue";
    import TestIdLayout from "@/components/TestIdLayout.vue";

    @Component({
        name: "my-app",
        components: {
            NavBar,
            FooterSection,
            PageHeader,
            PageContent,
            PageLoader,
            TestIdLayout
        }
    })
    export default class MyApp extends Vue { }
</script>
