(function () {
    "use strict";

    var
        locationProtocol = window.location.protocol,
        baseUrl,
        gpfUrl,
        gpfLoadedUrls,
        blogCssUrl,
        fileAccess = locationProtocol === "file:";

    if (fileAccess) {
        //window.gpfSourcesPath = "../../../gpf-js/";
        //gpfUrl = "../../gpf-js/boot.js";
        gpfUrl = "../../gpf.js";
        gpfLoadedUrls = "../jshint.js,../blog.js";
        blogCssUrl = "../blog.css";

    } else {
        baseUrl = locationProtocol + "//ArnaudBuchholz.github.io/";
        gpfUrl = baseUrl + "gpf.js";
        gpfLoadedUrls = baseUrl + "blog/jshint.js, " + baseUrl + "blog/blog.js";
        blogCssUrl = baseUrl + "blog/blog.css";
    }

    /**
     * Helper to create an HTML element with attributes
     *
     * @param {String] name Element name
     * @param {Object} attributes Dictionary of name to value
     * @returns {*}
     * @private
     */
    function _el(name, attributes) {
        var
            result = document.createElement(name),
            att;
        for (att in attributes) {
            if (attributes.hasOwnProperty(att)) {
                result.setAttribute(att, attributes[att]);
            }
        }
        return result;
    }

    /**
     * Include scripts & resources needed to render the blog the right way.
     * NOTE: if a header script element is found pointing to the GPF library,
     * it means _include has already been executed.
     *
     * @private
     */
    function _include() {
        var
            head = document.getElementsByTagName("head")[0]
                   || document.documentElement,
            scripts = head.getElementsByTagName("script"),
            idx;
        for (idx = 0; idx < scripts.length; ++idx) {
            if (scripts[idx].src === gpfUrl) {
                return; // OK, script already inserted
            }
        }
        head.insertBefore(_el("script", {
            language: "javascript",
            src: gpfUrl,
            "gpf-loaded": gpfLoadedUrls
        }), head.firstChild);
        // Style sheets
        head.appendChild(_el("link", {
            rel: "stylesheet",
            type: "text/css",
            href: blogCssUrl
        })); // Must be the last one
    }

    // Defer execution of _include to finish page loading first
    window.setTimeout(_include, 0);

}());
