var http = require('http');
var fs = require('fs');
const port = process.env.port || 1337;
console.log("Starting server on port " + port);

var redirectPage = '<!DOCTYPE html><html><head><meta charset="utf-8" /><meta http-equiv="refresh" content="0; url=./dist/" /><title></title></head><body></body></html>';

http.createServer(function (req, res) {
    //console.log(req.url);

    //when empty, redirect
    if (req.url === "/") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(redirectPage);
        return res.end();
    }

    let url = req.url;

    //remove any params
    if (url.indexOf("?") > -1) {
        url = url.substr(0, url.indexOf("?"));
    }

    let ext = "";
    if (req.url.endsWith("/")) {
        url = `${req.url}index.html`;
        ext = "html";
    }
    else if (req.url === "/favicon.ico") {
        //Chrome browser asking for icon
        url = `/dist${req.url}`;
        ext = "ico";
    }
    else if (url.lastIndexOf(".") > -1) {
        let s = url.split(".");
        if (s.length > 0 ) {
            ext = s[s.length - 1];
        }
    }

    url = "." + url;
    fs.exists(url, function (exist) {
        if (!exist) {
            console.log("404 (Not Found): " + url);
            res.writeHead(404);
            return res.end();
        }
        else {
            var contentType = "text/plain";
            switch (ext) {
                case "css":
                    contentType = "text/css";
                    break;
                case "js":
                    contentType = "application/javascript";
                    break;
                case "png":
                    contentType = "image/png";
                    break;
                case "gif":
                    contentType = "image/gif";
                    break;
                case "ico":
                    contentType = "image/ico";
                    break;
                case "html":
                    contentType = "text/html";
                    break;
                case "json":
                    contentType = "application/json";
                    break;
                case "map":
                    contentType = "text/plain";
                    break;
                case "woff":
                    contentType = "font/woff";
                    break;
                case "woff2":
                    contentType = "font/woff2";
                    break;
            }
            fs.readFile(url, function(err, data) {
                if (err !== null) {
                    res.writeHead(500);
                    //res.write();
                    return res.end();
                }
                
                res.writeHead(200, {'Content-Type': contentType});
                res.write(data);
                return res.end();
            });
        }
    });

}).listen(port);