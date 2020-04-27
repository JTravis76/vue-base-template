<template>
    <div id="test-id-layout" style="display:none;"></div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";

    @Component({
        name: "test-id-layout"
    })
    export default class TestIdLayout extends Vue {}

    document.addEventListener("keyup", (e) => {
        // F8 key
        if (e.keyCode === 119) {
            console.clear();
            let parent = document.getElementById("test-id-layout") as HTMLDivElement;
            if (parent.style.display === "none") {
                parent.style.display = "block";
                document.querySelectorAll("[data-testid]").forEach(x => {
                    console.log(x);

                    let rect = x.getBoundingClientRect();
                    let span = document.createElement("span") as HTMLSpanElement;
                    span.className = "label label-danger";
                    span.innerText = x.getAttribute("data-testid");
                    span.style.position = "fixed";
                    span.style.top = rect.top.toString() + "px";
                    span.style.left = rect.left.toString() + "px";

                    parent.appendChild(span);
                });
            }
            else {
                parent.style.display = "none";
                parent.innerHTML = ""; //<- clear ALL elements
            }
        }
    });
</script>

<style lang="scss">
    #test-id-layout {
        background: none repeat scroll 0 0 rgba(0, 0, 25, 0.2);
        height: 100%;
        left: 0;
        margin: 0;
        padding: 0;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 1060;
    }
</style>