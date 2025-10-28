import Vue from "vue";

/** format date to "Thu Oct 10 2019" */
Vue.filter("toDateString", (value: string) => {
  if (value) {
    return new Date(value).toDateString(); // -> Thu Oct 10 2019
  }
});
/** format date to "11/1/2019" */
Vue.filter("shortDateString", (value: string) => {
  if (value) {
    let d = new Date(Date.parse(value));
    return (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
  }
});
/** format date to '2:46 PM" */
Vue.filter("shortTimeString", (value: string) => {
  if (value) {
    let d = new Date(Date.parse(value));
    return d.getTime(); //TODO: not tested!!
  }
});
/** format date to "1/28/2020 12:17:02 PM" */
Vue.filter("shortDateTimeString", (value: string) => {
  if (value) {
    // let d = "\/Date(1576156189806)\/";
    let d = new Date(Date.parse(value));
    return (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() + " " + d.toLocaleTimeString('en-US');
  }
});
/** format date to "Jan 2020" */
Vue.filter("monthYearString", (value: string) => {
  if (value) {
    let d = new Date(Date.parse(value));
    let MMM = "";
    switch ((d.getMonth() + 1)) {
      case 1: MMM = "Jan";
      case 2: MMM = "Feb";
      case 3: MMM = "Mar";
      case 4: MMM = "Apr";
      case 5: MMM = "May";
      case 6: MMM = "Jun";
      case 7: MMM = "Jul";
      case 8: MMM = "Aug";
      case 9: MMM = "Sep";
      case 10: MMM = "Oct";
      case 11: MMM = "Nov";
      case 12: MMM = "Dec";
    }
    return MMM + " " + d.getFullYear().toString();
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