var fs = require("fs"),/*gpf:apply-jshint*/
    path = require("path"),
    start = new Date(),
    files,
    key;

function exploreSync(currentPath, result) {
    "use strict";
    var stat = fs.statSync(currentPath);
    if (undefined === result) {
        // Allocate result dictionary that will be passed to the sub calls
        result = {};
    }
    if (stat.isDirectory()) {
        // Folder
        var list = fs.readdirSync(currentPath),
            len,
            idx;
        len = list.length;
        for (idx = 0; idx < len; ++idx) {
            exploreSync(path.join(currentPath, list[idx]), result);
        }
    } else {
        // File
        result[currentPath] = fs.readFileSync(currentPath);
    }
    return result;
}

files = exploreSync(process.argv[2]);

console.log("Spent " + (new Date() - start) + "ms");
console.log("Here we can use files dictionary:");
for (key in files) {
    if (files.hasOwnProperty(key)) {
        console.log(key + " " + files[key].length);
    }
}