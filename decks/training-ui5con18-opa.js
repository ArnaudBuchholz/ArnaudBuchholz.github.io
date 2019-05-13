"use strict";

document.write("<img id=\"running\" src=\"http://localhost:8080/running.png\" />");

window.addEventListener("load", function() {
    var isSampleAppAvailable = !!document.getElementById("running").naturalWidth;
    // Links should open in a new tab to keep the presentation state
    var missingSampleAppMsg = "Download the training-ui5con18-opa project and run\nnpm run-script serve";
    window.missingSampleApp = function () {
        alert(missingSampleAppMsg);
    };
    [].slice.call(document.querySelectorAll("a")).forEach(function (node) {
        node.setAttribute("target", "_blank");
        if (node.getAttribute("href").indexOf("http://localhost") === 0) {
            if (!isSampleAppAvailable) {
                node.setAttribute("title", missingSampleAppMsg);
                node.setAttribute("href", "javascript:missingSampleApp()");
                node.className = "missingSampleApp";
            }
        }
    });
});
