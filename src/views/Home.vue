<template>  
    <div class="home container">
        <h1>{{ msg }}</h1>
        <p>Welcome to your new single-page application, built with <a href="https://vuejs.org" target="_blank">Vue.js</a> and <a href="http://www.typescriptlang.org/" target="_blank">TypeScript</a>.</p>
    </div>
</template>

<script lang="ts">
    import { ComponentOptions } from "vue";

    export default {
        name: "home-page",
        props: {
            msg: {
                type: String,
                required: false,
                default() {
                    return "Home";
                }
            }       
        }
    } as ComponentOptions<any>
</script>

<style lang="scss">
$myColor: green;

.home > p> a {
    color: $myColor;
}
</style>
