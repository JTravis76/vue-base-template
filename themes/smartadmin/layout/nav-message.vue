<template>
    <li class="dropdown">
        <a href="#" data-toggle="dropdown" class="dropdown-toggle">
            <i class="fa fa-envelope fa-lg"></i>
            <span class="badge badge-header badge-warning">9</span>
        </a>
        <div class="dropdown-menu dropdown-menu-md with-arrow">
            <div class="pad-all bord-btm">
                <div class="h4 text-muted text-thin mar-no">You have 3 messages.</div>
            </div>
            <div class="nano scrollable">
                <div class="nano-content">
                    <ul class="head-list">
                        <li>
                            <a href="#" class="media">
                                <div class="media-left">
                                    <img src="./img/av2.png" alt="Profile Picture" class="img-circle img-sm">
                                </div>
                                <div class="media-body">
                                    <div class="text-nowrap">Andy sent you a message</div>
                                    <small class="text-muted">15 minutes ago</small>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="media">
                                <div class="media-left">
                                    <img src="./img/av4.png" alt="Profile Picture" class="img-circle img-sm">
                                </div>
                                <div class="media-body">
                                    <div class="text-nowrap">Lucy sent you a message</div>
                                    <small class="text-muted">30 minutes ago</small>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="media">
                                <div class="media-left">
                                    <img src="./img/av3.png" alt="Profile Picture" class="img-circle img-sm">
                                </div>
                                <div class="media-body">
                                    <div class="text-nowrap">Jackson sent you a message</div>
                                    <small class="text-muted">40 minutes ago</small>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="media">
                                <div class="media-left">
                                    <img src="./img/av6.png" alt="Profile Picture" class="img-circle img-sm">
                                </div>
                                <div class="media-body">
                                    <div class="text-nowrap">Donna sent you a message</div>
                                    <small class="text-muted">5 hours ago</small>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="media">
                                <div class="media-left">
                                    <img src="./img/av4.png" alt="Profile Picture" class="img-circle img-sm">
                                </div>
                                <div class="media-body">
                                    <div class="text-nowrap">Lucy sent you a message</div>
                                    <small class="text-muted">Yesterday</small>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="media">
                                <div class="media-left">
                                    <img src="./img/av3.png" alt="Profile Picture" class="img-circle img-sm">
                                </div>
                                <div class="media-body">
                                    <div class="text-nowrap">Jackson sent you a message</div>
                                    <small class="text-muted">Yesterday</small>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="pad-all bord-top">
                <a href="#" class="btn-link text-dark box-block">
                    <i class="fa fa-angle-right fa-lg pull-right"></i>Show All Messages
                </a>
            </div>
        </div>
    </li>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "nav-message"
})
</script>