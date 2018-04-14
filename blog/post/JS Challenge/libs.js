"use strict";

var dom = require("dom.js"),
    script = dom.script,
    link = dom.link,
    head = dom.head();

script({
    src: "https://code.jquery.com/jquery-3.3.1.min.js",
    integrity: "sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=",
    crossorigin: "anonymous"

}).appendTo(head).addEventListener("load", function () {

    // jQuery is required for bootstrap

    script({
        src: "https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.bundle.min.js",
        integrity: "sha384-lZmvU/TzxoIQIOD9yQDEpvxp6wEU32Fy0ckUgOH4EIlMOCdR823rg4+3gWRwnX1M",
        crossorigin: "anonymous"

    }).appendTo(head);

});

link({
    href: "https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css",
    rel: "stylesheet",
    integrity: "sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4",
    crossorigin: "anonymous"

}).appendTo(head);

script({
    src: "https://cdnjs.cloudflare.com/ajax/libs/prism/1.13.0/prism.js"

}).appendTo(head);

link({
    href: "https://cdnjs.cloudflare.com/ajax/libs/prism/1.13.0/themes/prism.css",
    rel: "stylesheet"

}).appendTo(head);
