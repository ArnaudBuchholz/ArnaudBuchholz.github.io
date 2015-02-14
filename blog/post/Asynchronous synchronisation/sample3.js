var fs = require("fs"),
    path = require("path"),
    start = new Date(),
    files,
    key,
    count;

function exploreAsync(currentPath, result) {
    "use strict";
    if (undefined === result) {
        // Allocate result dictionary that will be passed to the sub calls
        result = {};
    }
    console.log(">> fs.stat(" + currentPath + ")");
    fs.stat(currentPath, function (err, stat) {
        console.log("<< fs.stat(" + currentPath + ")");
        if (err) {
            console.error(err);
        } else if (stat && stat.isDirectory()) {
            // Folder
            console.log(">> fs.readdir(" + currentPath + ")");
            fs.readdir(currentPath, function (err, list) {
                console.log("<< fs.readdir(" + currentPath + ")");
                var
                    len,
                    idx;
                if (err) {
                    console.error(err);
                } else {
                    len = list.length;
                    for (idx = 0; idx < len; ++idx) {
                        exploreAsync(path.join(currentPath, list[idx]), result);
                    }
                }
            });
        } else {
            console.log(">> fs.readFile(" + currentPath + ")");
            fs.readFile(currentPath, function (err, data) {
                console.log("<< fs.readFile(" + currentPath + ")");
                if (err) {
                    console.error(err);
                } else {
                    result[currentPath] = data;
                }
            });
        }
    });
}

files = exploreAsync(process.argv[2]);

console.log("Here we can use files dictionary?");
count = 0;
for (key in files) {
    if (files.hasOwnProperty(key)) {
        ++count;
        console.log(key + " " + files[key].length);
    }
}
console.log("Count: " + count);
console.log("Spent " + (new Date() - start) + "ms");