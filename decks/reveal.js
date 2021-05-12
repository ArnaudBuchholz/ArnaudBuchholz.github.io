gpf.require.define({
    dom: "/res/dom.js",
    cdnStyles: "styles.json",
    cdnThemes: "themes.json",
    cdnPrint: "print.json",
    cdnScripts: "scripts.json",
    cdnPlugins: "plugins.json",
    cfgPlugins: "plugins.js"

}, function (require) {

    var dom = require.dom,
        head = dom.head(),
        // Keep track of any styles node below the head node
        styles = [].slice.call(head.querySelectorAll("style,link")),
        // Use cached reveal if offline
        offline = !!location.toString().match(/(\?|&)offline\b/);

    function cache (url) {
        if (offline && url.match(/https?:\/\//)) {
            return "/decks/reveal.cache/" + url.split("/").pop();
        }
        return url;
    }

    var cdnStyles = [].concat(require.cdnStyles);

    var meta = document.head.querySelector("meta[name='deck-theme']");
    var theme;
    if (meta) {
        theme = meta.getAttribute("content");
    } else {
        theme = "sky";
    }
    cdnStyles.push(require.cdnThemes[theme])

    if (location.toString().match(/\bprint-pdf\b/)) {
        cdnStyles.push(require.cdnPrint)
    }

    cdnStyles.forEach(function (attributes) {
        dom.link({
            rel: "stylesheet",
            crossorigin: "anonymous",
            href: cache(attributes.url),
            integrity: attributes.integrity
        }).appendTo(head);
    });

    // Move all style nodes back to the bottom of the head
    styles.forEach(function (style) {
        head.appendChild(style);
    });

    return Promise.all(require.cdnScripts.map(function (attributes) {
        return dom.waitForScript({
            crossorigin: "anonymous",
            src: cache(attributes.url),
            integrity: attributes.integrity
        });
    })).then(function () {
        /*global Reveal*/
        Reveal.initialize({
            controls: true,
            progress: true,
            history: true,
            center: true,
            transition: "slide",
            dependencies: Object.keys(require.cdnPlugins).map(function (name) {
                return Object.assign({
                    src: cache(require.cdnPlugins[name]),
                    async: true
                }, require.cfgPlugins[name]);
            })
        });
        return Reveal;
    });

});
