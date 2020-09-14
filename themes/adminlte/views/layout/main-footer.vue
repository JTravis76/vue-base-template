<template>
    <footer class="main-footer">
        <div class="pull-right hidden-xs"> HTTP Connections: {{$store.state.httpConnections}} </div>
        <!-- Default to the left -->
        <strong>Copyright &copy; {{CopyrightDate}} <router-link to="/">Fluor-BWXT</router-link>.</strong> All rights reserved.
    </footer>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";

    @Component({
        name: "main-footer",
        computed: {
            CopyrightDate() {
                return new Date().getFullYear();
            }
        }
    })
    export default class MainFooter extends Vue { }
</script>

<style lang="scss"></style>
