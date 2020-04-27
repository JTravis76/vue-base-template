<template>
    <li class="dropdown messages-menu">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
            <i class="fa fa-envelope-o"></i>
            <span class="label label-success">{{totalActive}}</span>
        </a>
        <ul class="dropdown-menu">
            <li class="header">You have {{totalActive}} messages</li>
            <li v-for="(row, index) in model" v-if="index < 4">
                <ul class="menu">
                    <li>
                        <a href="#">
                            <div class="pull-left">
                                <img src="Content/img/avatar.png" class="img-circle" alt="User Image">
                            </div>
                            <h4>{{row.Title | truncateTen}} <small><i class="fa fa-clock-o"></i> {{row.CreatedDate | shortDateTimeString}}</small></h4>
                            <p>{{row.Message}}</p>
                        </a>
                    </li>
                </ul>
            </li>
            <li class="footer"><router-link to="/messages/123">See All Messages</router-link></li>
        </ul>
    </li>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";

    @Component({
        name: "nav-message"
    })
    export default class NavMessage extends Vue { 
        public totalActive:number = 1;
        public model:VueComp["model"] = [];

        created() {
            this.model.push({ Title: "Support Team Newsletter", Message: "Why not buy a new awesome theme?", CreatedDate: "2012-04-23T18:25:43.511Z" });
        }
    }

    interface VueComp {
        model:{Title: string, Message: string, CreatedDate: string}[];
    }
</script>

<style lang="scss"></style>
