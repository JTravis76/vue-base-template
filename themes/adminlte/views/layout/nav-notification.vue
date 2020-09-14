<template>
    <li class="dropdown notifications-menu">
        <!-- Menu toggle button -->
        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
            <i class="fa fa-bell-o"></i>
            <span class="label label-warning" v-if="this.$store.state.notification.total > 0">{{this.$store.state.notification.total}}</span>
        </a>
        <ul class="dropdown-menu">
            <li class="header">You have {{this.$store.state.notification.total}} notifications</li>
            <li v-for="notice in this.$store.state.notification.notifications">
                <a href="#"><i v-bind:class="notice.Status"></i> {{notice.Message}}</a>
            </li>
            <li class="footer"><router-link to="/notification">View All</router-link></li>
        </ul>
    </li>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";

    @Component
    export default class NavNotification extends Vue { }
</script>

<style lang="scss"></style>
