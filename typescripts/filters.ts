import * as Vue from "vue"
import * as moment from "moment"

Vue.filter("shortDateString", (value) => {
    if (value) {
        return moment(String(value)).format('l'); //M/D/YYYY
    }
});
Vue.filter("shortDateTimeString", (value) => {
    if (value) {
        return moment(String(value)).format('lll');//M/D/YYYY hh:mm
    }
});
Vue.filter("fullDateTimeString", (value) => {
    if (value) {
        return moment(String(value)).format('llll'); // Tue, Jun 26, 2018 2:46 PM
    }
});
Vue.filter("shortTimeString", (value) => {
    if (value) {
        return moment(String(value)).format('LT'); // 2:46 PM
    }
});
Vue.filter("activeTimeString", (value) => {
    if (value) {
        return moment(String(value), "HH:mm:ss").format("HH:mm.s"); // 2:46.3
    }
});
Vue.filter("monthYearString", (value) => {
    if (value) {
        return moment(String(value)).format('MMM YYYY'); // Sep 2018
    }
});
Vue.filter("truncateTen", (value) => {
    if (value) {
        if (String(value).length > 10)
            return String(value).substring(0, 10) + "...";
        else
            return value;
    }
});
Vue.filter("lessThan", (value) => {
    if (value) {
        return String.fromCharCode(0x003C) + value;
    }
});
Vue.filter("greaterThan", (value) => {
    if (value) {
        return String.fromCharCode(0x2265) + value;
    }
});