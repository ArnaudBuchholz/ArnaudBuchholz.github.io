"use strict";

window.addEventListener("load", function () {
    var button = document.createElement("button");
    button.className = "export";
    button.innerHTML = "Export";
    button = document.body.insertBefore(button, document.body.firstChild);
    var input = document.body.appendChild(document.createElement("textarea"));
    // input.className = "hidden";
    button.addEventListener("click", function () {
        input.value = document.querySelector(".post-body").innerHTML.trim();
        input.select();
        document.execCommand("copy");
    });
});
