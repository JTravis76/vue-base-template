const http = require('http');
const fs = require('fs');
const port = process.env.port || 1337;
console.log("Starting server on port " + port);

var redirectPage = '<!DOCTYPE html><html><head><meta charset="utf-8" /><meta http-equiv="refresh" content="0; url=./dist/" /><title></title></head><body></body></html>';

const MEDIA_TYPES = {
    ".md": "text/markdown",
    ".html": "text/html",
    ".htm": "text/html",
    ".txt": "text/plain",
    ".css": "text/css",
    ".ico": "image/ico",
    ".gif": "image/gif",
    ".jpg": "image/jpg",
    ".png": "image/png",
    ".json": "application/json",
    ".map": "application/json",
    ".js": "application/javascript",
    ".mjs": "application/javascript",
    ".woff": "font/woff",
    ".woff2": "font/woff2"
}

http.createServer(function (req, res) {
    //console.log(req.url);

    //when empty, redirect
    if (req.url === "/") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(redirectPage);
        return res.end();
    }

    let url = req.url;
    let ext = "";

    //remove any params
    if (url.indexOf("?") > -1) {
        url = url.substr(0, url.indexOf("?"));
    }

    if (req.url.endsWith("/")) {
        url = `${req.url}index.html`;
        ext = ".html";
    }
    else if (req.url === "/favicon.ico") {
        //Chrome browser asking for icon
        url = `/dist${req.url}`;
        ext = ".ico";
    }
    else if (url.lastIndexOf(".") > -1) {
        let s = url.split(".");
        if (s.length > 0 ) {
            ext = `.${s[s.length - 1]}`;
        }
    }

    url = `.${url}`;
    fs.exists(url, function (exist) {
        if (!exist) {
            console.log("404 (Not Found): " + url);
            res.writeHead(404);
            return res.end();
        }
        else {
            fs.readFile(url, function(err, data) {
                if (err !== null) {
                    res.writeHead(500);
                    //res.write();
                    return res.end();
                }

                res.writeHead(200, { 'Content-Type': MEDIA_TYPES[ext] });
                res.write(data);
                return res.end();
            });
        }
    });

}).listen(port);