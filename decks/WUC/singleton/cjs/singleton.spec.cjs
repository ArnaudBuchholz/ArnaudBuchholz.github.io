const Singleton = require('./singleton.cjs');
const assert = require('node:assert/strict');

const instance1 = new Singleton();
const instance2 = new Singleton();

assert.strictEqual(instance1, instance2);
