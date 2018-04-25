"use strict";

module.exports = {

    markdown: {
        condition: function () {
            return !!document.querySelector("[data-markdown]");
        }
    }

};
