(function () {
    "use strict";

    /*global JSHINT*/

    /**
     * Event handler for the tokenizer (javascript parsing)
     *
     * @param {gpf.events.Event} event
     */
    function onTokenFound (event) {
        /*jshint -W040*/ // this is the transmitted by gpf.js.tokenize
        var
            codeElement = this,
            type = event.type(),
            token = event.get("token"),
            tag;
        if ("space" === type) {
            // Trim any space token before the first non space one
            if (!codeElement.hasChildNodes()) {
                return;
            }
            // Replace tabs with 4 spaces
            token = gpf.replaceEx(token, {
                "\t": "    "
            });
        }
        // Concatenate to the code ele,ent
        tag = document.createElement("span");
        tag.className = type;
        tag.appendChild(document.createTextNode(token));
        codeElement.appendChild(tag);
    }

    /**
     * Configure the CODE element to detect the language (javascript by default)
     *
     * @param {Number} idx
     * @param {*} code CODE element
     */
    function configureCode (idx, code) {
        gpf.interfaces.ignoreParameter(idx);
        if (!code.getAttribute("class")) {
            code.setAttribute("class", "javascript");
        }
    }

    /**
     * Configure the IMG image to open in a new target and fit the max-width
     *
     * @param {Number} idx
     * @param {*} image IMG element
     */
    function configureImage (idx, image) {
        gpf.interfaces.ignoreParameter(idx);
        var
            anchor = document.createElement("a"),
            parent = image.parentNode,
            title;
        image.setAttribute("border", 0);
        image.setAttribute("style", "max-width: 100%");
        title = image.getAttribute("alt");
        anchor.setAttribute("href", image.getAttribute("src"));
        anchor = parent.insertBefore(anchor, image);
        anchor.appendChild(document.createTextNode(title));
        anchor.appendChild(document.createElement("br"));
        anchor.appendChild(image);
    }

    /**
     * Configure the A link to open in a new target
     *
     * @param {Number} idx
     * @param {*} anchor A element
     */
    function configureAnchor (idx, anchor) {
        gpf.interfaces.ignoreParameter(idx);
        anchor.setAttribute("target", "_blank");
    }

    /**
     * Dictionary mapping known class type to a specific handler that knows how
     * to reformat its content.
     * The handler must have the following signature:
     * param {*} codeElement the HTML code element to format
     * result {Boolean} True if the element must be removed
     *
     * @type {Object}
     */
    var knownCodeClasses = {

        javascript: function (codeElement) {
            // Use tokenizer to format the content
            // https://github.com/ArnaudBuchholz/gpf-js/issues/5
            var content = codeElement.innerHTML
                .replace(/(&lt;)/g, "<")
                .replace(/(&gt;)/g, ">")
                .replace(/(&amp;)/g, "&");
            codeElement.innerHTML = ""; // Easy way to clear current content
            gpf.js.tokenize.apply(codeElement, [content, onTokenFound]);
            // JSHint integration
            var
                result = JSHINT(content),
                jshintTooltip = document.createElement("div"),
                jshintResult = document.createElement("div");
            jshintTooltip.appendChild(jshintResult);
            gpf.html.addClass(jshintTooltip, "gpf-jshint");
            if (result) {
                gpf.html.addClass(jshintResult, "gpf-jshint-ok");
            } else {
                gpf.html.addClass(jshintResult, "gpf-jshint-ko");
            }
            code.appendChild(jshintTooltip);
            return false;
        },

        markdown: function (codeElement) {
            // Parse first level text nodes as markdown streams
            var
                codeParent = codeElement.parentNode,
                parser,
                output,
                fragment,
                child,
                next;
            child = codeElement.firstChild;
            while (child) {
                next = child.nextSibling;
                if (gpf.html.TEXT_NODE === child.nodeType) {
                    // Parse and append
                    parser = new gpf.html.MarkdownParser();
                    output = [];
                    parser.setOutputHandler(output);
                    parser.parse(child.textContent, gpf.Parser.FINALIZE);
                    fragment = document.createElement("div");
                    fragment.className = "code " + codeElement.className;
                    fragment.innerHTML = output.join("");
                    gpf.each(fragment.getElementsByTagName("code"),
                        configureCode);
                    gpf.each(fragment.getElementsByTagName("img"),
                        configureImage);
                    gpf.each(fragment.getElementsByTagName("a"),
                        configureAnchor);
                    codeParent.insertBefore(fragment, codeElement);
                } else {
                    codeParent.insertBefore(child, codeElement);
                }
                child = next;
            }
            // Remove element from the DOM tree
            return true;
        }
    };

    // Create a waiting dialog that will appear / disappear on need
    // It remains on top of the screen (i.e. follow scroll)
    var
        waitingDialog,
        waitingLabel,
        codes,
        len,
        idx = 0,
        code,
        knownHandler;

    // Create a small waiting dialog
    waitingDialog = document.createElement("div");
    waitingDialog.className = "waiting gpf-top";
    waitingDialog.innerHTML = "<span class=\"gear spin\"></span>"
                               + "<span class=\"label\">Waiting for GPF</span>";
    waitingDialog = document.body.appendChild(waitingDialog);
    waitingLabel = waitingDialog.querySelector(".label");

    // TODO: As the blog may load posts asynchronously, monitor the DOM layout
    // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
    gpf.html.responsive({
        monitorTop: true // will create .gpf-top CSS class
    });

    // Use a live list as it gives a better support than
    // document.querySelectorAll("code:not(.gpf-blog)")
    codes = document.getElementsByTagName("code");
    len = codes.length;
    while (idx < len) {
        for (idx = 0; idx < len; ++idx) {
            code = codes[idx];
            if (!gpf.html.hasClass(code, "gpf-blog")) {
                waitingLabel.innerHTML = "Reformatting (" + (idx + 1)
                    + "/" + len + ")";
                knownHandler = knownCodeClasses[code.className];
                if (undefined !== knownHandler) {
                    if (knownHandler(code)) {
                        code.parentNode.removeChild(code);
                        code = null;
                    }
                }
                if (code) {
                    gpf.html.addClass(code, "gpf-blog");
                }
                len = codes.length;
                break;
            }
        }
    }
    gpf.html.addClass(waitingDialog, "hide");

}());
