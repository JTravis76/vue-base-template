<template>
    <ol class="breadcrumb">
        <li>
            <router-link to="/"><span class="fa fa-dashboard"></span>&nbsp;Dashboard</router-link>
        </li>
        <template v-if="$route.name != 'Dashboard'">
            <template v-if="!$route.params.id">
                <li>
                    <router-link :to="{path: $route.path}">&nbsp;{{$route.name}}</router-link>
                </li>
            </template>
            <template v-else>
                <li>
                    <router-link :to="{path: $route.matched[0].path}">&nbsp;{{$route.matched[0].name}}</router-link>
                </li>
                <li>
                    <router-link :to="{path: $route.path}">&nbsp;{{$route.name}}</router-link>
                </li>
            </template>
        </template>
    </ol>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component({
        name: "breadcrumb"
    })
    export default class Breadcrumb extends Vue { }
</script>

<style lang="scss">
</style>
