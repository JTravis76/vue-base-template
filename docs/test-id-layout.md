# TestIdLayout.vue
---
This component is use to display all the `data-testid` attributes. Great help when trying to locate any missing elements that may require a test anchor.

Add to main App.vue, start application and press `F8` to toggle layout.

*App.vue*
```vue
<template>
    <div>
        <!-- Page content here -->
        <test-id-layout></test-id-layout>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import TestIdLayout from "@/components/TestIdLayout.vue";

    export default Vue.extend({
        name: "my-app",
        components: {
            TestIdLayout
        }
    });
</script>
```