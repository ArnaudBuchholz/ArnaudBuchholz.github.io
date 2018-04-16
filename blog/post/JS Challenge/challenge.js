gpf.require.define({
    dom: "dom.js",
    libs: "libs.js",
    page: "page.js",
    challenges: "challenges.json"

}, function (require) {
    "use strict";

    var id = decodeURIComponent(location.pathname.split("/").pop()).split(".")[0],
        title = (require.challenges.filter(function (challenge) {
            return challenge.url === id;
        })[0] || {title: "Unknown"}).title,
        codes = $("code"),
        description = $(codes[0]).text(),
        javascript = $(codes[1]).text(),
        converter = new showdown.Converter()
    ;

    codes.remove();
    document.title = title;
    $("#title").text(title);
    $("#content").html(converter.makeHtml(description));
    $("#code").html(Prism.highlight(javascript, Prism.languages.javascript, "html"));

});
