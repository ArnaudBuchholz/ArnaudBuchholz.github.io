"use strict";
/*global gpf:true*/ // Overrides .jshintrc configuration

/**
 * Quick exit helper
 *
 * @param {*} e
 */
function exitWithError(e) {
    if (e instanceof gpf.events.Event) {
        e = e.get("error");
    }
    console.error(e);
    process.exit();
}

// Load & check dependencies
try {
    var gpf = require("gpf-js");
} catch (e) {
    console.error("require(gpf-js) failed: use npm install gpf-js");
    exitWithError(e);
}
try {
    var esprima = require("esprima");
} catch (e) {
    console.error("require(esprima) failed: use npm install esprima");
    exitWithError(e);
}

/**
 * $.ajax AST has been identified, check parameters
 *
 * @param {Object} ast
 */
function checkAjaxCallbacks(ast) {
    var
        callbackObj = ast.arguments[1],
        len,
        idx,
        property,
        checked = false;
    if (callbackObj.type === "ObjectExpression") {
        len = callbackObj.properties.length;
        for (idx = 0; idx < len; ++idx) {
            property = callbackObj.properties[idx];
            // look for "complete" or "error" callback function
            if (property.type
                && (property.key.name === "complete"
                    ||property.key.name === "error")) {
                checked = true;
            }
        }

    } else {
        console.warn("Unable to process ajax callbacks: type= "
            + callbackObj.type);
    }
    if (!checked) {
        console.error("@" + ast.loc.start.line
            + ": missing error / complete handler on $.ajax call");
    }
}

/**
 * Walk down the AST structure and locate $.ajax calls
 *
 * @param {Object} ast
 * @return {Boolean} the AST is a $.ajax call
 */
function walk(ast) {
    var
        result,
        children,
        len,
        idx,
        child,
        wasAjaxCall;
    // ExpressionStatement AST is not relevant here, replace it with expression
    if (ast.type === "ExpressionStatement") {
        ast = ast.expression;
    }
    // $.ajax call?
    if (ast.type === "CallExpression"
        && ast.callee.type === "MemberExpression"
        && ast.callee.object.name === "$"
        && ast.callee.property.name === "ajax") {
        checkAjaxCallbacks(ast);
        result = true;
    } else {
        result = false;
    }
    // Explore children
    if (ast.type === "CallExpression") {
        children = ast.callee;
        // ignore arguments
    } else {
        // default
        children = ast.body; // may be undefined
    }
    if (children) {
        if (children instanceof Array) {
            len = children.length;
            wasAjaxCall = false;
            for (idx = 0; idx < len; ++idx) {
                child = children[idx];
                if (wasAjaxCall) {
                    console.warn("@" + child.loc.start.line
                        + ": Instruction found after $.ajax");
                }
                wasAjaxCall = walk(child);
            }
        } else {
            walk(children);
        }
    }
    return result;
}

/**
 * Parameters parsing
 *
 * The GPF library provides an helper to parse parameters with a given syntax
 * In this case, the command expects only one required parameter
 */
try {
    var parameters = gpf.Parameter.parse([{
        name: "path",
        required: true,
        type: "string"
    }, gpf.Parameter.VERBOSE], process.argv.slice(2));
} catch (e) {
    console.log("node verify <path>");
    console.error(e.message);
    process.exit();
}

/**
 * File loading
 *
 * The GPF library handles streams.
 * The gpf.stringFromFile0 API provides a way to load the content of a file as a
 * text decoded with a given encoding (only UTF-8 supported).
 * Stream reading is asynchronous.
 * The end is signaled using a typed event that contains parameters.
 *
 * In that case, when the string is fully loaded, the event "data" is generated
 * and the result is available through the parameter named buffer.
 */
gpf.stringFromFile(parameters.path, gpf.encoding.UTF_8, {
    error: exitWithError,
    data: function (event) {
        var
            ast = esprima.parse(event.get("buffer"), {
                loc: true // Nodes have line and column-based location info
            });
        walk(ast);
    }
});