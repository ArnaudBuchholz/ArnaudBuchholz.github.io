var fs = require("fs"),
    path = require("path"),
    start = new Date(),
    key,
    count,
    pendingCount = 0;

function exploreAsync(currentPath, callback, result) {
    "use strict";
    if (undefined === result) {
        // Allocate result dictionary that will be passed to the sub calls
        result = {};
    }
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
                        exploreAsync(path.join(currentPath, list[idx]),
                            callback, result);
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

exploreAsync(process.argv[2], function (files) {
    "use strict";
    console.log("Here we can use files dictionary");
    count = 0;
    for (key in files) {
        if (files.hasOwnProperty(key)) {
            ++count;
            console.log(key + " " + files[key].length);
        }
    }
    console.log("Count: " + count);
    console.log("Spent " + (new Date() - start) + "ms");
});

