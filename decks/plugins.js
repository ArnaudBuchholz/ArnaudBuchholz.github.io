"use strict";

module.exports = {

    elapsed: {
        condition: function () {
            return !location.toString().match(/\belapsed\b=false/);
        }
    },

    markdown: {
        condition: function () {
            return !!document.querySelector("[data-markdown]");
        }
    },

    hljs: {
        callback: function() {
            hljs.initHighlighting();
        }
    }

};
