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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
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
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*global location*/

var svg = __webpack_require__(0),
    colors = __webpack_require__(1),
    gradients = __webpack_require__(2),
    sequenceEditor = __webpack_require__(11).allocate(),
    sequenceSerializer = __webpack_require__(3),
    digitProperties = {
    "font-family": "Arial", "font-size": 0.25, "text-anchor": "middle",
    fill: colors.text.step, stroke: "url(#innerBorder)", "stroke-opacity": 0.2, "stroke-width": 0.001
},
    createDigit = function createDigit(x, baseId) {
    return [svg.rect({ x: x - 0.1, y: -0.8, width: 0.2, height: 0.4,
        fill: colors.circle.background, stroke: "url(#outerBorder)", "stroke-width": 0.01 }), svg.text(Object.assign({ id: "inc" + baseId, x: x, y: -0.8 }, digitProperties), "⏶"), svg.text(Object.assign({ id: "dig" + baseId, x: x, y: -0.52 }, digitProperties), ""), svg.text(Object.assign({ id: "dec" + baseId, x: x, y: -0.26 }, digitProperties), "⏷")];
},
    createButton = function createButton(_ref) {
    var id = _ref.id,
        cx = _ref.cx,
        x = _ref.x,
        y = _ref.y,
        label = _ref.label;
    return [svg.g({ id: id }, [svg.circle({ r: 0.15, cx: cx, cy: 0.7,
        fill: colors.circle.light, stroke: "url(#innerBorder)", "stroke-width": 0.01 }), svg.text({ x: x, y: y, "font-family": "Arial", "font-size": 0.2, "text-anchor": "middle",
        fill: colors.text.step, stroke: "url(#outerBorder)", "stroke-opacity": 0.2, "stroke-width": 0.001 }, label)])];
},
    encodedSequence = function encodedSequence() {
    return sequenceSerializer.write(sequenceEditor.get());
},
    refresh = function refresh(sequence /*, lengthChanged*/) {
    var current = sequence[sequence.length - 1],
        list = document.getElementById("list");
    [0, 1, 3, 4].forEach(function (pos, digit) {
        document.getElementById("dig" + digit).innerHTML = current.substr(pos, 1);
    });
    list.innerHTML = ""; // clean
    sequence.forEach(function (time, index) {
        list.appendChild(svg.text({
            x: -0.5 + 0.45 * (index % 4),
            y: 0.15 * Math.floor(index / 4),
            "font-family": "Arial", "font-size": 0.15, "text-anchor": "end",
            fill: colors.text.step, stroke: "url(#innerBorder)", "stroke-opacity": 0.2, "stroke-width": 0.001
        }, time));
    });
    location.hash = encodedSequence();
},
    setup = function setup() {
    document.body.appendChild(svg({
        width: "100%",
        height: "100%",
        viewBox: "-1 -1 2 2",
        style: "background-color: " + colors.background + ";"
    }, [gradients()].concat(createDigit(-0.4, 0), createDigit(-0.15, 1), svg.text(Object.assign({ x: 0, y: -0.52 }, digitProperties), ":"), createDigit(0.15, 2), createDigit(0.4, 3)).concat(createButton({ id: "remove", cx: -0.4, x: -0.4, y: 0.75, label: "-" }), createButton({ id: "add", cx: 0, x: 0, y: 0.77, label: "+" }), createButton({ id: "run", cx: 0.4, x: 0.42, y: 0.77, label: "▶" }), svg.g({ id: "list" }))));
    sequenceEditor.set(sequenceSerializer.read(location.hash.substr(1)));
    sequenceEditor.on(refresh);
},
    noop = function noop() {},
    mapping = {
    inc0: function inc0() {
        return sequenceEditor.inc(600);
    },
    dec0: function dec0() {
        return sequenceEditor.dec(600);
    },
    inc1: function inc1() {
        return sequenceEditor.inc(60);
    },
    dec1: function dec1() {
        return sequenceEditor.dec(60);
    },
    inc2: function inc2() {
        return sequenceEditor.inc(10);
    },
    dec2: function dec2() {
        return sequenceEditor.dec(10);
    },
    inc3: function inc3() {
        return sequenceEditor.inc(1);
    },
    dec3: function dec3() {
        return sequenceEditor.dec(1);
    },
    add: function add() {
        return sequenceEditor.get().length < 16 ? sequenceEditor.add() : 0;
    },
    remove: function remove() {
        return sequenceEditor.remove();
    },
    run: function run() {
        window.location = "run.html?" + encodedSequence();
    }
};

window.addEventListener("load", setup);

window.addEventListener("click", function (e) {
    var target = e.target,
        id = void 0;
    while (!id && target) {
        id = target.id;
        target = target.parentNode;
    }
    (mapping[id] || noop)();
});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var tickFormatter = __webpack_require__(4),
    _allocate = function _allocate() {
    return {
        callback: function callback() {},
        sequence: [0]
    };
},
    _notify = function _notify(editor, lengthChanged) {
    editor.callback(editor.sequence.map(function (tick) {
        return tickFormatter(tick).time;
    }), lengthChanged || false);
},
    _attach = function _attach(editor, callback) {
    editor.callback = callback;
    _notify(editor);
},
    _inc = function _inc(editor, sec) {
    var top = Math.min(Math.max(editor.sequence.pop() + sec * 1000, 0), 5999000);
    editor.sequence.push(top);
    _notify(editor);
},
    _add = function _add(editor) {
    editor.sequence.push(0);
    _notify(editor, true);
},
    _remove = function _remove(editor) {
    var sequence = editor.sequence,
        hasRemainingItems = sequence.length > 1;
    if (hasRemainingItems) {
        sequence.pop();
    } else {
        sequence[0] = 0;
    }
    _notify(editor, hasRemainingItems);
},
    _get = function _get(editor) {
    return editor.sequence;
},
    _set = function _set(editor, sequence) {
    editor.sequence = Array.isArray(sequence) && sequence.length ? [].concat(sequence) : [0];
    _notify(editor, true);
};

module.exports = {

    allocate: function allocate() {
        var editor = _allocate();
        return {
            on: function on(callback) {
                return _attach(editor, callback);
            },
            inc: function inc(sec) {
                return _inc(editor, sec);
            },
            dec: function dec(sec) {
                return _inc(editor, -sec);
            },
            add: function add() {
                return _add(editor);
            },
            remove: function remove() {
                return _remove(editor);
            },
            get: function get() {
                return _get(editor);
            },
            set: function set(sequence) {
                return _set(editor, sequence);
            }
        };
    }

};

/***/ })
/******/ ]);