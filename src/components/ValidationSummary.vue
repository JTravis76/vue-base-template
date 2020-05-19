<template>
    <div class="alert alert-danger alert-dismissable" v-show="ErrorMessages.length > 0">
        <span class="close" @click="ClearValidation" aria-label="close" style="text-decoration:none;">&times;</span>
        {{title}}
        <ul>
            <li v-for="(row, idx) in ErrorMessages" :key="idx">{{row.ErrorMessage}}{{row.Exception}}</li>
        </ul>
    </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

    @Component({
        name: "validation-summary"
      })
    export default class ValidationSummary extends Vue {
        @Prop({ default: "Please correct the following errors:" }) readonly title: string;

        get ErrorMessages() {
            if (this.$store.state.validationSummary !== undefined) {
                return this.$store.state.validationSummary.errors;
            }
            else {
                console.warn("Missing Validation Summary store module");
            }
            return [];
        }

        ClearValidation() {
            this.$store.commit("validationSummary/Errors", []);
        }
    }
</script>

<style lang="scss"></style>