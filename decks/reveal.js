gpf.require.define({
    dom: "/res/dom.js",
    cdnStyles: "styles.json",
    cdnScripts: "scripts.json",
    cdnPlugins: "plugins.json",
    cfgPlugins: "plugins.js"

}, function (require) {

    var dom = require.dom;

    require.cdnStyles.forEach(function (attributes) {
        dom.link({
            rel: "stylesheet",
            crossorigin: "anonymous",
            href: attributes.url,
            integrity: attributes.integrity
        }).appendTo(dom.head());
    });

    return Promise.all(require.cdnScripts.map(function (attributes) {
        return dom.waitForScript({
            crossorigin: "anonymous",
            src: attributes.url,
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
                    src: require.cdnPlugins[name],
                    async: true
                }, require.cfgPlugins[name]);
            })
        });
        return Reveal;
    });

});
