"use strict";

window.addEventListener("load", function () {
    var button = document.createElement("button");
    button.className = "export";
    button.innerHTML = "Export";
    button = document.body.insertBefore(button, document.body.firstChild);
    var input = document.body.appendChild(document.createElement("textarea"));
    // input.className = "hidden";
    function remove (selector) {
        var node = document.querySelector(selector);
        if (node) {
            node.parentNode.removeChild(node);
        }
    }
    button.addEventListener("click", function () {
        remove("a[href='#todo']");
        remove("a[name='todo']");
        input.value = document.querySelector(".post-body").innerHTML.trim();
        input.select();
        document.execCommand("copy");
    });
});
