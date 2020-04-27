<template>
    <div>
        <page-loader></page-loader>
        <nav-bar></nav-bar>
        <main-wrapper></main-wrapper>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import NavBar from "./layout/NavBar"
    import MainWrapper from "./layout/MainWrapper"
    import PageLoader from "@/components/PageLoader.vue";

    export default Vue.extend({
        name: "main-app",
        components: {
           NavBar, 
           MainWrapper, 
           PageLoader
        }
    })
</script>