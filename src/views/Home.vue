<template>  
    <div class="home container">
        <h1>{{ msg }}</h1>
        <p>Welcome to your new single-page application, built with <a href="https://vuejs.org" target="_blank">Vue.js</a> and <a href="http://www.typescriptlang.org/" target="_blank">TypeScript</a>.</p>
        <button type="button" @click="ShowDlg">Dialog</button>
    </div>
</template>

<script lang="ts">
    import Vue, { ComponentOptions } from "vue";

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
        },
        methods: {
            ShowDlg() {
                let vm = this as Vue;
                vm.$dialog("This is the first line<br />And this is the second line")
                    .then((res) => { console.log(res); })
                    .catch(() => { console.log("You selected No"); });
            }
        }
    } as ComponentOptions<any>
</script>

<style lang="scss" scoped>
$myColor: green;

.home > p > a {
    color: $myColor;
}

h1 {
    text-decoration: underline;
    color:darkorange;
}

p {
    font-weight: bolder;
}
</style>
