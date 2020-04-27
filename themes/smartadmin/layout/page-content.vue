<template>
    <div id="page-content"> 
        <router-view></router-view> 
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    name: "page-content"
})
</script>