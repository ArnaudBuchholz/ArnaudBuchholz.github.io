"use strict";

function processIncludes () {
    return Promise.all([].slice.call(document.querySelectorAll("*[include]")).map(function(include) {
        return gpf.http.get(include.getAttribute("include"))
            .then(function(response) {
                include.innerHTML = response.responseText;
            })
    }));
}

function remove (selector) {
    [].slice.call(document.querySelectorAll(selector)).forEach(function(node) {
        node.parentNode.removeChild(node);
    });
}

function removeHiddenElements () {
    remove(".hide");
    return gpf.http.get("/local.json")
        .then(function (response) {
            return JSON.parse(response.responseText);
        })
        .then(function (isLocal) {
            if (!isLocal) {
                remove(".local-only");
            }
        })
        .catch(function () {
            // Ignore error
        })
}

function loadAsyncImages () {
    [].slice.call(document.querySelectorAll("img[async-src]"))
        .forEach(function (img) {
            var asyncImg = new Image(),
                src = img.getAttribute("async-src");
            asyncImg.src = src;
            asyncImg.onload = function () {
                img.src = src;
            };
        });
}

function buildTitle () {
    document.title = document.querySelector("h3").innerHTML.replace(/<[^>]+>/g, "");
}

function buildAgenda () {
    [].slice.call(document.querySelectorAll("h3"))
        .filter(function(h3) {
            return h3.getAttribute("data-agenda") !== "no";
        })
        .forEach(function(h3) {
            var item = document.createElement("li");
            [].slice.call(h3.childNodes, 0).forEach(function(node) {
                item.appendChild(node.cloneNode(true));
            });
            this.appendChild(item);
        }, document.getElementById("agenda"));
}

function reformatCodeSamples () {
    // Replace tabs with double spaces in code samples to reduce code width
    [].slice.call(document.querySelectorAll("code")).forEach(function(node) {
        node.innerHTML = node.innerHTML.replace(/\t/g, "  ");
    });
}

function processMeInfo () {
    var
        year = new Date().getFullYear(),
        years = {
            software: 1998,
            js: 2008,
            fe: 2009,
            node: 2013,
            ui5: 2015
        };
    Object.keys(years).forEach(function(id) {
        document.getElementById(id + "_years").innerHTML = year - years[id];
    });
}

function readDeckMeta (name, defaultValue) {
    var meta = document.head.querySelector("meta[name='deck-" + name + "']"),
        value;
    if (meta) {
        value = meta.getAttribute("content");
        if (value) {
            if (typeof defaultValue === "number") {
                return parseInt(value, 10);
            }
            return value;
        }
    }
    return defaultValue;
}

function updateLinks () {
    [].slice.call(document.querySelectorAll("a")).forEach(function (a) {
        a.setAttribute("target", "_blank");
        // If the link includes only one image, specify it
        if (a.querySelectorAll(":not(img)").length === 0 && !a.innerText.trim()) {
            a.classList.add("img-only");
        }
    });
}

function loadNotes () {
    var currentPath = location.pathname;
    if (currentPath.indexOf(".html") !== -1) {
        currentPath = currentPath.replace(".html", ".txt");
    } else {
        currentPath += ".txt";
    }
    return gpf.http.get(currentPath)
        .then(function (response) {
            if (response.status.toString().charAt(0) !== "2") {
                return;
            }
            var
                sections = [].slice.call(document.querySelectorAll("section")).filter(function (section) {
                    return !section.querySelector("section");
                }),
                notes = response.responseText,
                reNotes = /[^#]*^#([0-9]+)([^#]*)/gmy,
                match = reNotes.exec(notes);
            while(match) {
                var
                    index = parseInt(match[1], 10) - 1,
                    content = match[2].trim(),
                    aside = document.createElement("aside");
                aside.className = "notes";
                content.split("\n").forEach(function (line) {
                    aside.appendChild(document.createTextNode(line));
                    aside.appendChild(document.createElement("br"));
                });
                sections[index].appendChild(aside);
                match = reNotes.exec(notes);
            }
        })
        .catch(function () {
            // ignore error
        });
}

function loadReveal () {
    var
        deckLength = readDeckMeta("duration", 0),
        deckProgressBarHeight = readDeckMeta("progress-bar-height", 10),
        deckProgressBarColor = readDeckMeta("progress-bar-color", "rgb(200,0,0)"),
        deckProgressBarPausedColor = readDeckMeta("progress-bar-paused-color", "rgba(200,0,0,.6)");
    gpf.require.define({
        Reveal: "reveal.js"
    }, function(require) {
        "use strict";
        if (deckLength) {
            require.Reveal.configure({
                slideNumber: "c/t",
                allottedTime: deckLength * 60 * 1000,
                progressBarHeight: deckProgressBarHeight,
                barColor: deckProgressBarColor,
                pausedBarColor: deckProgressBarPausedColor
            });
        }
    });
}

window.addEventListener("load", function () {
    processIncludes()
        .then(removeHiddenElements)
        .then(loadAsyncImages)
        .then(buildTitle)
        .then(buildAgenda)
        .then(reformatCodeSamples)
        .then(processMeInfo)
        .then(updateLinks)
        .then(loadNotes)
        .then(loadReveal);
});
