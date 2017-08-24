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
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _tag = function _tag(tagName) {
    var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    var element = document.createElementNS("http://www.w3.org/2000/svg", tagName);
    Object.keys(properties).forEach(function (name) {
        element.setAttribute(name, properties[name]);
    });
    [].concat(children).map(function (def) {
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


if (!Object.assign) {
    Object.assign = function (target, properties) {
        Object.keys(properties).forEach(function (propertyName) {
            target[propertyName] = properties[propertyName];
        });
        return target;
    };
}

module.exports = true;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var noop = function noop() {};

__webpack_require__(4);

module.exports = function (setup) {

    window.addEventListener("load", function () {
        var touchDisabled = true,
            touchEvent = void 0;
        var mapping = setup(),
            coords = function coords(e) {
            return e.touches ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : { x: e.clientX, y: e.clientY };
        },
            click = function click(e) {
            var _coords = coords(e),
                x = _coords.x,
                y = _coords.y;

            if (Object.keys(mapping).every(function (id) {
                if ("undefined" === id) {
                    return true; // skip
                }
                var rect = document.getElementById(id).getBoundingClientRect();
                if (!(x < rect.left || x > rect.right || y < rect.top || y > rect.bottom)) {
                    mapping[id]();
                    return false;
                }
                return true;
            })) {
                (mapping["undefined"] || noop)();
            }
        };

        window.addEventListener("click", function (e) {
            return touchDisabled ? click(e) : 0;
        }, true);
        window.addEventListener("touchstart", function (e) {
            touchDisabled = false;
            touchEvent = e;
        }, false);
        window.addEventListener("touchmove", function () {
            touchEvent = null;
        }, false);
        window.addEventListener("touchend", function () {
            if (null !== touchEvent) {
                click(touchEvent);
                touchEvent = null;
            }
        }, false);
    });
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(7)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./stylesheet.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./stylesheet.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, "html {\n    width: 100%;\n    height: 100%;\n    margin: 0;\n    padding: 0;\n}\n\nbody {\n    width: 100%;\n    height: 100%;\n    margin: 0;\n    padding: 0;\n    -webkit-user-select: none;  /* Chrome all / Safari all */\n    -moz-user-select: none;     /* Firefox all */\n    -ms-user-select: none;      /* IE 10+ */\n    user-select: none;          /* Likely future */\n}\n\nsvg {\n    cursor: pointer;\n    pointer-events: none;\n}\n", ""]);

// exports


/***/ }),
/* 6 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(8);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _get = function _get(id) {
    return document.getElementById(id);
},
    _clear = function _clear(id) {
    var node = _get(id);
    var child = node.firstChild,
        next = void 0;
    while (child) {
        next = child.nextSibling;
        node.removeChild(child);
        child = next;
    }
    return node;
},
    _setText = function _setText(id, text) {
    var node = _clear(id);
    node.appendChild(document.createTextNode(text));
    return node;
};

module.exports = {

    clear: _clear,
    setText: _setText

};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var svg = __webpack_require__(0),
    colors = __webpack_require__(1);

module.exports = function () {
    return svg.defs({}, [svg.linearGradient({ id: "outerBorder", x1: 0.5, x2: 0, y1: 0.5, y2: 0 }, [svg.stop({ offset: "0%", "stop-color": colors.circle.light }), svg.stop({ offset: "100%", "stop-color": colors.circle.dark })]), svg.linearGradient({ id: "innerBorder", x1: 0.5, x2: 0, y1: 0.5, y2: 0 }, [svg.stop({ offset: "0%", "stop-color": colors.circle.dark }), svg.stop({ offset: "100%", "stop-color": colors.circle.light })])]);
};

/***/ }),
/* 11 */
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
/* 12 */
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
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(22);


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*global location*/

__webpack_require__(2);

var browser = __webpack_require__(3),
    dom = __webpack_require__(9),
    svg = __webpack_require__(0),
    colors = __webpack_require__(1),
    gradients = __webpack_require__(10),
    sequenceEditor = __webpack_require__(23).allocate(),
    sequenceSerializer = __webpack_require__(11),
    digitProperties = {
    "font-family": "Arial", "font-size": 0.25, "text-anchor": "middle",
    fill: colors.text.step, stroke: "url(#innerBorder)", "stroke-opacity": 0.2, "stroke-width": 0.001
},
    createButton = function createButton(_ref) {
    var id = _ref.id,
        cx = _ref.cx,
        x = _ref.x,
        y = _ref.y,
        label = _ref.label,
        _ref$r = _ref.r,
        r = _ref$r === undefined ? 0.15 : _ref$r,
        _ref$cy = _ref.cy,
        cy = _ref$cy === undefined ? 0.7 : _ref$cy;
    return [svg.circle({ id: id, r: r, cx: cx, cy: cy,
        fill: colors.circle.light, stroke: "url(#innerBorder)", "stroke-width": 0.01 }), svg.text({ x: x, y: y, "font-family": "Arial", "font-size": 0.2, "text-anchor": "middle",
        fill: colors.text.step, stroke: "url(#outerBorder)", "stroke-opacity": 0.2, "stroke-width": 0.001 }, label)];
},
    createDigit = function createDigit(x, baseId) {
    return [svg.rect({ x: x - 0.1, y: -0.8, width: 0.2, height: 0.4,
        fill: colors.circle.background, stroke: "url(#outerBorder)", "stroke-width": 0.01 }), svg.text(Object.assign({ id: "dig" + baseId, x: x, y: -0.52 }, digitProperties), "")].concat(createButton({ id: "inc" + baseId, cx: x, x: x, y: -0.82, r: 0.08, cy: -0.89, label: "+" }), createButton({ id: "dec" + baseId, cx: x, x: x, y: -0.26, r: 0.08, cy: -0.31, label: "-" }));
},
    encodedSequence = function encodedSequence() {
    return sequenceSerializer.write(sequenceEditor.get());
},
    refresh = function refresh(sequence /*, lengthChanged*/) {
    var current = sequence[sequence.length - 1],
        list = void 0;
    [0, 1, 3, 4].forEach(function (pos, digit) {
        dom.setText("dig" + digit, current.substr(pos, 1));
    });
    list = dom.clear("list");
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

    return {
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
};

browser(setup);

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var tickFormatter = __webpack_require__(12),
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