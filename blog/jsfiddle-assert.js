function assert(condition, message) {
    var line = document.createElement("div"),
        status = line.appendChild(document.createElement("span")),
        color;
    line.appendChild(document.createTextNode(message));
    if (condition) {
        status.innerHTML = "&check;";
        color = "green";
    } else {
        status.innerHTML = "&cross;";
        color = "red";
    }
    status.setAttribute("style", "width: 1rem; color: " + color + ";");
    return document.body.appendChild(line);
}
