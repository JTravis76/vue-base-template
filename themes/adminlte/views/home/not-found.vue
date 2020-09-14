<template>
    <section>
        <div class="container">
            <h1><img alt="logo" style="width:64px;" src="./img/logo.png"> OOP! We broken a link.</h1>
            <h2> This page was not found. </h2>
            <router-link to="/" class="btn btn-primary"><span class="fa fa-home"></span> Take me home.</router-link>
        </div>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue'
    export default Vue.extend({
        name: "not-found"
    })
</script>
