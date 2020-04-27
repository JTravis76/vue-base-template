<template>
    <div class="wrapper">
        <page-loader src="./img/double-ring-loader.gif"></page-loader>
        <main-header></main-header>
        <main-sidebar></main-sidebar>
        <content-wrapper></content-wrapper>
        <main-footer></main-footer>
        <control-sidebar></control-sidebar>
        <!-- Add the sidebar's background. This div must be placed immediately after the control sidebar -->
        <div class="control-sidebar-bg"></div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import MainHeader from "./views/layout/main-header.vue";
    import MainSidebar from "./views/layout/main-sidebar.vue";
    import ContentWrapper from "./views/layout/content-wrapper.vue";
    import MainFooter from "./views/layout/main-footer.vue";
    import ControlSidebar from "./views/layout/control-sidebar.vue";
    import PageLoader from "@/components/PageLoader.vue";

    export default Vue.extend({
        name: "main-app",
        components: {
            MainHeader,
            MainSidebar,
            ContentWrapper,
            MainFooter,
            ControlSidebar,
            PageLoader
        }
    })
</script>