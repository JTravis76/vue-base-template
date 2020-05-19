<template>
	<main class="mdl-layout__content">
		<div class="page-content">
            <router-view></router-view>
		</div>
	</main>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";

    @Component({
        name: "main-content"
    })
    export default class MainContent extends Vue {}
</script>

<style lang="scss"></style>