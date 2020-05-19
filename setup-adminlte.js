var fs = require("fs");
console.log("Building AdminLTE...");
// Remove site layout and copy new layout
fs.unlink("./src/views/layout", function(e) { console.log(e); });
fs.mkdir("./src/views/layout", function(e) { console.log(e); });
fs.copyFile("./themes/adminlte/layout", "./src/views/layout", function(e) { console.log(e); });