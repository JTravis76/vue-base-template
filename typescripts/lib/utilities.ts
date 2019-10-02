/**
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

        //User's heartbeat
        vm.$http.post("OnlineUser.ashx", null)
            .then(() => {
                //Success
            });

        vm.$http.get("CheckNotification.ashx")
            .then((response) => {
                vm.$store.commit("notification/notice", response.data);
            });

    }.bind(this), 30000);

    return timerid;
}