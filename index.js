"use strict";

var templates = {
    "deck": function () {/*
        <li><a href="%link%"><img src="/gfx/view.svg" align="left" width="64px"/></a>
            %title%<br/>
            <small><i>%subtitle%</i></small>
        </li>
    */}
}

Object.keys(templates).forEach(function (key) {
    templates[key] = /\/\*((?:[^*]|\*[^/])+)\*\//.exec(templates[key].toString())[1];
});

function strongify (text) {
    return text.replace(/\*([^*]+)\*/g, function (match, string) {
        return "<strong>" + string + "</strong>";
    });
}

function onLoad () {
    var ul = document.querySelector("ul");
    gpf.http.get("/index.json")
        .then(function (response) {
            return JSON.parse(response.responseText);
        })
        .then(function (index) {
            index.forEach(function (item) {
                var template = templates[item.type];
                Object.keys(item).forEach(function (key) {
                    template = template.replace(new RegExp("%" + key + "%", "g"), strongify(item[key]));
                });
                ul.innerHTML += template;
            });
        });
}
