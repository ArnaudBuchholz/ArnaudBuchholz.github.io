// Generate one Date before replacing the Date constructor
var refDate = new Date(1995, 11, 17, 3, 24, 0); // from MDN

// This regular expression both matches & extracts the values
var _reISOString = new RegExp([
        "([0-9][0-9][0-9][0-9])",
        "\\-",
        "([0-9][0-9])",
        "\\-",
        "([0-9][0-9])",
        "T",
        "([0-9][0-9])",
        "\\:",
        "([0-9][0-9])",
        "\\:",
        "([0-9][0-9])",
        "\\.",
        "([0-9][0-9][0-9])",
        "Z"
    ].join(""));

// Detects ISO representation of a Date
function _isISOString (value) {
    if ("string" !== typeof value && value.length !== 24) {
        return false;
    }
    _reISOString.lastIndex = 0;
    return _reISOString.exec(value);
}

// Generate the constructor call forwarder function
var src = [
        "var C = this,",
        "    p = arguments,",
        "    l = p.length;"
    ],
    args = [],
    idx;
for (idx = 0; idx < 10; ++idx) {
    args.push("p[" + idx + "]");
}
for (idx = 0; idx < 10; ++idx) {
    src.push("    if (" + idx + " === l) {");
    src.push("        return new C(" + args.slice(0, idx).join(", ") + ");");
    src.push("    }");
}
var _genericFactory = new Function (src.join("\r\n"));

function _installDate () {
    var globalContext = this,
        supported = false;
    // Test if ISO format supported
    try {
        var date = new Date("2003-01-22T22:45:34.075Z");
        supported = 2003 === date.getUTCFullYear()
            && 0 === date.getUTCMonth()
            && 0 === date.getUTCMonth()
            && 22 === date.getUTCDate()
            && 22 === date.getUTCHours()
            && 45 === date.getUTCMinutes()
            && 34 === date.getUTCSeconds()
            && 75 === date.getUTCMilliseconds();
    } catch (e) {}
    if (!supported) {
        // Backup original Date constructor
        var _oldDate = globalContext.Date;
        // Date override
        function _newDate () {
            var values = _isISOString(arguments[0]),
                idx,
                args,
                result;
            if (values) {
                args = [];
                for (idx = 0; idx < 7; ++idx) {
                    args.push(parseInt(values[idx + 1], 10));
                }
                // Month must be corrected (0-based)
                --args[1];
                return new _oldDate(_oldDate.UTC.apply(_oldDate.UTC, args));
            }
            return _genericFactory.apply(_oldDate, arguments);
        }
        // Ensure instanceof
        _newDate.prototype = _oldDate.prototype;
        // Copy methods
        _newDate.UTC = _oldDate.UTC; // should bind
        // Replace
        globalContext.Date = _newDate;
    }

}

// Do some tests
WScript.Echo(refDate);

var time = Date.UTC(2003,0,22,22,45,34,75);
var utcDate = new Date(time);
WScript.Echo(time + " ==> " + utcDate);

_installDate();

WScript.Echo("instanceof is " + (refDate instanceof Date ? "OK" : "KO"));

var isoDate = new Date("2003-01-22T22:45:34.075Z");
WScript.Echo(isoDate);

var newDate = new Date(1995, 11, 17, 3, 24, 0);
WScript.Echo(newDate);

var newShortDate = new Date(1995, 11, 17);
WScript.Echo(newShortDate);

var newTimeDate = new Date(Date.UTC(1995, 11, 17, 3, 24, 0));
WScript.Echo(newTimeDate);