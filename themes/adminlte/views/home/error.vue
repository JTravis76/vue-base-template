<template>
    <div v-if="error != undefined">
        <h1>{{error.message}}</h1>
        <h3>{{error.response.status}} <small>{{error.response.statusText}}</small></h3>
        <h3 class="text-bold text-danger">{{error.response.data.ExceptionMessage}}</h3>
        <div class="form-group">
            <template v-if="typeof (error.response.data) == 'string'">
                <div v-html="error.response.data"></div>
            </template>
            <template v-else>
                <label class="control-label">Stack Trace</label>
                <div v-html="error.response.data.StackTrace"></div>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "error-page",
    computed: {
        error() {
            return this.$store.state.serverError;
        }
    }
})
</script>