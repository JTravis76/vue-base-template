<template>
  <div>
    <div id="GroupModal" class="modal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Group Properties</h4>
          </div>
          <div class="modal-body">
            <validation-summary></validation-summary>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="text-danger">Group Name</label>
                </div>
                <div>
                  <input type="text" class="form-control" v-model="model.name" />
                </div>
              </div>
            </div>
            <p></p>
            <div class="row">
              <div class="col-md-12" style="overflow-x:auto; height:230px;">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>
                        <button type="button" class="btn btn-xs btn-info" @click="OpenAddressBook">
                          <span class="fa fa-plus"></span> Add
                        </button>
                      </th>
                      <th>Username</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody v-if="model.groupMember.length > 0">
                    <tr v-for="(row, idx) in model.groupMember" :key="idx">
                      <td>
                        <button
                          class="btn btn-xs btn-danger"
                          title="Remove Member"
                          v-on:click="RemoveMember(idx)"
                        >
                          <span class="fa fa-remove"></span>
                        </button>
                      </td>
                      <td>{{row.userName}}</td>
                      <td>{{row.email}}</td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="3" style="text-align:left;">No Records Found...</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-md-6">
                <p class="text-info" style="float:left; padding-right:10px;">
                  <b>Created By</b>
                </p>
                <p>
                  {{model.createdBy}}
                  <br />
                  {{model.createdDate | shortDateTimeString}}
                </p>
              </div>
              <div class="col-md-6">
                <p class="text-info" style="float:left; padding-right:10px;">
                  <b>Updated By</b>
                </p>
                <p>
                  {{model.updatedBy}}
                  <br />
                  {{model.updatedDate | shortDateTimeString}}
                </p>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              v-if="model.groupId > 0"
              v-on:click="Remove"
            >
              <i class="fa fa-remove"></i> Remove
            </button>
            <button type="button" class="btn btn-success" v-on:click="Save">
              <i class="fa fa-save"></i> Save
            </button>
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <address-book :selectedlist="selectedlist" :groupId="model.groupId"></address-book>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ValidationSummary from "@/components/ValidationSummary.vue";
import AddressBook from "@/components/AddressBook.vue";
import { Group, GroupMember } from "@/models";
import Modal from "modal";

@Component({
  name: "group-modal",
  components: {
    ValidationSummary,
    AddressBook,
  },
})
export default class GroupModal extends Vue {
  public selectedlist: GroupMember[] = new Array<GroupMember>();
  @Prop({ default: new Group() }) model!: Group;

  Save() {
    let vm = this;
    let copy: Group = JSON.parse(JSON.stringify(vm.model));

    //clear the nested Group object
    for (var i of copy.groupMember) {
      i.Group = null;
    }

    vm.$http.post("api/admin/group", copy).then(() => {
      vm.$emit("reload");
    });
  }
  Remove(id) {
    if (!confirm("Are you sure you want to remove this Group and its members?"))
      return;

    let vm = this;
    vm.$http({
      url: "api/admin/removegroup",
      method: "DELETE",
      params: { id: id },
    }).then(() => {
      vm.$emit("reload");
    });
  }
  OpenAddressBook() {
    //did not copy object here to maintain reactive
    this.selectedlist = this.model.groupMember;
    new Modal(document.getElementById("AddressBookModal")).show();
  }
  RemoveMember(idx) {
    this.model.groupMember.splice(idx, 1);
  }
  mounted() {
    BSN.initCallback();
  }
}
</script>

<style lang="scss"></style>
