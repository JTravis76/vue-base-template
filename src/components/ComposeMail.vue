<template>
    <div> 
        <div id="ComposeMailModal" class="modal" role="dialog" v-cloak> 
            <div class="modal-dialog modal-lg"> 
                <div class="modal-content"> 
                    <div class="modal-header"> 
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> 
                        <h4 class="modal-title">New Mail Message</h4> 
                    </div> 
                    <div class="modal-body"> 
                        <div class="row"> 
                            <div class="col-lg-1"> 
                                <button type="button" title="Send" class="btn btn-primary" @click="Send"><span class="fa fa-send"></span></button> 
                            </div> 
                            <div class="col-lg-11"> 
                                <div class="input-group"> 
                                    <span class="input-group-btn"> 
                                        <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#AddressBookModal">To:</button> 
                                    </span> 
                                    <div style="width:100%; border-radius:0px 4px 4px 0px;" class="tagsinput"> 
                                        <template v-for="(tag, i) in addresses"> 
                                            <span class="label label-info tag" :title="tag.Email">{{tag.FullName}} 
                                                <span class="fa fa-remove remove" @click="Remove(i)"></span>
                                            </span> 
                                        </template> 
                                        <input type="text" v-on:keyup.enter="Add" /> 
                                    </div> 
                                </div> 
                            </div> 
                        </div> 
                        <p>&nbsp;</p> 
                        <div class="row"> 
                            <div class="col-lg-1">
                                <label>Subject</label>
                            </div> 
                            <div class="col-lg-11"> 
                                <input type="text" class="form-control" v-model="subject" /> 
                            </div> 
                        </div> 
                        <div class="row"> 
                            <div class="col-lg-12"> 
                                <label>Message</label> 
                                <textarea rows="5" class="form-control" v-model="message"></textarea> 
                            </div> 
                        </div> 
                    </div> 
                    <div class="modal-footer"> 
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> 
                    </div> 
                </div> 
            </div> 
        </div> 
        <address-book :id="0" :selectedlist="addresses"></address-book>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import AddressBook, { GroupMembers } from "./AddressBook.vue";

    @Component({
        name: "compose-mail",
        components: {
            AddressBook
        }
    })
    export default class ComposeMail extends Vue { 
        public subject: string = "";
        public message: string = "";
        public addresses: GroupMembers[] = new Array<GroupMembers>();

        Send() {
            this.$emit("message", {
                subject: this.subject,
                message: this.message,
                addresses: this.addresses
            });
        }
        Add(e: KeyboardEvent) {
            let el = e.target as HTMLInputElement;
            this.addresses.push({
                FullName: el.value,
                Email: el.value,
                UserName: ""
            });
            el.value = "";
        }
        Remove(idx: number) {
            this.addresses.splice(idx, 1);
        }
    }
</script>

<style lang="scss"></style>
