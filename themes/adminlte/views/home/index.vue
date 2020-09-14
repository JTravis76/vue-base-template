<template>
<div class="container">
    <div class="box box-default">
        <div class="box-header with-border">
            <h3 class="box-title">Beginning of something awesome!!</h3>
            <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                <div class="btn-group">
                    <button class="btn btn-box-tool dropdown-toggle" type="button" data-toggle="dropdown"><i class="fa fa-wrench"></i></button>
                    <ul class="dropdown-menu" role="menu">
                        <li><router-link to="/Wiki/1">Help</router-link></li>
                    </ul>
                </div>
                <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
            </div>
        </div>
        <div class="box-body">
            <p>Welcome to your new single-page application, built with <a href="https://vuejs.org" target="_blank">Vue.js</a> and <a href="http://www.typescriptlang.org/" target="_blank">TypeScript</a>.</p>
            <table class="table">
                <tbody>
                    <tr>
                        <td><button type="button" class="btn btn-primary" @click="ShowDlg">Dialog</button></td>
                        <td>A dialog plugin.</td>
                    </tr>
                    <tr>
                        <td><button type="button" class="btn btn-primary" v-on:click="ShowPageLoader">Page Loader</button></td>
                        <td>Simple page loader to display while request are being performed. <br />
                            <b>TIP!</b> you can close loader from a hidden button in the upper-left corner.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";

    @Component({
        name: "home"
    })
    export default class Home extends Vue { 

        ShowDlg() {
            this.$dialog("This is the first line<br />And this is the second line")
                .then((res) => { console.log(res); })
                .catch(() => { console.log("You selected No"); });
        }
        ShowPageLoader() {
            this.$store.commit("pageloader", true);
        }
    }
</script>