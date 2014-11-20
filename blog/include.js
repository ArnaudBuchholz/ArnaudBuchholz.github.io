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

    window.setTimeout(function () {
        var
            head = document.getElementsByTagName("head")[0]
                   || document.documentElement,
            scripts = head.getElementsByTagName("script"),
            tag,
            idx;
        for (idx = 0; idx < scripts.length; ++idx) {
            if (scripts[idx].src === gpfUrl) {
                return; // OK, script already inserted
            }
        }
        // Not inserted yet
        tag = function (name, attributes) {
            var
                result = document.createElement(name),
                att;
            for (att in attributes) {
                if (attributes.hasOwnProperty(att)) {
                    result.setAttribute(att, attributes[att]);
                }
            }
            return result;
        };
        head.insertBefore(tag("script", {
            language: "javascript",
            src: gpfUrl
        }), head.firstChild);
        head.insertBefore(tag("script", {
            language: "javascript",
            src: blogJsUrl
        }), head.firstChild);
        if (fileAccess) {
            head.appendChild(tag("link", {
                rel: "stylesheet",
                type: "text/css",
                href: "../file.css"
            }));
        }
        head.appendChild(tag("link", {
            rel: "stylesheet",
            type: "text/css",
            href: blogCssUrl
        })); // Must be the last one
    }, 0);

}());
