"use strict";

// https://github.com/nodejs/node/blob/master/doc/changelogs/CHANGELOG_V8.md#2017-10-24-version-880-current-mylesborins
process.env.NODE_NO_HTTP2 = 1; //eslint-disable-line no-process-env

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-serve');

};
