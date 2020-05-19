<template>
        <!-- Always shows a header, even in smaller screens. -->
        <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
            <header-section></header-section>
            <sidebar-menu></sidebar-menu>
            <main-section></main-section>
            <footer-section></footer-section>
            <page-loader src="./img/radar-loader.gif"></page-loader>
        </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import HeaderSection from "@/views/layout/header.vue";
    import SidebarMenu from "@/views/layout/sidebar-menu.vue";
    import MainSection from "@/views/layout/main-section.vue";
    import FooterSection from "@/views/layout/footer.vue";
    import PageLoader from "@/components/PageLoader.vue";

    @Component({
        name: "my-app",
        components: {
            HeaderSection,
            SidebarMenu,
            MainSection,
            FooterSection,
            PageLoader
        }
    })
    export default class MyApp extends Vue {}
</script>

<style lang="scss"></style>