"use strict";

window.addEventListener("load", function() {
    var img = document.createElement("img");
    img.onerror = function () {
      // Links should open in a new tab to keep the presentation state
      var missingSampleAppMsg = "Download the training-ui5con18-opa project and run\nnpm run-script serve";
      window.missingSampleApp = function () {
          alert(missingSampleAppMsg);
      };
      [].slice.call(document.querySelectorAll("a"))
          .filter(function (node) {
              return node.getAttribute("href").indexOf("http://localhost") === 0;
          })
          .forEach(function (node) {
              node.setAttribute("title", missingSampleAppMsg);
              node.setAttribute("href", "javascript:missingSampleApp()");
              node.className = "missingSampleApp";
          });
    }
    img.setAttribute("src", "http://localhost:8080/running.png");
    document.body.appendChild(img);
});
