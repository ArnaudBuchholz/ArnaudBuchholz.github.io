(function () {
    "use strict";

    /**
     * Event handler for the tokenizer
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
     * Reformat the code element
     *
     * @param {HTMLDomElement} codeElement
     */
    function reformatCode (codeElement) {
        var
            codeClass = codeElement.className,
            pre;
        /**
         * Transform the <CODE class="X"></CODE> structure into the following:
         * <PRE class="code X"><CODE class="X"></CODE></PRE>
         */
        pre = document.createElement("pre");
        pre.className = "code " + codeClass;
        pre = codeElement.parentNode.insertBefore(pre, codeElement);
        codeElement = pre.appendChild(codeElement);
        // Use tokenizer to format the content
        if ("javascript" === codeClass) {
            // https://github.com/ArnaudBuchholz/gpf-js/issues/5
            var content = codeElement.innerHTML
                            .replace(/(&lt;)/g, "<")
                            .replace(/(&gt;)/g, ">")
                            .replace(/(&amp;)/g, "&");
            codeElement.innerHTML = ""; // Easy way to clear current content
            gpf.js.tokenize.apply(codeElement, [content, onTokenFound]);
        }
    }

    // Create a waiting dialog that will appear / disappear on need
    // It remains on top of the screen (i.e. follow scroll)
    var _waitingDialog = document.createElement("div");
    _waitingDialog.className = "waiting";
    _waitingDialog.innerHTML = "<span class=\"gear spin\"></span>"
                               + "<span class=\"label\">Waiting for GPF</span>";
    _waitingDialog = document.body.appendChild(_waitingDialog);

    // As the blog may load posts asynchronously, monitor the DOM layout
    // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
    window.blog = function () {
        var
            codes = document.getElementsByTagName("code"),
            idx;
        for (idx = 0; idx < codes.length; ++idx) {
            reformatCode(codes[idx]);
        }
    };

}());
