"use strict";

window.addEventListener("load", function () {
    var button = document.createElement("button");
    button.className = "export";
    button.innerHTML = "Export";
    button = document.body.insertBefore(button, document.body.firstChild);
    var input = document.body.appendChild(document.createElement("textarea"));
    // input.className = "hidden";
    function remove (selector) {
        [].slice.call(document.querySelectorAll(selector)).forEach(function (node) {
            node.parentNode.removeChild(node);
        });
    }
    button.addEventListener("click", function () {
        remove("a[href='#todo']");
        remove("a[name='todo']");
        remove("iframe[src^='http://jsfiddle']");
        remove("iframe[src^='https://jsfiddle']");
        input.value = document.querySelector(".post-body").innerHTML.trim();
        input.select();
        document.execCommand("copy");
    });
});
