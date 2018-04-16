"use strict";

var dom = {

    head: function () {
        return document.querySelector("head");
    }

};

[
    "a",
    "button",
    "div",
    "h1",
    "input",
    "label",
    "li",
    "link",
    "nav",
    "optgroup",
    "option",
    "p",
    "pre",
    "script",
    "select",
    "span",
    "strong",
    "ul"

].forEach(function (tagName) {
    dom[tagName] = gpf.web.createTagFunction(tagName);
});

module.exports = dom;
