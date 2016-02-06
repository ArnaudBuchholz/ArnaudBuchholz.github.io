var refDate = new Date(1995, 11, 17, 3, 24, 0); // from MDN

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

function _isISOString (value) {
    if ("string" !== typeof value && value.length !== 24) {
        return false;
    }
    _reISOString.lastIndex = 0;
    return _reISOString.exec(value);
}

function _installDate () {
    var globalContext = this,
        supported = false;
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
        var _oldDate = globalContext.Date,
            _newDate;
        _newDate = function () {
            var values = _isISOString(arguments[0]),
                idx,
                args,
                result;
            if (values) {
                args = [];
                for (idx = 0; idx < 7; ++idx) {
WScript.Echo(idx + ": " + values[idx + 1]);
                    args.push(parseInt(values[idx + 1], 10));
                }
                // Month must be corrected (0-based)
WScript.Echo("1: " + args[1]);
                --args[1];
WScript.Echo("1: " + args[1]);
                args = [_oldDate.UTC.apply(_oldDate.UTC, args)];
WScript.Echo(args);
            } else {
                args = arguments;
            }
            result = new _oldDate();
            _oldDate.apply(result, args);
            return result;
        }
        _newDate.prototype = _oldDate.prototype;
        globalContext.Date = _newDate;
    }

}

WScript.Echo(refDate);

var time = Date.UTC(2003,0,22,22,45,34,75);
var utcDate = new Date(time);
WScript.Echo(time + " ==> " + utcDate);

_installDate();

// WScript.Echo(Date);
WScript.Echo(refDate instanceof Date);

var isoDate = new Date("2003-01-22T22:45:34.075Z");
WScript.Echo(isoDate);