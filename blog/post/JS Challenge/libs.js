"use strict";

var dom = require("/res/dom.js"),
    waitForScript = dom.waitForScript,
    link = dom.link,
    head = dom.head();

var jQueryAndBootstrap = waitForScript({
        src: "https://code.jquery.com/jquery-3.3.1.min.js",
        integrity: "sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=",
        crossorigin: "anonymous"

    }).then(function () {

        // jQuery is required for bootstrap
        return waitForScript({
            src: "https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.bundle.min.js",
            integrity: "sha384-lZmvU/TzxoIQIOD9yQDEpvxp6wEU32Fy0ckUgOH4EIlMOCdR823rg4+3gWRwnX1M",
            crossorigin: "anonymous"

        });

    });

link({
    href: "https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css",
    rel: "stylesheet",
    integrity: "sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4",
    crossorigin: "anonymous"

}).appendTo(head);

var prism = waitForScript({
    src: "https://cdnjs.cloudflare.com/ajax/libs/prism/1.13.0/prism.js"

});

link({
    href: "https://cdnjs.cloudflare.com/ajax/libs/prism/1.13.0/themes/prism.css",
    rel: "stylesheet"

}).appendTo(head);

var showdown = waitForScript({
    src: "https://cdnjs.cloudflare.com/ajax/libs/showdown/1.8.6/showdown.js",
    integrity: "sha256-WZhItMKyEJQarLzuYWKmNplzBgqEKvlAedjRsChG3JA=",
    crossorigin: "anonymous"

});

module.exports = Promise.all([jQueryAndBootstrap, prism, showdown]);
