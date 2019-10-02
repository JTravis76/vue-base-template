
export default {
    name: "vaildation-summary",
    template: `<div class="alert alert-danger alert-dismissable" v-show="ErrorMessages.length > 0"> <span class="close" v-on:click="ClearVaildation" aria-label="close" style="text-decoration:none;">&times;</span>{{Title}} <ul> <li v-for="(row, index) in ErrorMessages" v-bind:key="index">{{row.ErrorMessage}}{{row.Exception}}</li> </ul> </div>`,
    data: function () {
        return {
            Title: "Please correct the following errors."
        }
    },
    computed: {
        ErrorMessages() {
            return this.$store.state.vaildation.errors;
        }
    },
    methods: {
        ClearVaildation: function () {
            this.$store.commit("errors", []);
        }
    }
} as ComponentOption