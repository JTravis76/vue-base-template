/**
    * Chrome
      5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36

    * Edge legacy
      5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/18.17763

    * Edge w/Chromiun
      5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36 Edge/84.0.522.59

    * IE 11
      5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.3; rv:11.0) like Gecko

    * IE 10
      5.0 (compatible; MSIE 10.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.3)
 */
export function isBrowserSupported(): boolean {
    //TODO: be nice to passin the list of browser to support.

    let appVersion = window.navigator.appVersion;
    if (appVersion.indexOf("MSIE 10.0") > -1) {
        //console.log("Internet Explorer 10 is not supported.");
    }
    if (appVersion.indexOf("rv:11.0") > -1) {
        //console.log("Internet Explorer 11 support is limited.");                
    }
    if (appVersion.indexOf("Edge/") > -1) {
        //console.log("Edge");
        //return true;
    }
    if (appVersion.indexOf("Edge/") === -1 && window.navigator.appVersion.indexOf("Chrome/") > -1) {
        //console.log("Chrome");
        return true;
    }

    return false;
}