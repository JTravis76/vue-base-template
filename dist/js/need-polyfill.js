//function browserSupportsAllFeatures() {
//    var dlg = document.createElement("dialog");
//    return window["Promise"] && window["CustomEvent"] && dlg["showModal"];
//}
function loadScript(src, done) {
    var js = document.createElement('script');
    js.src = src;
    js.onload = function () {
        done();
    };
    js.onerror = function () {
        done(new Error('Failed to load script ' + src));
    };
    document.head.appendChild(js);
}
//if (!browserSupportsAllFeatures()) {
//    loadScript("./js/polyfill.js", function () { console.log("polyfill"); });
//}
if (!window["Promise"]) {
    loadScript("./js/polyfill.js", function () { });
}

