"use strict";

var _head,

    dom = {

        head: function () {
            if (!_head) {
                _head = document.querySelector("head");
            }
            return _head;
        },

        waitForScript (attributes) {
            return new Promise(function (resolve) {
                dom.script(attributes)
                    .appendTo(dom.head())
                    .addEventListener("load", function () {
                        resolve();
                    });
            });
        }

    };

require("dom.json").forEach(function (tagName) {
    dom[tagName] = gpf.web.createTagFunction(tagName);
});

module.exports = dom;
