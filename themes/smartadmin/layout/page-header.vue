<template>
    <div class="pageheader">
        <h3>
            {{$route.name}} <small>{{$route.meta.description}}</small>
        </h3>
        <div class="breadcrumb-wrapper">
            <span class="label">&nbsp;</span>
            <ol class="breadcrumb">
                <li v-if="Route.name !== 'Home'"><router-link to="/">Home</router-link></li>
                <li class="active">{{Route.name}}</li>
            </ol>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    name: "page-header",
    computed: {
        Route() {
            return this.$route.matched[0];
        }
    }
})
</script>