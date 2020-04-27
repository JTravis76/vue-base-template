<template>
    <li class="dropdown">
        <a href="#" data-toggle="dropdown" class="dropdown-toggle">
            <i class="fa fa-bell fa-lg"></i>
            <span class="badge badge-header badge-danger">5</span>
        </a>
        <div class="dropdown-menu dropdown-menu-md with-arrow">
            <div class="pad-all bord-btm">
                <div class="h4 text-muted text-thin mar-no"> Notification </div>
            </div>
            <div class="nano scrollable">
                <div class="nano-content">
                    <ul class="head-list">
                        <li>
                            <a href="#" class="media">
                                <div class="media-left">
                                    <span class="icon-wrap icon-circle bg-primary">
                                        <i class="fa fa-comment fa-lg"></i>
                                    </span>
                                </div>
                                <div class="media-body">
                                    <div class="text-nowrap">New comments waiting approval</div>
                                    <small class="text-muted">15 minutes ago</small>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="media">
                                <span class="badge badge-success pull-right">90%</span>
                                <div class="media-left">
                                    <span class="icon-wrap icon-circle bg-danger">
                                        <i class="fa fa-hdd-o fa-lg"></i>
                                    </span>
                                </div>
                                <div class="media-body">
                                    <div class="text-nowrap">HDD is full</div>
                                    <small class="text-muted">50 minutes ago</small>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="media">
                                <div class="media-left">
                                    <span class="icon-wrap icon-circle bg-info">
                                        <i class="fa fa-file-word-o fa-lg"></i>
                                    </span>
                                </div>
                                <div class="media-body">
                                    <div class="text-nowrap">Write a news article</div>
                                    <small class="text-muted">Last Update 8 hours ago</small>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="media">
                                <span class="label label-danger pull-right">New</span>
                                <div class="media-left">
                                    <span class="icon-wrap icon-circle bg-purple">
                                        <i class="fa fa-comment fa-lg"></i>
                                    </span>
                                </div>
                                <div class="media-body">
                                    <div class="text-nowrap">Comment Sorting</div>
                                    <small class="text-muted">Last Update 8 hours ago</small>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="media">
                                <div class="media-left">
                                    <span class="icon-wrap icon-circle bg-success">
                                        <i class="fa fa-user fa-lg"></i>
                                    </span>
                                </div>
                                <div class="media-body">
                                    <div class="text-nowrap">New User Registered</div>
                                    <small class="text-muted">4 minutes ago</small>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="pad-all bord-top">
                <a href="#" class="btn-link text-dark box-block">
                    <i class="fa fa-angle-right fa-lg pull-right"></i>Show All Notifications
                </a>
            </div>
        </div>
    </li>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    name: "nav-notification"
})
</script>