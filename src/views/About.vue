<template>
  <div class="container"> 
    <h1>About</h1>
    <table> 
      <tbody> 
        <tr> 
          <td class="text-bold">Application Name</td> 
          <td>{{$store.state.config.AppName}}</td> 
        </tr> 
        <tr> 
          <td class="text-bold">Description</td> 
          <td>{{description}}</td> 
        </tr> 
        <tr> 
          <td class="text-bold">Application Version</td> 
          <td>{{appVersion}}</td> 
        </tr> 
        <tr> 
          <td class="text-bold">NetCenter API</td> 
          <td><a :href="$store.state.config.NetcenterBaseApi" target="_blank">{{$store.state.config.NetcenterBaseApi}}</a></td> 
        </tr> 
        <tr> 
          <td class="text-bold">API Base URL</td> 
          <td><a :href="$store.state.config.BaseURL" target="_blank">{{$store.state.config.BaseURL}}</a></td> 
        </tr> 
        <tr> 
          <td class="text-bold">API Version</td> <td>{{version}} compiled on {{versionDate | toDateString}} </td> 
        </tr> 
      </tbody> 
    </table> 
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "../../node_modules/vue-property-decorator/lib/vue-property-decorator";

  @Component
  export default class About extends Vue {
    private version: string = "0";
    private versionDate: string = "2019-12-09T21:27:48.508Z";
    private description: string = "";
    private appVersion: string = "";

    created() {     

      this.appVersion = this.$store.state.config.Version;
      this.description = this.$store.state.config.Description;
    }
  }
</script>

<style lang="scss">
.text-bold {
  font-weight: bold;
}
</style>