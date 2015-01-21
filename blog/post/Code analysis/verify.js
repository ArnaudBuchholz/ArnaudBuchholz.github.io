"use strict";
/*global gpf:true*/ // Overrides .jshintrc configuration

// Bootstrap, load & check dependencies
function exitWithError(e) {
    if (e instanceof gpf.events.Event) {
        e = e.get("error");
    }
    console.error(e);
    process.exit();
}
try {
    var gpf = require("gpf-js");
} catch (e) {
    console.error("require(gpf-js) failed: use npm install gpf-js");
    exitWithError(e);
}
try {
    var esprima = require("esprima");
} catch (e) {
    console.error("require(esprima) failed: use npm install esprima");
    exitWithError(e);
}

// Verification function
function verify(source) {
    var
        ast = esprima.parse(source, {
            range: true
        });
    console.log(gpf.json.stringify(ast));
}

// Parameters parsing
try {
    var parameters = gpf.Parameter.parse([{
        name: "path",
        required: true,
        type: "string"
    }, gpf.Parameter.VERBOSE], process.argv.slice(2));
} catch (e) {
    console.error(e.message);
    process.exit();
}

// Load the provided file
gpf.fs.getInfo(parameters.path, {
    error: exitWithError,
    ready: function (event) {
        var infos = event.get("info");
        if (infos.type === gpf.fs.TYPE_NOT_FOUND) {
            exitWithError("File not found");
        }
        gpf.fs.readAsBinaryStream(parameters.path, {
            error: exitWithError,
            ready: function (event) {
                var stream = event.get("stream");
                var decoder = gpf.encoding.createDecoder(stream,
                    gpf.encoding.UTF_8);
                gpf.stringFromStream(decoder, {
                    error: exitWithError,
                    data: function (event) {
                        verify(event.get("buffer"));
                    }
                });
            }
        });
    }
});
