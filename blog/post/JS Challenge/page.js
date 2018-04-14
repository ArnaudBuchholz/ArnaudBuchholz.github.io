"use strict";

var challenges = require("challenges.json"),
    dom = require("dom.js");

dom.div({className: "container"}, [

    // Top navigation bar
    dom.nav({className: "navbar navbar-expand-sm navbar-dark bg-dark"}, [
        dom.a({className: "navbar-brand", href: "#"}, "JS Challenge"),
        dom.button({className: "navbar-toggler", type:"button", "data-toggle":"collapse", "data-target": "#topnavbar",
                    "aria-controls": "topnavbar", "aria-expanded": false, "aria-label": "Toggle navigation"},
            dom.span({className: "navbar-toggler-icon"})
        ),
        dom.div({className: "collapse navbar-collapse", id: "topnavbar"}, [
            dom.ul({className: "navbar-nav mr-auto"}, [
                dom.li({className: "nav-item active"},
                    dom.a({className: "nav-link", href: "http://gpf-js.blogspot.ca/"}, "blog")
                ),
                dom.li({className: "nav-item dropdown"}, [
                    dom.a({className: "nav-link dropdown-toggle", href: "#", id: "challenges",
                        "data-toggle": "dropdown", "aria-haspopup": true, "aria-expanded": false}, "challenges"),
                    dom.div({className: "dropdown-menu", "aria-labelledby": "challenges"},
                        challenges.map(function (challenge) {
                            return dom.a({className: "dropdown-item", href: challenge.url}, challenge.title);
                        })
                    )
                ])
            ])
        ])
    ]),

    dom.div({className: "jumbotron"}, [
        dom.h1("title"),
        dom.p("content")
    ]),

    dom.div({className: "alert alert-danger", role: "alert"}, [
        dom.strong("An error occurred: "),
        dom.span({id: "error"})
    ]),

    dom.div({className: "alert alert-success", role: "alert"}, [
        dom.strong("Well done!"),
        " You successfully found the answer, please ",
        dom.a({id: "email", href: "#"}, "send your answer"),
        "!"
    ]),

    dom.div({className: "row"}, [
        dom.div({className: "col-10"}, dom.input({type: "text", className: "form-control", id: "proposal", value: "your_solution_here"})),
        dom.div({className: "col-2"}, dom.button({type: "button", className: "btn btn-primary", id: "propose"}, "Submit"))
    ])

]).appendTo(document.body);
