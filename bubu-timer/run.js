/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _tag = function _tag(tagName, properties, children) {
    var element = document.createElementNS("http://www.w3.org/2000/svg", tagName);
    Object.keys(properties).forEach(function (name) {
        element.setAttribute(name, properties[name]);
    });
    [].concat(children || []).map(function (def) {
        return typeof def === "string" ? document.createTextNode(def) : def;
    }).forEach(function (node) {
        return element.appendChild(node);
    });
    return element;
},
    _svg = _tag.bind(null, "svg");

["circle", "text", "path", "defs", "linearGradient", "stop", "rect", "g"].forEach(function (tag) {
    _svg[tag] = _tag.bind(null, tag);
});

module.exports = _svg;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    background: "#ccd0d3",
    circle: {
        light: "#dce0e1",
        dark: "#b3b7ba",
        background: "#a8acae"
    },
    progress: {
        total: "#def1f2",
        step: "#f3dfe6"
    },
    text: {
        time: "#ffffff",
        ms: "#ffffff",
        step: "#000000"
    }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var svg = __webpack_require__(0),
    colors = __webpack_require__(1);

module.exports = function () {
    return svg.defs({}, [svg.linearGradient({ id: "outerBorder", x1: 0.5, x2: 0, y1: 0.5, y2: 0 }, [svg.stop({ offset: "0%", "stop-color": colors.circle.light }), svg.stop({ offset: "100%", "stop-color": colors.circle.dark })]), svg.linearGradient({ id: "innerBorder", x1: 0.5, x2: 0, y1: 0.5, y2: 0 }, [svg.stop({ offset: "0%", "stop-color": colors.circle.dark }), svg.stop({ offset: "100%", "stop-color": colors.circle.light })])]);
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _read = function _read(string) {
    return string ? string.split(",").map(function (time) {
        return 1000 * parseInt(time, 10);
    }) : [];
},
    _write = function _write(sequence) {
    return sequence.map(function (time) {
        return Math.floor(time / 1000);
    }).join(",");
};

module.exports = {
    read: _read,
    write: _write
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _zero = function _zero(x) {
    var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

    var result = [],
        max = Math.pow(10, count - 1);
    while (max > 1 && x < max) {
        result.push("0");
        max /= 10;
    }
    result.push(x);
    return result.join("");
};

module.exports = function (tick) {
    var ms = _zero(tick % 1000, 3),
        seconds = (tick - ms) / 1000,
        s = _zero(seconds % 60),
        m = _zero((seconds - s) / 60),
        time = m + ":" + s;
    return { time: time, ms: ms };
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*eslint-disable no-alert*/

var TOTAL_OUTER = 0.98,
    TOTAL_INNER = 0.88,
    STEP_OUTER = 0.83,
    STEP_INNER = 0.73,
    svg = __webpack_require__(0),
    colors = __webpack_require__(1),
    gradients = __webpack_require__(2),
    sequenceSerializer = __webpack_require__(3),
    tickGenerator = __webpack_require__(7),
    tickConverter = __webpack_require__(8),
    tickFormatter = __webpack_require__(4),


// alarm1 = new Audio(require("./res/alarm1.mp3")),
// alarm2 = new Audio(require("./res/alarm2.mp3")),

defaultRequestAnimFrame = function defaultRequestAnimFrame(callback) {
    return setTimeout(callback, 1000 / 60);
},
    requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame // Chrome & Safari
|| window.mozRequestAnimationFrame // Firefox
|| window.oRequestAnimationFrame // Opera
|| window.msRequestAnimationFrame // Internet Explorer
|| defaultRequestAnimFrame,
    sequence = sequenceSerializer.read(location.search.substr(1)),
    sequenceTotal = sequence.reduce(function (total, tick) {
    return total + tick;
}, 0),
    ticker = tickGenerator.allocate(),
    ratio2Coords = function ratio2Coords(ratio) {
    var radius = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var precision = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10000;

    var radian = ratio * 2 * Math.PI,
        x = Math.floor(radius * precision * Math.sin(radian)) / precision,
        y = Math.floor(-radius * precision * Math.cos(radian)) / precision;
    return { x: x, y: y };
},
    getCirclePath = function getCirclePath(ratio, outerRadius, innerRadius) {
    var outer = ratio2Coords(ratio, outerRadius),
        inner = ratio2Coords(ratio, innerRadius),
        path = ["M 0 -" + outerRadius];
    if (ratio > 0.5) {
        path.push("A " + outerRadius + " " + outerRadius + " 0 0 1 0 " + outerRadius, "A " + outerRadius + " " + outerRadius + " 0 0 1 " + outer.x + " " + outer.y, "L " + inner.x + " " + inner.y, "A " + innerRadius + " " + innerRadius + " 0 0 0 0 " + innerRadius, "A " + innerRadius + " " + innerRadius + " 0 0 0 0 -" + innerRadius);
    } else {
        path.push("A " + outerRadius + " " + outerRadius + " 0 0 1 " + outer.x + " " + outer.y, "L " + inner.x + " " + inner.y, "A " + innerRadius + " " + innerRadius + " 0 0 0 0 -" + innerRadius);
    }
    path.push("L 0 -" + outerRadius);
    return path.join(" ");
},
    onTick = function onTick(tick) {

    var convertedTick = tickConverter(tick.elapsed, sequence),
        currentDuration = sequence[convertedTick.step % sequence.length],
        total = tick.elapsed / sequenceTotal % 1,
        step = 1 - convertedTick.remaining / currentDuration,
        formattedRemaining = tickFormatter(convertedTick.remaining);

    document.getElementById("time").innerHTML = formattedRemaining.time;
    document.getElementById("ms").innerHTML = "." + formattedRemaining.ms;

    if (convertedTick.step < sequence.length) {
        document.getElementById("total").setAttribute("d", getCirclePath(total, TOTAL_OUTER, TOTAL_INNER));
        document.getElementById("step").setAttribute("d", getCirclePath(step, STEP_OUTER, STEP_INNER));
        document.getElementById("stepOn").innerHTML = convertedTick.step + 1 + " / " + sequence.length;
        requestAnimFrame(ticker.tick.bind(ticker));
    } else {
        document.getElementById("total").setAttribute("d", getCirclePath(0, TOTAL_OUTER, TOTAL_INNER));
        document.getElementById("step").setAttribute("d", getCirclePath(0, STEP_OUTER, STEP_INNER));
        document.getElementById("stepOn").innerHTML = "done.";
    }
},
    progressContainer = function progressContainer(_ref) {
    var outerRadius = _ref.outerRadius,
        innerRadius = _ref.innerRadius,
        id = _ref.id,
        color = _ref.color;

    return [svg.circle({ cx: 0, cy: 0, r: outerRadius, stroke: "url(#outerBorder)", "stroke-width": 0.01,
        fill: colors.circle.background }), svg.circle({ cx: 0, cy: 0, r: innerRadius, stroke: "url(#innerBorder)", "stroke-width": 0.01,
        fill: colors.background }), svg.path({ id: id,
        d: "M 0 -" + outerRadius + " A " + outerRadius + " " + outerRadius + " 0 0 1 " + outerRadius + " 0\n                L " + innerRadius + " 0 A " + innerRadius + " " + innerRadius + " 0 0 0 0 -" + innerRadius + " L 0 -" + outerRadius,
        fill: color, stroke: color, "stroke-opacity": 0.2, "stroke-width": 0.01 })];
},
    setup = function setup() {

    document.body.appendChild(svg({
        width: "100%",
        height: "100%",
        viewBox: "-1 -1 2 2",
        style: "background-color: " + colors.background + ";"
    }, [gradients()].concat(progressContainer({
        outerRadius: TOTAL_OUTER,
        innerRadius: TOTAL_INNER,
        id: "total",
        color: colors.progress.total
    })).concat(progressContainer({
        outerRadius: STEP_OUTER,
        innerRadius: STEP_INNER,
        id: "step",
        color: colors.progress.step
    })).concat([svg.text({ id: "time",
        "font-family": "Arial", "font-size": 0.3, x: 0, y: 0.1, "text-anchor": "middle",
        fill: colors.text.time,
        stroke: "url(#innerBorder)", "stroke-opacity": 0.2, "stroke-width": 0.01 }, "00:00"), svg.text({ id: "ms",
        "font-family": "Arial", "font-size": 0.1, x: 0.60, y: 0.1, "text-anchor": "end",
        fill: colors.text.ms,
        stroke: "url(#innerBorder)", "stroke-opacity": 0.2, "stroke-width": 0.001 }, ".123"), svg.text({ id: "stepOn",
        "font-family": "Arial", "font-size": 0.1, x: 0, y: 0.3, "text-anchor": "middle",
        fill: colors.text.step,
        stroke: "url(#outerBorder)", "stroke-opacity": 0.2, "stroke-width": 0.01 }, "1 / 2")])));
};

window.addEventListener("load", function () {
    if (0 === sequence.length) {
        alert("No sequence to play");
    } else {
        setup();
        ticker.on(onTick);
    }
});

window.addEventListener("click", function () {
    if (ticker.isPaused()) {
        ticker.resume();
    } else {
        ticker.pause();
    }
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _allocate = function _allocate() {
    return {
        elapsed: 0,
        refTick: null,
        callback: function callback() {}
    };
},
    _update = function _update(ticker, active) {
    var now = new Date(),
        elapsed = ticker.elapsed;
    if (ticker.refTick) {
        elapsed += now - ticker.refTick;
        if (false === active) {
            ticker.elapsed = elapsed;
            ticker.refTick = null;
        }
    } else if (active) {
        ticker.refTick = now;
    }
    return elapsed;
},
    _notify = function _notify(ticker, active) {
    var elapsed = _update(ticker, active);
    ticker.callback({
        paused: !ticker.refTick,
        elapsed: elapsed
    });
},
    _tick = function _tick(ticker) {
    return _notify(ticker);
},
    _pause = function _pause(ticker) {
    return _notify(ticker, false);
},
    _resume = function _resume(ticker) {
    return _notify(ticker, true);
},
    _attach = function _attach(ticker, callback) {
    ticker.callback = callback;
    _notify(ticker);
};

module.exports = {

    allocate: function allocate() {
        var ticker = _allocate();
        return {
            tick: function tick() {
                return _tick(ticker);
            },
            pause: function pause() {
                return _pause(ticker);
            },
            resume: function resume() {
                return _resume(ticker);
            },
            on: function on(callback) {
                return _attach(ticker, callback);
            },
            isPaused: function isPaused() {
                return !ticker.refTick;
            }
        };
    }

};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (elapsed, sequence) {
    var step = 0,
        remaining = 0;
    sequence.every(function (ms) {
        if (elapsed >= ms) {
            elapsed -= ms;
            ++step;
            return true;
        }
        remaining = ms - elapsed;
        if (remaining === 0) {
            ++step;
        }
        return false;
    });
    return { step: step, remaining: remaining };
};

/***/ })
/******/ ]);