gpf.require.define({
    dom: "/res/dom.js",
    styles: "styles.json",
    scripts: "scripts.json",
    plugins: "plugins.json"

}, function (require) {

    var dom = require.dom;

    require.styles.forEach(function (attributes) {
        dom.link(Object.assign({
            rel: "stylesheet",
            crossorigin: "anonymous"
        }, attributes)).appendTo(dom.head());
    });

    return Promise.all(require.scripts.map(function (attributes) {
        return dom.waitForScript(Object.assign({
            crossorigin: "anonymous"
        }, attributes));
    })).then(function () {
        /*global Reveal*/
        Reveal.initialize({
            controls: true,
            progress: true,
            history: true,
            center: true,
            transition: "slide",
            dependencies: require.plugins.map(function (src) {
                return {
                    src: src,
                    async: true
                };
            })
        });
        return Reveal;
    });

});
