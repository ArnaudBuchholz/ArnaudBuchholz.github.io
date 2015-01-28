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

// Bootstrap, load & check dependencies
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
        callbacks = ast.arguments[1],
        len,
        idx,
        property,
        checked = false;
    if (callbacks.type === "ObjectExpression") {
        len = callbacks.properties.length;
        for (idx = 0; idx < len; ++idx) {
            property = callbacks.properties[idx];
            // look for "complete" or "error" callback function
            if (property.type
                && (property.key.name === "complete"
                    ||property.key.name === "error")) {
                checked = true;
            }
        }

    } else {
        console.warn("Unable to process ajax callbacks: type= "
            + callbacks.type);
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
    if (ast.type === "ExpressionStatement") {
        ast = ast.expression;
    }
    if (ast.type === "CallExpression"
        && ast.callee.type === "MemberExpression"
        && ast.callee.object.name === "$"
        && ast.callee.property.name === "ajax") {
        checkAjaxCallbacks(ast);
        result = true;
    } else {
        result = false;
    }
    if (ast.type === "CallExpression") {
        children = ast.callee;
        // ignore arguments
    } else {
        // default
        children = ast.body;
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

// Verification function
function verify(source) {
    var
        ast = esprima.parse(source, {
            loc: true // Nodes have line and column-based location info
        });
    walk(ast);
}

// Parameters parsing
try {
    var parameters = gpf.Parameter.parse([{
        name: "path",
        required: true,
        type: "string"
    }, gpf.Parameter.VERBOSE], process.argv.slice(2));
} catch (e) {
    console.error(e.message);
    process.exit();
}

// Load the provided file
gpf.stringFromFile(parameters.path, gpf.encoding.UTF_8, {
    error: exitWithError,
    data: function (event) {
        verify(event.get("buffer"));
    }
});