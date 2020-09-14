<template>
  <div class="container">
    <div class="box box-default">
      <div class="box-header with-border">
        <h3 class="box-title"></h3>
        <div class="box-tools pull-right">
          <button type="button" class="btn btn-box-tool" data-widget="collapse">
            <i class="fa fa-minus"></i>
          </button>
          <button type="button" class="btn btn-box-tool" data-widget="remove">
            <i class="fa fa-times"></i>
          </button>
        </div>
      </div>
      <div class="box-body">
        <div class="table-responsive">
          <table class="table table-condensed table-striped">
            <thead>
              <tr>
                <td style="width:20px;">
                  <button
                    type="button"
                    class="btn btn-xs btn-info"
                    @click="Reload"
                    title="refresh data"
                  >
                    <span class="fa fa-refresh"></span>
                  </button>
                </td>
                <td style="text-align:center;">
                  <label>Status</label>
                </td>
                <td>
                  <label>Name</label>
                </td>
                <td>
                  <label>Username</label>
                </td>
                <td>
                  <label>Active Time (mins)</label>
                </td>
              </tr>
            </thead>
            <tbody v-if="onlineusers.length > 0">
              <tr v-for="row in onlineusers">
                <td></td>
                <td style="text-align:center;">
                  <template v-if="Idle(row.endTime)">
                    <span
                      class="fa fa-circle"
                      style="color:#ec971f;"
                      title="User been idle more than 15 minutes"
                    ></span>
                  </template>
                  <template v-else>
                    <span class="fa fa-circle text-success"></span>
                  </template>
                </td>
                <td>{{row.fullName}}</td>
                <td>{{row.userName}}</td>
                <td>
                  <span class="badge">{{ Math.floor(((row.endTime - row.startTime) / 1000) / 60) % 60 }}</span>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="5">No Records Found...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AxiosRequestConfig } from "axios";

@Component({
  name: "online-users",
})
export default class OnlineUsers extends Vue {
  public onlineusers: any[] = [];

    Idle(d: string | number) {
        // Compare EndTime to current Date to update the indicator
        let now = new Date().getTime();
        let end = parseInt(d.toString());
        return (Math.floor(((now - end) / 1000) / 60) % 60) > 15;
    }
    Reload() {
        GetData(this);
    }
  created() {
      GetData(this);
  }
}

function GetData(vm: OnlineUsers) {
    let config = {
      url: "api/home/onlineuser",
      method: "GET",
    } as AxiosRequestConfig;

    // vm.$http(config)
    //     .then(resp => {
    vm.onlineusers = vm.$store.state.fakeData.onlineUsers; //resp.data;
    //     });
}
</script>

<style lang="scss"></style>
