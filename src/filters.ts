import Vue from "vue";

Vue.filter("toDateString", (value: string) => {
    if (value) {
        return new Date(value).toDateString();
    }
});
Vue.filter("truncateTen", (value: string) => {
    if (value) {
        if (String(value).length > 10)
            return String(value).substring(0, 10) + "...";
        else
            return value;
    }
});
Vue.filter("lessThan", (value: string) => {
    if (value) {
        return String.fromCharCode(0x003C) + value;
    }
});
Vue.filter("greaterThan", (value: string) => {
    if (value) {
        return String.fromCharCode(0x2265) + value;
    }
});