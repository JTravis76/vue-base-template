<template>
    <div>
        <main-menu></main-menu>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "../node_modules/vue-property-decorator/lib/vue-property-decorator";
    import MainMenu from "./views/layout/Menu.vue";

    @Component({
        name: "my-app",
        components: {
            MainMenu
        }
    })
    export default class MyApp extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
