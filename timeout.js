(function (self) {
    "use strict";

    var
        /**
         * The following 3 constants are used to determine the type of action
         * (using bitwise comparison, see _workerMessage)
         *
         * For instance:
         *  _TIMEOUT = setTimeout
         *  _TIMEOUT + CLEAR = clearTimeout
         */
        _TIMEOUT    = 0,
        _INTERVAL   = 1,
        _CLEAR      = 2,
        // Bypass JSHint W054
        Func        = Function,

        // Last allocated timeoutID
        _timeoutID = 0,

        /**
         * WINDOW:
         *  Map allocated timeoutID to an array of parameters (see _register)
         * WEBWORKER
         *  Map real timeoutID to allocated one
         */
        _timeouts   = {},

        // Last allocated intervalID
        _intervalID = 0,

        /**
         * WINDOW:
         *  Map allocated intervalID to an array of parameters (see _register)
         * WEBWORKER
         *  Map real intervalID to allocated one
         */
        _intervals  = {},

        // WebWorker handle
        _worker;

    /**
     * Handle messages sent to the WINDOW by the WEBWORKER: receive
     * notifications of timeout and interval.
     *
     * @param {{data: Object}} event
     * @private
     */
    function _windowMessage(event) {
        var type = event.data.type,
            id = event.data.id,
            definition,
            remove;
        if (_TIMEOUT === type) {
            definition = _timeouts[id];
            remove = true;
        } else {
            definition = _intervals[id];
            remove = false;
        }
        if (undefined !== definition) {
            if (remove) {
                delete _timeouts[id];
            }
            definition[0].apply(window, definition.slice(1));
        }
    }

    /**
     * Register the timeout/interval parameters and send a message to the
     * worker thread to be notified back when necessary.
     *
     * Note: all parameters as well as the callback function are stored within
     * an array containing the callback first and then any additional parameter
     *
     * @param {Number} type
     * @param {Object} map
     * @param {Number} id
     * @param {Array} initialArguments arguments of setTimeout / setInterval
     * @returns {Number}
     * @private
     */
    function _register(type, map, id, initialArguments) {
        var delay = initialArguments[1] || 0,
            callback = initialArguments[0];
        if ("string" === typeof callback) {
            callback = new Func(callback);
        }
        map[id] = [callback]
            .concat(Array.prototype.slice.apply(initialArguments, [2]));
        _worker.postMessage({
            type: type,
            delay: delay,
            id: id
        });
        return id;
    }

    /**
     * setTimeout replacement
     *
     * @returns {Number} timeoutID
     * @private
     */
    function _setTimeout() {
        return _register(_TIMEOUT, _timeouts, ++_timeoutID, arguments);
    }

    /**
     * clearTimeout replacement
     *
     * @param {Number} id timeoutID
     * @private
     */
    function _clearTimeout(id) {
        delete _timeouts[id];
        _worker.postMessage({
            type: _TIMEOUT + _CLEAR,
            id: id
        });
    }

    /**
     * _setInterval replacement
     *
     * @returns {Number} intervalID
     * @private
     */
    function _setInterval() {
        return _register(_INTERVAL, _intervals, ++_intervalID, arguments);
    }

    /**
     * _clearInterval replacement
     *
     * @param {Number} id intervalID
     * @private
     */
    function _clearInterval(id) {
        delete _intervals[id];
        _worker.postMessage({
            type: _INTERVAL + _CLEAR,
            id: id
        });
    }

    /**
     * Callback function for the WEBWORKER setTimeout / setInterval:
     * Notify the WINDOW that the timeout / interval event occurred.
     *
     * @param {Number} type
     * @param {Number} id
     * @private
     */
    function _notify(type, id) {
        self.postMessage({
            type: type,
            id: id
        });
    }

    /**
     * Handle messages sent to the WEBWORKER by the WINDOW: receive
     * registrations and clearings.
     *
     * NOTE: the additional parameters of setTimeout / setInterval are leveraged
     * to prevent creation of useless closures.
     *
     * @param {{data: Object}} event
     * @private
     */
    function _workerMessage(event) {
        var
            type = event.data.type,
            incomingID = event.data.id,
            systemID,
            map,
            clearCmd,
            setCmd;
        if (_INTERVAL === (_INTERVAL & _INTERVAL)) {
            map = _intervals;
            clearCmd = clearInterval;
            setCmd = setInterval;
        } else {
            map = _timeouts;
            clearCmd = clearTimeout;
            setCmd = setTimeout;
        }
        if (_CLEAR === (_CLEAR & type)) {
            systemID = map[incomingID];
            if (undefined !== systemID) {
                clearCmd(systemID);
                delete map[incomingID];
            }
        } else {
            systemID = setCmd(_notify, event.data.delay, [type, incomingID]);
            map[incomingID] = systemID;
        }
    }

    /**
     * Try to retrieve the URL of timeout.js
     *
     * return {String}
     * @private
     */
    function _getTimeoutURL() {
        var
            elem,
            elems,
            len,
            idx,
            src;
        // Check if a script tag with the id timeout exists
        elem = document.getElementById("timeout");
        if (elem && elem.tagName.toUpperCase() === "SCRIPT") {
            return elem.getAttribute("src");
        }
        // Check all script tags for the one finishing with timeout.js
        elems = document.getElementsByTagName("script");
        len = elems.length;
        for (idx = 0; idx < len; ++idx) {
            elem = elems[idx];
            src = elem.getAttribute("src");
            if (src.split("/").pop() === "timeout.js") {
                return src;
            }
        }
        // Default
        return "timeout.js";
    }

    if ("undefined" !== typeof window) {
        /**
         * The Web Worker does not have access to the window, this is a good
         * condition to detect if we are in the page or in the thread.
         *
         * However, to create a worker, we need the URL of the script to load.
         */
        _worker = new Worker(_getTimeoutURL());
        _worker.addEventListener("message", _windowMessage);
        window.setTimeout = _setTimeout;
        window.clearTimeout = _clearTimeout;
        window.setInterval = _setInterval;
        window.clearInterval = _clearInterval;
    } else {
        self.addEventListener("message", _workerMessage);
    }

}(this));
