var findBrackets = /(\{([a-zA-Z0-9\-_]+)\})/gm;
var buffer = "Hello {first-name} {last-name}!";
var result = findBrackets.exec(buffer);
while (result) {
	console.log(result);
	result = findBrackets.exec(buffer);
}