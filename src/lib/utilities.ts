﻿/**
 * Converts a JSON Object to Form Encoded
 * @param payload JSON object to convert
 */
export function JsonToFormEncoded(payload: any): string {
    const str = [];
    Object.keys(payload).forEach(key => str.push(`${encodeURIComponent(key)}=${encodeURIComponent(payload[key])}`));
    return str.join('&');
}

/** Signal server that application is alive
 * @param vm Vue instance
 * @returns Id of timer
 */
export function SignalHeartbeat(vm: VueConstructor): number {

    let timerid = window.setInterval(function () {

        vm.$http.post("api/home/heartbeat", null)
            .then((response) => {
                //Success
            });

        vm.$http.get("api/home/checknotices")
            .then((response) => {
                vm.$store.commit("notification/notice", response.data);
            });

    }.bind(this), 30000);

    return timerid;
}