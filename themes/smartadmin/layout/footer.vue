<template>
    <footer id="footer">
        <div class="show-fixed pull-right">
            <!--<ul class="footer-list list-inline">
                <li>
                    <p class="text-sm">SEO Proggres</p>
                    <div class="progress progress-sm progress-light-base">
                        <div style="width: 80%" class="progress-bar progress-bar-danger"></div>
                    </div>
                </li>
                <li>
                    <p class="text-sm">Online Tutorial</p>
                    <div class="progress progress-sm progress-light-base">
                        <div style="width: 80%" class="progress-bar progress-bar-primary"></div>
                    </div>
                </li>
                <li>
                    <button class="btn btn-sm btn-dark btn-active-success">Checkout</button>
                </li>
            </ul>-->
        </div>
        <div class="hide-fixed pull-right pad-rgt">
            HTTP Connections: {{$store.state.httpConnections}}
        </div>
        <p class="pad-lft">&#0169; {{CopyrightDate}} Fluor-BWXT IT</p>
    </footer>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";

    @Component({
        name: "footer-section"
    })
    export default class FooterSection extends Vue {

        get CopyrightDate() {
            return new Date().getFullYear();
        }
    }
</script>

<style lang="scss"></style>