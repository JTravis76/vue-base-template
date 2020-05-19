<template>
	<footer class="mdl-mini-footer" style="padding: 16px 32px;">
		<div class="mdl-mini-footer__left-section">
			<div class="mdl-logo">{{$store.state.config.AppName}}</div>
			<ul class="mdl-mini-footer__link-list">
				<li>
					<a href="#">Help</a>
				</li>
				<li>
					<a href="#">Privacy & Terms</a>
				</li>
			</ul>
		</div>
	</footer>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";

    @Component({
        name: "footer-section"
    })
    export default class FooterSection extends Vue {}
</script>

<style lang="scss"></style>