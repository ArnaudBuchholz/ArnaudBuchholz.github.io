"use strict";

// Google analytics

var dom = require("dom.js");

dom.script({
    async: true,
    src: "https://www.googletagmanager.com/gtag/js?id=UA-117311466-1"
}).appendTo(dom.head());

window.dataLayer = window.dataLayer || [];

function gtag(){
    dataLayer.push(arguments);
}

gtag("js", new Date());
gtag("config", "UA-117311466-1");

module.exports = function (proposal, success) {
    if (ga) {
        ga("send", {
            hitType: "event",
            eventCategory: "Proposal",
            eventAction: "submit",
            eventLabel: proposal,
            eventValue: success ? 1 : 0
        });
    }
};
