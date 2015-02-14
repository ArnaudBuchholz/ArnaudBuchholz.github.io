var fs = require("fs"),
    path = require("path"),
    start = new Date(),
    key,
    count;

function exploreAsync(currentPath, callback) {
    "use strict";
    var
        result = {},
        pendingCount = 0;
    function _explore(currentPath) {
        ++pendingCount;
        fs.stat(currentPath, function (err, stat) {
            if (err) {
                console.error(err);
            } else if (stat && stat.isDirectory()) {
                // Folder
                ++pendingCount;
                fs.readdir(currentPath, function (err, list) {
                    var
                        len,
                        idx;
                    if (err) {
                        console.error(err);
                    } else {
                        len = list.length;
                        for (idx = 0; idx < len; ++idx) {
                            _explore(path.join(currentPath, list[idx]));
                        }
                    }
                    if (0 === --pendingCount) {
                        callback(result);
                    }
                });
            } else {
                ++pendingCount;
                fs.readFile(currentPath, function (err, data) {
                    if (err) {
                        console.error(err);
                    } else {
                        result[currentPath] = data;
                    }
                    if (0 === --pendingCount) {
                        callback(result);
                    }
                });
            }
            if (0 === --pendingCount) {
                callback(result);
            }
        });
    }
    _explore(currentPath);
}

function result (files) {
    "use strict";
    console.log("Here we can use files dictionary");
    count = 0;
    for (key in files) {
        if (files.hasOwnProperty(key)) {
            ++count;
        }
    }
    console.log("Count: " + count);
    console.log("Spent " + (new Date() - start) + "ms");
}

exploreAsync(process.argv[2], result);
exploreAsync(process.argv[2], result);
exploreAsync(process.argv[2], result);

