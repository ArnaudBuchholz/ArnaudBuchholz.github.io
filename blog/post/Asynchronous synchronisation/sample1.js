var fs = require("fs"),
    path = require("path"),
    start = new Date(),
    files,
    key,
    count;

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

console.log("Here we can use files dictionary:");
count = 0;
for (key in files) {
    if (files.hasOwnProperty(key)) {
        ++count;
        console.log(key + " " + files[key].length);
    }
}
console.log("Count: " + count);
console.log("Spent " + (new Date() - start) + "ms");