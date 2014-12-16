(function () {
    "use strict";

    var
        baseUrl = "http://ArnaudBuchholz.github.io",
        gpfUrl,
        blogJsUrl,
        blogCssUrl,
        fileAccess = window.location.protocol === "file:";

    if (fileAccess) {
        window.gpfSourcesPath = "../../../gpf-js/";
        gpfUrl = "../../../gpf-js/boot.js";
        blogJsUrl = "../blog.js";
        blogCssUrl = "../blog.css";

    } else {
        gpfUrl = baseUrl + "gpf.js";
        blogJsUrl = baseUrl + "/blog/blog.js";
        blogCssUrl = baseUrl + "/blog/blog.css";
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
        // First insert blog JavaScript (will be triggered with gpf-loaded)
        head.insertBefore(_el("script", {
            language: "javascript",
            src: blogJsUrl
        }), head.firstChild);
        // Then GPF
        head.insertBefore(_el("script", {
            language: "javascript",
            src: gpfUrl,
            "gpf-loaded": "blog"
        }), head.firstChild);
        // Style sheets
        if (fileAccess) {
            head.appendChild(_el("link", {
                rel: "stylesheet",
                type: "text/css",
                href: "../file.css"
            }));
        }
        head.appendChild(_el("link", {
            rel: "stylesheet",
            type: "text/css",
            href: blogCssUrl
        })); // Must be the last one
    }

    // Defer execution of _include to finish page loading first
    window.setTimeout(_include, 0);

}());
