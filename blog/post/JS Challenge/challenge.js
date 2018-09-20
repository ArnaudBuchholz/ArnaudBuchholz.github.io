gpf.require.define({
    dom: "/res/dom.js",
    google: "analytics.js",
    libs: "libs.js",
    page: "page.js",
    challenges: "challenges.json"

}, function (require) {
    "use strict";

    var track = require.google,
        id = decodeURIComponent(location.pathname.split("/").pop()).split(".")[0],
        title = (require.challenges.filter(function (challenge) {
            return challenge.url === id;
        })[0] || {title: "Unknown"}).title,
        description = $("div.definition.description").text(),
        source = $("div.definition.source").text().trim(),
        converter = new showdown.Converter(),
        globals = {
            assert: function (condition, message) {
                if (!condition) {
                    if (message) {
                        throw new Error("Assertion failed: " + message);
                    }
                    throw new Error("An assertion failed");
                }
            },

            onerror: function (e) {
                $("#error").text(e.toString());
                $(".alert-danger").show();
                $(".alert-success").hide();
            },

            assert_complexity_of_1: function (code) {
                if (!JSHINT(code.toString(), {
                    maxcomplexity: 1
                })) {
                    var messages = JSHINT.data().errors.filter(function (error) {
                        return error.code === "W074";
                    });
                    if (messages.length) {
                        throw new Error("Assertion failed: " + messages[0].reason);
                    }
                }
            }
        },
        allowedGlobals = Object.keys(globals)
    ;

    allowedGlobals.forEach(function (name) {
        window[name] = globals[name];
    });

    if (window.allowedGlobals) {
        allowedGlobals = allowedGlobals.concat(window.allowedGlobals);
    }

    $("div.definition").remove();
    document.title = title;
    $("#title").text(title);
    $("#content").html(converter.makeHtml(description));

    $("#proposal").keypress(function (e) {
        if(13 === e.which) {
            $("#propose").click();
        }
    });

    $("#propose").on("click", function () {
        $(".alert").hide();
        var proposal = $("#proposal").val(),
            modifiedSource = source.replace("your_solution_here", $("#proposal").val());
        $("#code").html(Prism.highlight(modifiedSource, Prism.languages.javascript, "html"));
        $("#email").attr("href", "mailto:arnaud.buchholz@free.fr?subject="
            + encodeURIComponent("[JS-Challenge:" + id + "] I solved it with: " + proposal));
        jQuery.globalEval([
            // Disable all global symbols but assert
            "(function (__proto__, " + Object.keys(window).filter(function (name) { return -1 === allowedGlobals.indexOf(name); }).join(", ") + "){",
            modifiedSource.replace(/[^."]assert\((.*)\);/g, function (match, condition) {
                return match.substr(0, match.length - 2) + ", \"" + condition.split("\\").join("\\\\").split("\"").join("\\\"") + "\");";
            }),
            "}());"
        ].join("\n"));
        var done;
        if ("function" === typeof validateProposal) {
            done = validateProposal(proposal) || Promise.resolve();
        } else {
            done = Promise.resolve();
        }
        done.then(function () {
            var success = !$(".alert-danger").is(":visible");
            if (success) {
                $(".alert-success").show();
            }
            track(proposal, success);
        })
    });

    $("#propose").click();

});
