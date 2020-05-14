/** Flush the content of the vue types in vuex to allow a custom store type */
var fs = require('fs');
var path = './node_modules/vuex/types/vue.d.ts';
fs.exists(path, function(exists) {
    if (exists) {
        fs.truncate(path, 0, function() {});
    }
});