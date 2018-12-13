"use strict";

function processIncludes () {
  return Promise.resolve();
}

function removeHiddenElements () {
  [].slice.call(document.querySelectorAll(".hide")).forEach(function (node) {
    node.parentNode.removeChild(node);
  });
}

function buildTitle () {
  document.title = document.querySelector("h3").innerHTML.replace(/<[^>]+>/g, "");
}

function buildAgenda () {
  [].slice.call(document.querySelectorAll("h3"))
    .filter(function (h3) {
      return h3.getAttribute("data-agenda") !== "no";
    })
    .forEach(function (h3) {
      var item = document.createElement("li");
      [].slice.call(h3.childNodes, 0).forEach(function (node) {
        item.appendChild(node.cloneNode(true));
      });
      this.appendChild(item);
    }, document.getElementById("agenda"));
}

function reformatCodeSamples () {
  // Replace tabs with double spaces in code samples to reduce code width
  [].slice.call(document.querySelectorAll("code")).forEach(function (node) {
    node.innerHTML = node.innerHTML.replace(/\t/g, "  ");
  });
}

function loadReveal () {
  gpf.require.define({Reveal: "reveal.js"}, function (require) {
    "use strict";
    require.Reveal.configure({
      slideNumber: "c/t",
      allottedTime: 40 * 60 * 1000, // 40 minutes
      progressBarHeight: 10,
      barColor: 'rgb(200,0,0)',
      pausedBarColor: 'rgba(200,0,0,.6)'
    });
  });
}

window.addEventListener("load", function () {
  processIncludes()
    .then(removeHiddenElements)
    .then(buildTitle)
    .then(buildAgenda)
    .then(reformatCodeSamples)
    .then(loadReveal);
});
